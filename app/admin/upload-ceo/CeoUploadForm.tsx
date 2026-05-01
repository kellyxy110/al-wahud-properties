'use client';

import { useState } from 'react';
import SupabaseUploader, { type UploadResult } from '@/app/admin/_components/SupabaseUploader';
import { createClient } from '@/app/lib/supabase/client';

export default function CeoUploadForm() {
  const [uploadedUrl, setUploadedUrl] = useState('');
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
        .insert({ type: 'ceo', url: uploadedUrl, title: 'CEO Profile Photo' });
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
          Step 1 — Select &amp; Upload CEO Photo
        </h3>
        <SupabaseUploader
          bucket="media"
          folder="ceo"
          label="CEO profile photo"
          onDone={handleUploaded}
        />
      </div>

      {/* Step 2 — Save record */}
      {uploadedUrl && (
        <form onSubmit={handleSave}>
          <h3 style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 14, color: 'var(--dark-text)', marginBottom: 12 }}>
            Step 2 — Save Record to Supabase (optional)
          </h3>

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
          How to apply the CEO photo:
        </p>
        <ol style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#6B7280', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
          <li>Upload photo above and copy the URL</li>
          <li>Open <code style={{ background: '#E5E7EB', padding: '1px 5px', borderRadius: 3 }}>app/ceo/page.tsx</code></li>
          <li>Replace the profile image <code style={{ background: '#E5E7EB', padding: '1px 5px', borderRadius: 3 }}>src</code> with the copied URL</li>
        </ol>
      </div>
    </div>
  );
}
