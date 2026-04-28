// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Replace these arrays with Supabase queries when backend is ready.
// Pattern: const { data } = await supabase.from('properties').select('*').limit(6)

export interface Property {
  id: number;
  title: string;
  price: string;
  period: string;
  location: string;
  status: 'FOR SALE' | 'FOR RENT' | 'SHORT LET' | 'OFF-PLAN' | 'LAND FOR SALE';
  statusColor: string;
  beds: number;
  baths: number;
  sqm: number;
  img: string;
  gradient: string;
  featured?: boolean;
}

export interface Service {
  emoji: string;
  title: string;
  desc: string;
  gradient: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  gradient: string;
}

export interface BlogPost {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  gradient: string;
  slug: string;
  content: string;
}

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Classical Lagos House',
    price: '₦120,000,000',
    period: '/yr',
    location: 'No. 9 Ikeja GRA, Lagos',
    status: 'FOR RENT',
    statusColor: '#E63946',
    beds: 3, baths: 3, sqm: 250,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
    featured: true,
  },
  {
    id: 2,
    title: 'Luxury Penthouse',
    price: '₦450,000,000',
    period: '',
    location: 'Lekki Phase 1, Lagos State',
    status: 'FOR SALE',
    statusColor: '#0F5E36',
    beds: 5, baths: 5, sqm: 420,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
  },
  {
    id: 3,
    title: 'Modern Duplex',
    price: '₦85,000,000',
    period: '/yr',
    location: 'Victoria Island, Lagos',
    status: 'FOR RENT',
    statusColor: '#E63946',
    beds: 4, baths: 4, sqm: 310,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#2D7A76,#FFB703)',
  },
  {
    id: 4,
    title: 'Executive 4-Bedroom Bungalow',
    price: '₦180,000,000',
    period: '',
    location: 'Maitama District, Abuja FCT',
    status: 'FOR SALE',
    statusColor: '#0F5E36',
    beds: 4, baths: 4, sqm: 320,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#0F5E36,#2D7A76)',
  },
  {
    id: 5,
    title: 'Furnished 2-Bedroom Apartment',
    price: '₦45,000,000',
    period: '/yr',
    location: 'Lekki Phase 2, Lagos',
    status: 'FOR RENT',
    statusColor: '#E63946',
    beds: 2, baths: 2, sqm: 120,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#FBC598,#FFB703)',
  },
  {
    id: 6,
    title: 'Corner Piece — C of O Land',
    price: '₦25,000,000',
    period: '',
    location: 'Ajah, Lagos State',
    status: 'LAND FOR SALE',
    statusColor: '#7C3AED',
    beds: 0, baths: 0, sqm: 600,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=420&fit=crop',
    gradient: 'linear-gradient(135deg,#7C3AED,#2D7A76)',
  },
];

export const SERVICES: Service[] = [
  {
    emoji: '🏠',
    title: 'Property Sales',
    desc: 'We match buyers with premium verified properties across Lagos, Abuja and Port Harcourt. Full transaction management to completion.',
    gradient: 'linear-gradient(135deg,#1B9954,#0F5E36)',
  },
  {
    emoji: '🔑',
    title: 'Property Rentals',
    desc: 'Long-term and short-let arrangements. Tenant sourcing, referencing, lease agreements and deposit management.',
    gradient: 'linear-gradient(135deg,#E63946,#FF6B9D)',
  },
  {
    emoji: '📊',
    title: 'Property Valuation',
    desc: 'NIESV-certified professional valuers. Full written valuation report accepted by banks for mortgage and insurance.',
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
  },
  {
    emoji: '💼',
    title: 'Investment Advisory',
    desc: 'ROI analysis, yield projections, growth corridor identification and portfolio structuring for diaspora investors.',
    gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Al-Wajud found me the perfect duplex in Lekki in under two weeks. The title was clean, the team was professional, and I felt genuinely looked after throughout the whole process.",
    name: 'Chukwuemeka Obi',
    role: 'Property Buyer · Lagos',
    initials: 'CO',
    rating: 5,
    gradient: 'linear-gradient(135deg,#1B9954,#2D7A76)',
  },
  {
    quote: "As a UK-based Nigerian, I was nervous about buying property remotely. Al-Wajud handled everything end to end — from title search to key handover. Absolutely trusted them 100%.",
    name: 'Adaeze Nwosu',
    role: 'Diaspora Investor · UK',
    initials: 'AN',
    rating: 5,
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
  },
  {
    quote: "Their valuation service was thorough and accepted by my mortgage provider first time. Saved me weeks of back-and-forth. The team really knows Nigerian property law inside out.",
    name: 'Babatunde Adeleke',
    role: 'Mortgage Client · Abuja',
    initials: 'BA',
    rating: 5,
    gradient: 'linear-gradient(135deg,#7C3AED,#2D7A76)',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    tag: 'Investment',
    title: 'Why Ibeju-Lekki Is Nigeria\'s Fastest-Growing Real Estate Corridor',
    excerpt: 'The Dangote Refinery, Lekki Deep Sea Port and new airport are transforming land values in this corridor at a pace unseen anywhere in Nigeria.',
    date: 'April 18, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg,#1B9954,#2D7A76)',
    slug: 'top-locations-lagos-property-investment-2026',
    content: `<h2>Tier 1: Established Premium Corridors</h2>
<p><strong>1. Ikoyi</strong> — Lagos's most prestigious address. Dollar-denominated rents, diplomatic tenants, and yields of 6–10% on luxury apartments. Entry prices are high (₦300M+) but capital preservation is the strongest in the city.</p>
<p><strong>2. Victoria Island (VI)</strong> — The commercial and hospitality hub. Short-let apartments yield 12–18% when professionally managed. Strong expat and corporate tenant base.</p>
<p><strong>3. Lekki Phase 1</strong> — The sweet spot for diaspora investors. More accessible entry prices than Ikoyi, strong rental demand from young professionals, and steady 10–15% yield potential.</p>
<h2>Tier 2: High-Growth Emerging Corridors</h2>
<p><strong>4. Ajah</strong> — Rapid infrastructure development and lower land prices make Ajah one of the strongest appreciation plays. Lekki-Epe Expressway expansion is the catalyst.</p>
<p><strong>5. Sangotedo / Orchid Road</strong> — Spillover from Lekki Phase 1 is driving demand here. Gated estate developments are achieving 90%+ occupancy rates.</p>
<p><strong>6. Ibeju-Lekki</strong> — The long-play. Dangote Refinery, Lekki Free Trade Zone, and the planned Lekki Deep Sea Port are transforming this corridor. Land banking here is attracting institutional capital.</p>
<h2>Tier 3: Value-Entry Locations With Strong Fundamentals</h2>
<p><strong>7. Surulere</strong> — Undervalued relative to its infrastructure quality. Strong demand from Lagos Mainland professionals.</p>
<p><strong>8. Yaba</strong> — Tech-hub adjacency ("Yabacon Valley") drives rental demand from young professionals. Excellent for studio and 1-bed investment units.</p>
<p><strong>9. Gbagada</strong> — Well-established middle-class residential corridor. Consistent rental yield of 8–12% with low vacancy rates and good road access.</p>
<p><strong>10. Epe</strong> — Emerging satellite city with government-backed master plan development. Very low entry prices, high long-term upside — suited to patient capital (3–7 year horizon).</p>
<h2>How to Choose the Right Location for Your Strategy</h2>
<ul>
  <li><strong>Rental income now:</strong> VI, Lekki Phase 1, Ikoyi</li>
  <li><strong>Capital appreciation:</strong> Ibeju-Lekki, Epe, Ajah</li>
  <li><strong>Balanced approach:</strong> Sangotedo, Gbagada, Surulere</li>
</ul>
<p><em>Source: Estate Intel Lagos Market Report 2025; Nigerian Bureau of Statistics Real Estate Sector Data.</em></p>`,
  },
  {
    id: 2,
    tag: 'Legal Guide',
    title: 'Certificate of Occupancy vs Governor\'s Consent: What Every Buyer Must Know',
    excerpt: 'Confusing these two documents is one of the most common mistakes Nigerian property buyers make. Here is a clear breakdown of what each means.',
    date: 'April 10, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg,#0F5E36,#1B9954)',
    slug: 'understanding-property-titles-nigeria-c-of-o',
    content: `<h2>Why Title Documents Matter</h2>
<p>In Nigeria, all land is vested in the State Governor under the Land Use Act of 1978. What you purchase is a Right of Occupancy — and the document evidencing that right is what determines how secure your investment is.</p>
<h2>The Four Title Types (Ranked by Security)</h2>
<p><strong>1. Certificate of Occupancy (C of O)</strong> — The gold standard. Issued directly by the State Governor. Confirms the Right of Occupancy has been formally granted. Verifiable with the Lagos State Land Bureau. If your property has a C of O, you have the highest level of protection available.</p>
<p><strong>2. Governor's Consent</strong> — Required when a property with a C of O is transferred (sold) to a new owner. A property with C of O and subsequent Governor's Consent for each transfer is fully clean.</p>
<p><strong>3. Deed of Assignment (supported by survey plan)</strong> — Used in transactions where the land has been allocated but not yet assigned a C of O. Acceptable as a transitional document but must be supported by a registered survey plan and government allocation records.</p>
<p><strong>4. Family/Community Land and Informal Receipts</strong> — The highest-risk category. Family land in Lagos is subject to competing claims from multiple family members across generations. Avoid this category unless you are an experienced local investor with deep community knowledge.</p>
<h2>How to Verify Any Title Document</h2>
<ol>
  <li>Engage a registered Lagos solicitor to conduct a <strong>Land Registry Search</strong> at the Lagos State Land Bureau</li>
  <li>Confirm there are no encumbrances, court orders, or competing claims on file</li>
  <li>For C of O, verify the originating grant is consistent with the property boundaries shown in the survey plan</li>
</ol>
<p>This process typically takes 5–10 business days and costs ₦50,000–₦150,000 in legal fees — the best money you will spend on any property transaction.</p>
<h2>The Key Difference: C of O vs Governor's Consent</h2>
<p>A C of O is the original grant of occupancy rights from the government. Governor's Consent is the approval for every subsequent transfer of those rights. Both must be present and verifiable for a transaction to be considered fully clean. A property sold without Governor's Consent is a transaction the government does not recognise — leaving you exposed.</p>`,
  },
  {
    id: 3,
    tag: 'Diaspora',
    title: 'How Nigerians in the UK and USA Can Safely Buy Property from Abroad',
    excerpt: 'From remote title verification to escrow arrangements, this guide walks you through every step of purchasing Nigerian property without leaving your country.',
    date: 'March 29, 2026',
    readTime: '9 min read',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
    slug: 'buying-property-nigeria-from-usa',
    content: `<h2>Step 1: Establish Your Legal Standing</h2>
<p>Nigerian law permits non-residents and diaspora buyers to own property. However, land ownership is governed by the <strong>Land Use Act of 1978</strong>, which means all land is technically held by State Governors — what you purchase is a <strong>Right of Occupancy</strong>, not freehold in the Western sense.</p>
<p>You will need: a valid Nigerian passport or NIN (National Identification Number), a local legal representative with verifiable credentials, and a Power of Attorney if you cannot be present for signing.</p>
<h2>Step 2: Verify the Title Before Everything Else</h2>
<p>This is where most diaspora buyers make costly errors. The four title types ranked by security:</p>
<ol>
  <li><strong>Certificate of Occupancy (C of O)</strong> — highest security, state-issued</li>
  <li><strong>Governor's Consent</strong> — valid transfer record</li>
  <li><strong>Deed of Assignment</strong> — acceptable if supported by survey</li>
  <li><strong>Family/community land</strong> — highest risk; avoid without extensive due diligence</li>
</ol>
<p>Never transfer funds until a registered Lagos solicitor has confirmed title status directly with the Land Registry.</p>
<h2>Step 3: Transfer Funds Through Compliant Channels</h2>
<p>US regulations (FinCEN) require documentation for large international transfers. Compliant channels include wire transfer via your US bank with stated investment purpose, and licensed FX bureaus in Nigeria for currency conversion. Avoid unofficial transfer networks — they create legal traceability problems on both ends.</p>
<p>Dollar-denominated transactions are possible in Lagos's luxury and commercial segments, protecting you from Naira devaluation risk.</p>
<h2>Step 4: Conduct Remote Due Diligence</h2>
<p>You do not need to fly to Lagos to do this right. A credible agent will provide: live video walk-throughs, an independent valuation report, a neighbourhood infrastructure report (roads, water, power status), and the developer's completion record for off-plan units.</p>
<h2>Step 5: Work With a Verified Agent</h2>
<p>Al-Wajud Properties has a dedicated diaspora investment desk. We handle title verification, remote viewings, escrow arrangement, and key handover — so you can invest with confidence from wherever you are in the world.</p>`,
  },
];

export const TRUST_BADGES = [
  { icon: '🏅', label: 'NIESV Certified', sub: 'Nigerian Institution of Estate Surveyors & Valuers' },
  { icon: '📋', label: 'CAC Registered', sub: 'Corporate Affairs Commission — RC No. 1234567' },
  { icon: '🌍', label: 'ISO 9001:2015', sub: 'Quality Management System Certified' },
  { icon: '🔒', label: 'Escrow Protected', sub: 'Client funds held in dedicated escrow accounts' },
];

export const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '₦50B+', label: 'Properties Transacted' },
  { value: '14+', label: 'Years of Excellence' },
  { value: '3', label: 'States of Operation' },
];
