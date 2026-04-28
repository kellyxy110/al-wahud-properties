-- ═══════════════════════════════════════════════════════════════════════════
--  Al-Wajud Properties — Supabase Schema
--  Paste the entire contents of this file into:
--  Supabase Dashboard → SQL Editor → New query → Run (F5)
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── EXTENSIONS ─────────────────────────────────────────────────────────────
-- pg_trgm enables fast ILIKE / full-text search on title and location.
create extension if not exists pg_trgm;


-- ─── ENUM TYPES ─────────────────────────────────────────────────────────────
do $$ begin
  create type property_status as enum (
    'FOR SALE',
    'FOR RENT',
    'SHORT LET',
    'OFF-PLAN',
    'LAND FOR SALE'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type property_type as enum (
    'duplex',
    'apartment',
    'penthouse',
    'land',
    'bungalow',
    'terrace',
    'commercial'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type blog_category as enum (
    'Investment',
    'Legal Guide',
    'Diaspora',
    'Market News',
    'Lifestyle',
    'Tips'
  );
exception when duplicate_object then null;
end $$;


-- ─── PROPERTIES TABLE ───────────────────────────────────────────────────────
create table if not exists properties (
  id              bigint        primary key generated always as identity,
  title           text          not null,
  price           numeric       not null,           -- stored as number, formatted in UI
  price_period    text          default '',         -- '/yr', '/month', '' (for sale)
  location        text          not null,
  location_key    text          not null,           -- 'lagos' | 'abuja' | 'port-harcourt'
  status          property_status not null,
  property_type   property_type   not null,
  bedrooms        integer       not null default 0,
  bathrooms       integer       not null default 0,
  sqm             integer       not null default 0,
  description     text          not null default '',
  features        text[]        not null default '{}',   -- ['Fitted Kitchen', ...]
  amenities       jsonb         not null default '[]',   -- [{"i":"🏊","l":"Pool"}, ...]
  images          text[]        not null default '{}',   -- array of image URLs
  tiktok_id       text          default '',              -- TikTok video ID only
  whatsapp_text   text          default '',              -- pre-encoded WA message
  gradient        text          not null default 'linear-gradient(135deg,#1B9954,#0F5E36)',
  featured        boolean       not null default false,
  published       boolean       not null default true,
  created_at      timestamptz   not null default now(),
  updated_at      timestamptz   not null default now()
);

-- Auto-update updated_at on every row change
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_updated_at on properties;
create trigger properties_updated_at
  before update on properties
  for each row execute function set_updated_at();

-- Indexes for the filters used on the /properties page
create index if not exists properties_status_idx       on properties (status);
create index if not exists properties_type_idx         on properties (property_type);
create index if not exists properties_location_key_idx on properties (location_key);
create index if not exists properties_featured_idx     on properties (featured) where featured = true;
create index if not exists properties_published_idx    on properties (published) where published = true;
create index if not exists properties_title_trgm_idx   on properties using gin (title gin_trgm_ops);


-- ─── BLOG POSTS TABLE ───────────────────────────────────────────────────────
create table if not exists blog_posts (
  id          bigint        primary key generated always as identity,
  title       text          not null,
  slug        text          not null unique,        -- URL-safe: 'why-ibeju-lekki-is-growing'
  excerpt     text          not null default '',
  content     text          not null default '',    -- full body (Markdown or HTML)
  image       text          not null default '',    -- hero image URL
  gradient    text          not null default 'linear-gradient(135deg,#1B9954,#2D7A76)',
  category    blog_category not null default 'Market News',
  read_time   text          not null default '5 min read',
  published   boolean       not null default false,
  created_at  timestamptz   not null default now(),
  updated_at  timestamptz   not null default now()
);

drop trigger if exists blog_posts_updated_at on blog_posts;
create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

create index if not exists blog_posts_slug_idx      on blog_posts (slug);
create index if not exists blog_posts_category_idx  on blog_posts (category);
create index if not exists blog_posts_published_idx on blog_posts (published) where published = true;


-- ─── ROW LEVEL SECURITY ─────────────────────────────────────────────────────
-- Public can read published rows. Only service role can write.
alter table properties  enable row level security;
alter table blog_posts  enable row level security;

-- Anyone (including unauthenticated visitors) can read published rows
create policy "Public read properties"
  on properties for select
  using (published = true);

create policy "Public read blog_posts"
  on blog_posts for select
  using (published = true);

-- Only the service role can insert / update / delete (used by admin dashboard later)
-- No insert/update/delete policy = only service_role key can mutate data


-- ─── SEED DATA — PROPERTIES ─────────────────────────────────────────────────
insert into properties
  (title, price, price_period, location, location_key, status, property_type,
   bedrooms, bathrooms, sqm, description, features, amenities, images,
   tiktok_id, whatsapp_text, gradient, featured)
values
(
  'Classical Lagos House',
  120000000, '/yr',
  'No. 9 Ikeja GRA, Lagos', 'lagos',
  'FOR RENT', 'duplex',
  3, 3, 250,
  'A beautifully maintained 3-bedroom detached house in the prestigious Ikeja GRA. Features spacious living areas, fitted kitchen, and a lush garden. Perfect for families seeking comfort and security in the heart of Lagos.',
  array['Fitted Kitchen','Boys Quarters','Spacious Garden','CCTV System','Tiled Compound','Ample Parking'],
  '[{"i":"🏊","l":"Pool"},{"i":"🏋️","l":"Gym"},{"i":"🔒","l":"Security"},{"i":"🚗","l":"Parking"},{"i":"⚡","l":"Generator"},{"i":"💧","l":"Water"},{"i":"🌿","l":"Garden"},{"i":"📡","l":"Internet"}]',
  array['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Classical%20Lagos%20House%20in%20Ikeja%20GRA.',
  'linear-gradient(135deg,#2D7A76,#0F5E36)',
  true
),
(
  'Luxury Penthouse',
  450000000, '',
  'Lekki Phase 1, Lagos State', 'lagos',
  'FOR SALE', 'penthouse',
  5, 5, 420,
  'An iconic 5-bedroom penthouse on the 20th floor offering panoramic ocean views. State-of-the-art kitchen, private rooftop terrace, and world-class finishes.',
  array['Rooftop Terrace','Ocean View','Smart Home','Private Elevator','Walk-in Closet','Home Theater'],
  '[{"i":"🏊","l":"Pool"},{"i":"🏋️","l":"Gym"},{"i":"🔒","l":"Security"},{"i":"🚗","l":"Parking"},{"i":"⚡","l":"Generator"},{"i":"🛎","l":"Concierge"},{"i":"🍽","l":"Restaurant"},{"i":"🌊","l":"Ocean View"}]',
  array['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Luxury%20Penthouse%20in%20Lekki%20Phase%201.',
  'linear-gradient(135deg,#FFB703,#E63946)',
  false
),
(
  'Modern Duplex',
  85000000, '/yr',
  'Victoria Island, Lagos', 'lagos',
  'FOR RENT', 'duplex',
  4, 4, 310,
  'Stunning 4-bedroom contemporary duplex in a serene gated estate on Victoria Island. Italian tiles, designer fittings, and a fully equipped gym on-site.',
  array['Italian Tiles','Modern Kitchen','Home Office','Solar Panels','CCTV','Intercom'],
  '[{"i":"🏋️","l":"Gym"},{"i":"🔒","l":"Security"},{"i":"🚗","l":"Parking"},{"i":"⚡","l":"Generator"},{"i":"💧","l":"Water"},{"i":"📡","l":"Fibre Wi-Fi"},{"i":"🌿","l":"Garden"},{"i":"🏪","l":"Estate Shop"}]',
  array['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Modern%20Duplex%20in%20Victoria%20Island.',
  'linear-gradient(135deg,#2D7A76,#FFB703)',
  false
),
(
  'Executive 4-Bedroom Bungalow',
  180000000, '',
  'Maitama District, Abuja FCT', 'abuja',
  'FOR SALE', 'bungalow',
  4, 4, 320,
  'Prestigious 4-bedroom detached bungalow in the most exclusive district of Abuja. Manicured gardens, 3-car garage, and an integrated solar power system.',
  array['3-Car Garage','Solar Power','Boys Quarters','Landscaped Garden','Security Post','BQ'],
  '[{"i":"🔒","l":"Security"},{"i":"🚗","l":"Garage"},{"i":"⚡","l":"Solar"},{"i":"💧","l":"Borehole"},{"i":"🌿","l":"Garden"},{"i":"🏞","l":"Quiet Area"},{"i":"📡","l":"Internet"},{"i":"🏠","l":"BQ"}]',
  array['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Executive%20Bungalow%20in%20Maitama%20Abuja.',
  'linear-gradient(135deg,#0F5E36,#2D7A76)',
  false
),
(
  'Furnished 2-Bedroom Apartment',
  45000000, '/yr',
  'Lekki Phase 2, Lagos', 'lagos',
  'FOR RENT', 'apartment',
  2, 2, 120,
  'Move-in ready 2-bedroom apartment fully furnished with contemporary furniture. Located in a secure estate with 24/7 CCTV and backup power.',
  array['Fully Furnished','Air Conditioned','Fitted Kitchen','CCTV','POP Ceiling','Wardrobe Fittings'],
  '[{"i":"⚡","l":"Generator"},{"i":"🔒","l":"Security"},{"i":"🚗","l":"Parking"},{"i":"💧","l":"Water"},{"i":"📡","l":"Internet"},{"i":"🛋","l":"Furnished"},{"i":"❄️","l":"A/C"},{"i":"🧺","l":"Laundry"}]',
  array['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Furnished%20Apartment%20in%20Lekki%20Phase%202.',
  'linear-gradient(135deg,#FBC598,#FFB703)',
  false
),
(
  'Corner Piece — C of O Land',
  25000000, '',
  'Ajah, Lagos State', 'lagos',
  'LAND FOR SALE', 'land',
  0, 0, 600,
  'Prime 600sqm corner piece land with full Certificate of Occupancy. Dry land with easy road access, suitable for residential or mixed-use development.',
  array['C of O Title','Corner Piece','Dry Land','Road Access','Perimeter Fenced','Survey Plan'],
  '[{"i":"📄","l":"C of O"},{"i":"📐","l":"600 sqm"},{"i":"🏗","l":"Buildable"},{"i":"🛣","l":"Road Access"},{"i":"📍","l":"Corner Piece"},{"i":"✅","l":"Verified"},{"i":"🌳","l":"Green Area"},{"i":"🏙","l":"Developing"}]',
  array['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop',
        'https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?w=900&h=600&fit=crop'],
  '7612758048372886802',
  'Hello!%20I%20am%20interested%20in%20the%20Corner%20Piece%20Land%20in%20Ajah%20Lagos.',
  'linear-gradient(135deg,#7C3AED,#2D7A76)',
  false
);


-- ─── SEED DATA — BLOG POSTS ─────────────────────────────────────────────────
insert into blog_posts
  (title, slug, excerpt, content, image, gradient, category, read_time, published)
values
(
  'Why Ibeju-Lekki Is Nigeria''s Fastest-Growing Real Estate Corridor',
  'why-ibeju-lekki-is-nigerias-fastest-growing-corridor',
  'The Dangote Refinery, Lekki Deep Sea Port and new airport are transforming land values in this corridor at a pace unseen anywhere in Nigeria.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
  'linear-gradient(135deg,#1B9954,#2D7A76)',
  'Investment', '5 min read', true
),
(
  'Certificate of Occupancy vs Governor''s Consent: What Every Buyer Must Know',
  'certificate-of-occupancy-vs-governors-consent',
  'Confusing these two documents is one of the most common mistakes Nigerian property buyers make. Here is a clear breakdown of what each means.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=400&fit=crop',
  'linear-gradient(135deg,#0F5E36,#1B9954)',
  'Legal Guide', '7 min read', true
),
(
  'How Nigerians in the UK and USA Can Safely Buy Property from Abroad',
  'nigerians-uk-usa-buy-property-from-abroad',
  'From remote title verification to escrow arrangements, this guide walks you through every step of purchasing Nigerian property without leaving your country.',
  'Full article content goes here...',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
  'linear-gradient(135deg,#FFB703,#E63946)',
  'Diaspora', '9 min read', true
);
