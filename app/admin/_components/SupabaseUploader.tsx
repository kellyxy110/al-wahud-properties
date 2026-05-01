'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';

export interface UploadResult {
  url: string;
  path: string;
}

interface Props {
  bucket  : string;           // Supabase Storage bucket name
  folder  : string;           // sub-folder inside bucket, e.g. 'blog'
  label   : string;           // e.g. 'blog image'
  onDone ?: (r: UploadResult) => void;
}

type Status = 'idle' | 'uploading' | 'done' | 'error';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export default function SupabaseUploader({ bucket, folder, label, onDone }: Props) {
  const fileRef            = useRef<HTMLInputElement>(null);
  const [status, setStatus]   = useState<Status>('idle');
  const [error,  setError]    = useState('');
  const [preview, setPreview] = useState('');
  const [result,  setResult]  = useState<UploadResult | null>(null);
  const [copied,  setCopied]  = useState(false);

  async function handleFile(file: File) {
    if (file.size > MAX_BYTES) {
      setStatus('error');
      setError('File exceeds 5 MB limit.');
      return;
    }

    setStatus('uploading');
    setError('');
    setResult(null);
    setPreview(URL.createObjectURL(file));

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path     = `${folder}/${Date.now()}-${safeName}`;

    const supabase = createClient();
    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true, cacheControl: '3600' });

    if (upErr) {
      setStatus('error');
      setError(upErr.message);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const r: UploadResult = { url: data.publicUrl, path };
    setResult(r);
    setStatus('done');
    onDone?.(r);
  }

  function copyUrl() {
    if (!result) return;
    navigator.clipboard.writeText(result.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ fontFamily: 'var(--font-inter)' }}>

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        style={{
          border      : `2px dashed ${status === 'error' ? '#FCA5A5' : '#D1D5DB'}`,
          borderRadius: 16,
          padding     : '28px 20px',
          textAlign   : 'center',
          cursor      : 'pointer',
          background  : status === 'error' ? '#FEF2F2' : '#FAFAFA',
          transition  : 'border-color 0.2s',
        }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="preview"
            style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 10, margin: '0 auto', display: 'block' }}
          />
        ) : (
          <>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
              Click to upload {label}
            </p>
            <p style={{ fontSize: 11, color: '#6B7280' }}>JPEG / PNG / WebP · max 5 MB</p>
          </>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Status messages */}
      {status === 'uploading' && (
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#92400E', fontWeight: 600 }}>
          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
            <path d="M12 2a10 10 0 0110 10"/>
          </svg>
          Uploading to Supabase Storage…
        </div>
      )}

      {status === 'error' && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#DC2626', fontWeight: 500 }}>
          ❌ {error}
          {error.includes('bucket') && (
            <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
              Make sure the <strong>{bucket}</strong> bucket exists and is public in your Supabase dashboard.
            </p>
          )}
          <button
            type="button"
            onClick={() => { setStatus('idle'); setPreview(''); }}
            style={{ marginTop: 8, fontSize: 11, fontWeight: 600, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Try again
          </button>
        </div>
      )}

      {status === 'done' && result && (
        <div
          style={{
            marginTop: 12, background: '#ECFDF5', border: '1px solid #86EFAC',
            borderRadius: 12, padding: '12px 14px',
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, color: '#166534', marginBottom: 6 }}>
            ✅ Upload successful!
          </p>
          <p style={{ fontSize: 11, color: '#374151', marginBottom: 8, wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {result.url}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={copyUrl}
              style={{
                fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 999,
                background: copied ? '#0F5E36' : 'var(--primary)', color: '#fff',
                border: 'none', cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy URL'}
            </button>
            <button
              type="button"
              onClick={() => { setStatus('idle'); setPreview(''); setResult(null); }}
              style={{ fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 999, background: '#F3F4F6', color: '#374151', border: 'none', cursor: 'pointer' }}
            >
              Upload another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
