'use client';

import { useState } from 'react';
import SupabaseUploader, { type UploadResult } from '@/app/admin/_components/SupabaseUploader';
import { createClient } from '@/app/lib/supabase/client';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] outline-none ' +
  'focus:border-[var(--primary)] focus:ring-2 focus:ring-[#1B995420] transition-all bg-white';
const labelCls = 'block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';

export default function BlogUploadForm() {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [title,       setTitle]       = useState('');
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [saveError,   setSaveError]   = useState('');

  function handleUploaded(r: UploadResult) {
    setUploadedUrl(r.url);
    setSaved(false);
    setSaveError('');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadedUrl) return;
    setSaving(true);
    setSaveError('');
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('media_uploads')
        .insert({ type: 'blog', url: uploadedUrl, title: title.trim() || null });
      if (error) throw error;
      setSaved(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSaveError(msg.includes('relation') ? 'The media_uploads table does not exist yet. URL was uploaded to storage — copy it above.' : msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Step 1 — Upload */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', marginBottom: 12 }}>
          Step 1 — Select &amp; Upload Image
        </h3>
        <SupabaseUploader
          bucket="media"
          folder="blog"
          label="blog cover image"
          onDone={handleUploaded}
        />
      </div>

      {/* Step 2 — Save record */}
      {uploadedUrl && (
        <form onSubmit={handleSave}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', marginBottom: 12 }}>
            Step 2 — Save Record to Supabase (optional)
          </h3>

          <div style={{ marginBottom: 14 }}>
            <label className={labelCls} style={{ fontFamily: 'var(--font-inter)' }}>Blog Post Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Top 10 Locations in Lagos for Investment"
              className={inputCls}
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {saved && (
            <div style={{ background: '#ECFDF5', border: '1px solid #86EFAC', borderRadius: 12, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#166534', fontWeight: 600 }}>
              ✅ Saved to Supabase <code>media_uploads</code> table.
            </div>
          )}
          {saveError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#DC2626' }}>
              ⚠️ {saveError}
            </div>
          )}

          <button
            type="submit"
            disabled={saving || saved}
            style={{
              fontFamily: 'var(--font-poppins)', fontSize: 14, fontWeight: 700,
              padding: '12px 28px', borderRadius: 999, border: 'none', cursor: saving || saved ? 'not-allowed' : 'pointer',
              background: saved ? '#0F5E36' : 'linear-gradient(135deg,#1B9954,#0F5E36)',
              color: '#fff', opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save to Database →'}
          </button>
        </form>
      )}

      {/* Instructions */}
      <div style={{ background: '#F9FAFB', borderRadius: 14, padding: '14px 16px', borderLeft: '4px solid var(--primary)' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
          How to use the URL in your blog posts:
        </p>
        <ol style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
          <li>Upload image above and copy the URL</li>
          <li>Open <code style={{ background: '#E5E7EB', padding: '1px 5px', borderRadius: 3 }}>app/lib/data.ts</code></li>
          <li>Find the blog post and update its <code style={{ background: '#E5E7EB', padding: '1px 5px', borderRadius: 3 }}>img</code> field with the copied URL</li>
        </ol>
      </div>
    </div>
  );
}
