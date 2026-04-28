'use server';

import { getSupabaseAdmin } from '@/app/lib/supabase/admin';

export interface FormState {
  status: 'idle' | 'success' | 'error';
  message: string;
  propertyId?: number;
}

export async function addProperty(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // ── Parse scalar fields ────────────────────────────────────────────────
  const title         = (formData.get('title') as string).trim();
  const price         = parseFloat(formData.get('price') as string);
  const price_period  = (formData.get('price_period') as string).trim();
  const location      = (formData.get('location') as string).trim();
  const location_key  = (formData.get('location_key') as string).trim();
  const status        = formData.get('status') as string;
  const property_type = formData.get('property_type') as string;
  const bedrooms      = parseInt(formData.get('bedrooms') as string, 10) || 0;
  const bathrooms     = parseInt(formData.get('bathrooms') as string, 10) || 0;
  const sqm           = parseInt(formData.get('sqm') as string, 10) || 0;
  const description   = (formData.get('description') as string).trim();
  const tiktok_id     = (formData.get('tiktok_id') as string).trim();
  const whatsapp_text = (formData.get('whatsapp_text') as string).trim();
  const gradient      = (formData.get('gradient') as string).trim() || 'linear-gradient(135deg,#1B9954,#0F5E36)';
  const featured      = formData.get('featured') === 'on';
  const published     = formData.get('published') === 'on';

  // ── Parse array / JSON fields ──────────────────────────────────────────
  const featuresRaw = (formData.get('features') as string).trim();
  const features = featuresRaw
    ? featuresRaw.split(',').map(f => f.trim()).filter(Boolean)
    : [];

  const imagesRaw = (formData.get('images') as string).trim();
  const images = imagesRaw
    ? imagesRaw.split(',').map(u => u.trim()).filter(Boolean)
    : [];

  const invalidImages = images.filter(u => !/^https?:\/\/.+/.test(u));
  if (invalidImages.length > 0) {
    return {
      status: 'error',
      message: `Invalid image URL${invalidImages.length > 1 ? 's' : ''} — must start with http:// or https://:\n${invalidImages.join('\n')}`,
    };
  }

  // Amenities: accept either valid JSON array or comma-separated labels
  let amenities: { i: string; l: string }[] = [];
  const amenitiesRaw = (formData.get('amenities') as string).trim();
  if (amenitiesRaw) {
    try {
      amenities = JSON.parse(amenitiesRaw);
    } catch {
      // comma-separated plain labels → use a default pin emoji
      amenities = amenitiesRaw
        .split(',')
        .map(l => l.trim())
        .filter(Boolean)
        .map(l => ({ i: '📌', l }));
    }
  }

  // ── Basic validation ───────────────────────────────────────────────────
  if (!title)    return { status: 'error', message: 'Title is required.' };
  if (isNaN(price) || price <= 0)
                 return { status: 'error', message: 'Price must be a positive number.' };
  if (!location) return { status: 'error', message: 'Location is required.' };
  if (!location_key)
                 return { status: 'error', message: 'Location key is required.' };

  // ── Insert ─────────────────────────────────────────────────────────────
  const { data, error } = await getSupabaseAdmin()
    .from('properties')
    .insert({
      title, price, price_period, location, location_key,
      status, property_type, bedrooms, bathrooms, sqm,
      description, features, amenities, images,
      tiktok_id, whatsapp_text, gradient, featured, published,
    })
    .select('id')
    .single();

  if (error) {
    return { status: 'error', message: error.message };
  }

  return {
    status: 'success',
    message: `Property "${title}" added successfully!`,
    propertyId: data.id,
  };
}
