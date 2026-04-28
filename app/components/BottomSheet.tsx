'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DRAG_CLOSE_THRESHOLD = 80; // px dragged down before snap-close

export default function BottomSheet({ open, onClose, children }: Props) {
  const sheetRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const dragState   = useRef({ active: false, startY: 0, currentY: 0 });

  // ── Body scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${scrollY}px`;
    document.body.style.width      = '100%';
    document.body.dataset.scrollY  = String(scrollY);
    return () => {
      const saved = parseInt(document.body.dataset.scrollY ?? '0', 10);
      document.body.style.position  = '';
      document.body.style.top       = '';
      document.body.style.width     = '';
      window.scrollTo(0, saved);
    };
  }, [open]);

  // ── Reset sheet position when opened ───────────────────────────────────
  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.style.transform  = 'translateY(0)';
      sheetRef.current.style.transition = '';
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [open]);

  // ── Escape key ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // ── Drag handlers ───────────────────────────────────────────────────────
  const onDragStart = useCallback((clientY: number) => {
    // Only allow drag when the content area is scrolled to the top.
    // If user is mid-scroll inside the sheet, don't hijack it.
    if (contentRef.current && contentRef.current.scrollTop > 2) return;
    dragState.current = { active: true, startY: clientY, currentY: clientY };
  }, []);

  const onDragMove = useCallback((clientY: number) => {
    if (!dragState.current.active || !sheetRef.current) return;
    const delta = clientY - dragState.current.startY;
    if (delta < 0) return; // don't allow dragging up
    dragState.current.currentY = clientY;
    sheetRef.current.style.transition = 'none';
    sheetRef.current.style.transform  = `translateY(${delta}px)`;
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragState.current.active || !sheetRef.current) return;
    dragState.current.active = false;
    const delta = dragState.current.currentY - dragState.current.startY;
    if (delta >= DRAG_CLOSE_THRESHOLD) {
      // Animate out then close
      sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
      sheetRef.current.style.transform  = 'translateY(100%)';
      setTimeout(onClose, 300);
    } else {
      // Snap back
      sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
      sheetRef.current.style.transform  = 'translateY(0)';
    }
  }, [onClose]);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientY);
  const onTouchMove  = (e: React.TouchEvent) => onDragMove(e.touches[0].clientY);
  const onTouchEnd   = () => onDragEnd();

  // Pointer events (mouse drag on desktop handle)
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    onDragStart(e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => onDragMove(e.clientY);
  const onPointerUp   = () => onDragEnd();

  if (!open) return null;

  return (
    // Portal-style fixed layer — sits above everything
    <div className="fixed inset-0 z-[800]" aria-modal="true" role="dialog">

      {/* ── Backdrop ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* ── Sheet ── */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '92dvh',
          background: 'var(--bg)',
          borderRadius: '24px 24px 0 0',
          transform: 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
        }}
      >
        {/* ── Drag handle — pointer & touch events attached here only ── */}
        <div
          style={{ flexShrink: 0, touchAction: 'none', cursor: 'grab' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: '#D1D5DB' }} />
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch' as never,
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
