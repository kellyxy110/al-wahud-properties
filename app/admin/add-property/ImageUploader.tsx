'use client';

import { useCallback, useRef, useState } from 'react';

// ── Env vars (NEXT_PUBLIC_ = safe to expose; upload is unsigned) ──────────────
const CLOUD_NAME    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '';
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

// ── Types ────────────────────────────────────────────────────────────────────
type UploadStatus = 'compressing' | 'uploading' | 'done' | 'error';

interface UploadedImage {
  id: string;           // local uuid for React keys + drag tracking
  url: string;          // Cloudinary secure_url
  preview: string;      // object URL for thumbnail (revoked on remove)
  status: UploadStatus;
  progress: number;     // 0–100
  error?: string;
  file?: File;          // kept for retry
}

interface Props {
  onChange: (urls: string[]) => void;          // called with done URLs whenever list changes
  onUploadingChange?: (active: boolean) => void; // called when any upload starts or all finish
}

// ── Canvas compression ────────────────────────────────────────────────────────
function compressImage(file: File, maxPx = 1920, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        const ratio = Math.min(maxPx / width, maxPx / height);
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Canvas compression failed')),
        'image/jpeg',
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Image load failed')); };
    img.src = objectUrl;
  });
}

// ── Single file → Cloudinary (XHR for progress) ───────────────────────────────
function uploadToCloudinary(
  blob: Blob,
  fileName: string,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append('file', blob, fileName);
    fd.append('upload_preset', UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', UPLOAD_URL);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        resolve(res.secure_url as string);
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err?.error?.message ?? `HTTP ${xhr.status}`));
        } catch {
          reject(new Error(`HTTP ${xhr.status}`));
        }
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(fd);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ImageUploader({ onChange, onUploadingChange }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [draggingOver, setDraggingOver] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // drag-to-reorder state
  const dragItem    = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Notify parent whenever images array changes
  const notify = useCallback((next: UploadedImage[]) => {
    onChange(next.filter(i => i.status === 'done').map(i => i.url));
    const active = next.some(i => i.status === 'compressing' || i.status === 'uploading');
    onUploadingChange?.(active);
  }, [onChange, onUploadingChange]);

  // Core upload for one file — used by both initial upload and retry
  const uploadSingle = useCallback(async (file: File, entryId: string) => {
    if (file.size > MAX_FILE_BYTES) {
      setImages(prev => {
        const next = prev.map(img => img.id === entryId
          ? { ...img, status: 'error' as UploadStatus, error: 'File exceeds 5 MB limit' }
          : img);
        notify(next);
        return next;
      });
      return;
    }

    try {
      const blob = await compressImage(file);

      setImages(prev => prev.map(img => img.id === entryId
        ? { ...img, status: 'uploading' as UploadStatus }
        : img));

      const url = await uploadToCloudinary(blob, file.name, pct => {
        setImages(prev => prev.map(img => img.id === entryId
          ? { ...img, progress: pct }
          : img));
      });

      setImages(prev => {
        const next = prev.map(img => img.id === entryId
          ? { ...img, status: 'done' as UploadStatus, progress: 100, url }
          : img);
        notify(next);
        return next;
      });
    } catch (err) {
      setImages(prev => {
        const next = prev.map(img => img.id === entryId
          ? { ...img, status: 'error' as UploadStatus, error: (err as Error).message }
          : img);
        notify(next);
        return next;
      });
    }
  }, [notify]);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files).filter(f => f.type.startsWith('image/'));

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setConfigError(
        'Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and ' +
        'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local and restart the dev server.'
      );
      return;
    }
    setConfigError(null);

    const newEntries: UploadedImage[] = list.map(f => ({
      id:       crypto.randomUUID(),
      url:      '',
      preview:  URL.createObjectURL(f),
      status:   'compressing' as UploadStatus,
      progress: 0,
      file:     f,
    }));

    setImages(prev => {
      const next = [...prev, ...newEntries];
      notify(next);
      return next;
    });

    for (let i = 0; i < list.length; i++) {
      await uploadSingle(list[i], newEntries[i].id);
    }
  }, [notify, uploadSingle]);

  // ── Drop zone handlers ────────────────────────────────────────────────────
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  // ── Thumbnail drag-to-reorder ─────────────────────────────────────────────
  function onThumbDragStart(index: number) { dragItem.current = index; }
  function onThumbDragEnter(index: number) { dragOverItem.current = index; }
  function onThumbDragEnd() {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;
    setImages(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragItem.current!, 1);
      next.splice(dragOverItem.current!, 0, moved);
      dragItem.current    = null;
      dragOverItem.current = null;
      notify(next);
      return next;
    });
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  function remove(id: string) {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      const next = prev.filter(i => i.id !== id);
      notify(next);
      return next;
    });
  }

  const uploading = images.some(i => i.status === 'compressing' || i.status === 'uploading');
  const doneCount = images.filter(i => i.status === 'done').length;

  return (
    <div style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── Config error banner ── */}
      {configError && (
        <div style={{
          background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12,
          padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#DC2626',
          fontWeight: 500, lineHeight: 1.5,
        }}>
          ⚠️ {configError}
        </div>
      )}

      {/* ── Drop Zone ── */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${draggingOver ? 'var(--primary)' : '#D1D5DB'}`,
          borderRadius: 16,
          padding: '28px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: draggingOver ? '#F0FDF4' : '#FAFAFA',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-text)', marginBottom: 4 }}>
          Drag &amp; drop images here, or click to browse
        </p>
        <p style={{ fontSize: 11, color: 'var(--gray)' }}>
          JPEG / PNG / WebP · max 5 MB per file · multiple allowed
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={e => e.target.files && processFiles(e.target.files)}
        />
      </div>

      {/* ── Status line ── */}
      {images.length > 0 && (
        <p style={{ fontSize: 11, color: uploading ? '#92400e' : 'var(--primary)', marginTop: 8, fontWeight: 600 }}>
          {uploading
            ? `⏳ Uploading… (${doneCount}/${images.length} done)`
            : `✅ ${doneCount} image${doneCount !== 1 ? 's' : ''} ready · drag thumbnails to reorder`}
        </p>
      )}

      {/* ── Thumbnail grid ── */}
      {images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10, marginTop: 12 }}>
          {images.map((img, idx) => (
            <div
              key={img.id}
              draggable={img.status === 'done'}
              onDragStart={() => onThumbDragStart(idx)}
              onDragEnter={() => onThumbDragEnter(idx)}
              onDragEnd={onThumbDragEnd}
              onDragOver={e => e.preventDefault()}
              style={{
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: '#F3F4F6',
                border: idx === 0 ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: img.status === 'done' ? 'grab' : 'default',
                opacity: img.status === 'error' ? 0.6 : 1,
              }}
            >
              {/* Preview image — blob URL from URL.createObjectURL(); next/image cannot optimize blob: URLs */}
              {img.preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.preview}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                />
              )}

              {/* Cover badge */}
              {idx === 0 && img.status === 'done' && (
                <div style={{ position: 'absolute', top: 5, left: 5, background: 'var(--primary)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 99 }}>
                  COVER
                </div>
              )}

              {/* Progress overlay */}
              {(img.status === 'compressing' || img.status === 'uploading') && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ width: '70%', height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${img.status === 'compressing' ? 10 : img.progress}%`, background: '#fff', borderRadius: 99, transition: 'width 0.2s' }} />
                  </div>
                  <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>
                    {img.status === 'compressing' ? 'Compressing…' : `${img.progress}%`}
                  </span>
                </div>
              )}

              {/* Error overlay */}
              {img.status === 'error' && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(220,38,38,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 6, gap: 4 }}>
                  <span style={{ fontSize: 14 }}>⚠️</span>
                  <span style={{ fontSize: 8, color: '#fff', fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>{img.error}</span>
                  {img.file && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const file = img.file!;
                        const id   = img.id;
                        setImages(prev => {
                          const next = prev.map(i => i.id === id
                            ? { ...i, status: 'compressing' as UploadStatus, progress: 0, error: undefined }
                            : i);
                          notify(next);
                          return next;
                        });
                        uploadSingle(file, id);
                      }}
                      style={{
                        marginTop: 2, fontSize: 8, color: '#fff', fontWeight: 700,
                        background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.5)',
                        borderRadius: 4, padding: '2px 6px', cursor: 'pointer',
                      }}
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); remove(img.id); }}
                aria-label="Remove image"
                style={{
                  position: 'absolute', top: 5, right: 5,
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)', border: 'none',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
