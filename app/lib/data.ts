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
    title: "Why Nigerian Real Estate is Attracting UK Investors in 2026",
    excerpt: "With UK property yields averaging 3–5%, sophisticated investors are turning to Lagos — a market offering 8–15% rental yields, a 28-million-unit housing deficit, and strong diaspora networks.",
    date: 'April 5, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-1.jpeg',
    gradient: 'linear-gradient(135deg,#2D7A76,#0F5E36)',
    slug: 'nigerian-real-estate-uk-investors-2026',
    content: `<h2>The Lagos Opportunity: Why the Numbers Work</h2>
<p>Lagos is Africa's largest city and its commercial capital. With a GDP estimated above $130 billion, it outperforms many African nations on its own. Rental yields in prime corridors like Ikoyi, Victoria Island, and Lekki regularly sit between 8–15% — three to four times the typical UK return.</p>
<p>Sterling's relative strength against the Naira also gives UK buyers meaningful purchasing power. A mid-tier Lagos apartment in a sought-after estate can generate monthly rents of ₦800,000–₦1.5 million depending on location and finish.</p>
<h2>Why UK Investors Specifically Are Moving In</h2>
<p>Post-Brexit trade realignments and the UK's deepened ties with Commonwealth African nations have made Nigerian investment more accessible and more visible to British capital. Key drivers:</p>
<ul>
  <li><strong>Diaspora networks:</strong> An estimated 800,000+ British-Nigerians serve as market intelligence and on-the-ground due diligence networks.</li>
  <li><strong>Sterling leverage:</strong> Entry prices remain affordable relative to UK benchmarks, with strong upside as infrastructure develops.</li>
  <li><strong>Tax treaty awareness:</strong> Professional investors are working with advisers on dual-taxation planning between the UK and Nigeria.</li>
</ul>
<h2>What the Risk Picture Actually Looks Like</h2>
<p>No serious investment advisory ignores risk. The key considerations for UK investors:</p>
<ul>
  <li><strong>Title verification</strong> is non-negotiable. Always confirm Certificate of Occupancy (C of O) or Governor's Consent before committing funds.</li>
  <li><strong>Currency risk</strong> exists, but dollar-denominated leases in commercial and luxury residential sectors reduce Naira exposure significantly.</li>
  <li><strong>Developer track record</strong> matters. Stick to verified developers with completed project portfolios — avoid off-plan promises without escrow arrangements.</li>
</ul>
<h2>Making Your First Move</h2>
<p>The investors winning in Lagos right now are not speculating — they are positioning in undersupplied corridors with verified titles and credible developers. The window is open, but Lagos is not a secret much longer.</p>
<p><em>Source: World Bank Nigeria Urban Housing Report; Proshare Nigeria Real Estate Outlook 2025.</em></p>`,
  },
  {
    id: 2,
    tag: 'Diaspora',
    title: "Complete Guide: Buying Property in Nigeria from the USA",
    excerpt: "Step-by-step guide for US-based buyers purchasing Nigerian real estate in 2026. Learn the legal process, title checks, and how to send funds safely across borders.",
    date: 'April 3, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-2.jpeg',
    gradient: 'linear-gradient(135deg,#E63946,#0F5E36)',
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
<p>You do not need to fly to Lagos to do this right. A credible agent will provide: live video walk-throughs, an independent valuation report, a neighbourhood infrastructure report (roads, water, power status), and the developer's completion record for off-plan units.</p>`,
  },
  {
    id: 3,
    tag: 'Market Insights',
    title: "Top 10 Locations in Lagos for Property Investment (2026)",
    excerpt: "From Ikoyi to Epe, discover the top 10 Lagos locations offering the best property investment returns in 2026 — ranked by risk-adjusted return profile.",
    date: 'March 28, 2026',
    readTime: '5 min read',
    img: '/images/blogpost-3.jpeg',
    gradient: 'linear-gradient(135deg,#2D7A76,#FBC598)',
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
    id: 4,
    tag: 'Investment',
    title: "Naira vs Dollar: Best Currency to Invest in Nigerian Real Estate",
    excerpt: "Should you invest in Nigerian property in Naira or US Dollars? A clear breakdown of currency risk, dollar-lease structures, and FX strategy for foreign investors.",
    date: 'March 22, 2026',
    readTime: '5 min read',
    img: '/images/blogpost-4.jpeg',
    gradient: 'linear-gradient(135deg,#FFB703,#E63946)',
    slug: 'naira-vs-dollar-nigerian-real-estate-investment',
    content: `<h2>Understanding the FX Reality</h2>
<p>The Central Bank of Nigeria (CBN) now operates a unified FX window following 2023 reforms, meaning the official and parallel rates have largely converged. This has created more transparency but also more volatility.</p>
<p>Key facts for investors: Nigeria's inflation rate remains elevated (25–30% range). Naira depreciation directly erodes Naira-denominated rental income when converted back to GBP or USD. Dollar-denominated properties and leases exist legally in Lagos's premium market.</p>
<h2>The Dollar-Lease Advantage</h2>
<p>In Ikoyi, Victoria Island, and parts of Lekki, commercial properties and high-end residential units are routinely leased in US dollars. This means:</p>
<ul>
  <li>Rent is quoted and collected in USD</li>
  <li>Your return is insulated from Naira devaluation</li>
  <li>Tenants are typically multinationals, embassies, or high-net-worth individuals with dollar income</li>
</ul>
<p>For foreign investors, <strong>dollar-denominated assets in Lagos premium corridors are the cleanest entry point</strong> — you invest in dollars, you collect in dollars.</p>
<h2>When Naira Investment Makes Sense</h2>
<p>Naira-denominated investment works when you are buying land in an emerging corridor (Ibeju-Lekki, Epe) where appreciation will outpace currency losses, you have a long time horizon (5–10 years), or entry prices are low enough that even a 40% Naira depreciation leaves you with strong absolute returns.</p>
<h2>The Practical Currency Strategy</h2>
<p>For UK and US investors in 2026:</p>
<ol>
  <li>Target dollar-denominated assets for income-generating investments</li>
  <li>Use Naira entry only for land-banking in high-conviction growth corridors</li>
  <li>Repatriate profits in USD via CBN-compliant bank channels</li>
  <li>Work with an FX-aware solicitor who understands both jurisdictions</li>
</ol>
<p><em>Source: Central Bank of Nigeria FX Policy Circular 2023; IMF Nigeria Article IV Consultation 2025.</em></p>`,
  },
  {
    id: 5,
    tag: 'Investment',
    title: "How to Earn 15–25% Annual ROI on Nigerian Properties",
    excerpt: "Learn the exact strategies Lagos investors use to achieve 15–25% annual ROI — yield optimisation, short-lets, and location selection explained with real numbers.",
    date: 'March 18, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-5.jpeg',
    gradient: 'linear-gradient(135deg,#0F5E36,#FFB703)',
    slug: 'roi-nigerian-property-investment-2026',
    content: `<h2>The Three ROI Drivers in Lagos</h2>
<p><strong>1. Rental Yield</strong> — Standard long-let apartments in Lekki Phase 1 or Gbagada yield 8–12% annually. Victoria Island short-let apartments, professionally managed, regularly hit 15–20% gross yield. The gap between long-let and short-let in Lagos is significant — and exploitable.</p>
<p><strong>2. Capital Appreciation</strong> — Lagos property in infrastructure-adjacent corridors has appreciated 20–40% in dollar terms over 5-year periods in prime zones. Ibeju-Lekki land prices have risen over 300% in some parcels since the Dangote Refinery groundbreaking.</p>
<p><strong>3. Currency Arbitrage (for foreign buyers)</strong> — Buying at a weak Naira entry price and holding as the economy stabilises creates a third layer of return unavailable to local investors.</p>
<h2>The Short-Let Model: Highest Yield Strategy</h2>
<p>Short-term rentals (Airbnb-style) in Lagos have exploded since 2022. A well-positioned 2-bed apartment in Victoria Island that rents for ₦4.5M per year on a long let can generate ₦8–12M annually on a short-let basis.</p>
<p>What you need to execute this:</p>
<ul>
  <li>A fully furnished unit (add 10–15% to purchase cost)</li>
  <li>A professional short-let management company (fees: 20–25% of revenue)</li>
  <li>Location within 10 minutes of business districts or hotels</li>
</ul>
<p>Net yield after management fees: <strong>12–18% on a well-located VI or Ikoyi unit.</strong></p>
<h2>The Off-Plan Play: Maximising Capital Gains</h2>
<p>Buying off-plan from a credible developer in an emerging corridor (Sangotedo, Ajah) at pre-launch prices and selling at completion typically yields 25–40% gross return over 18–24 months.</p>
<p>Risk mitigation requirements:</p>
<ul>
  <li>Escrow payment structures only</li>
  <li>Developer with minimum two completed projects</li>
  <li>Independent legal review of the purchase agreement</li>
</ul>`,
  },
  {
    id: 6,
    tag: 'Buyer Guide',
    title: "First-Time Buyer's Guide to Lagos Real Estate",
    excerpt: "Everything first-time buyers need to know about purchasing property in Lagos — from budgeting and title checks to choosing the right estate and developer.",
    date: 'March 10, 2026',
    readTime: '9 min read',
    img: '/images/blogpost-6.jpeg',
    gradient: 'linear-gradient(135deg,#E63946,#0F5E36)',
    slug: 'first-time-buyer-guide-lagos-real-estate',
    content: `<h2>Step 1: Define Your Budget and Purpose</h2>
<p>Before you search listings, answer two questions: What is your maximum all-in budget? (Include legal fees at ~3–5% and agency fees at 5–10% of purchase price.) And what is the purpose? Personal use, rental income, or capital appreciation require different locations and property types.</p>
<p>A realistic entry point for a verified Lagos property in an established estate starts around ₦45–80 million for a 1-bed apartment. In Lekki or Ajah, 2-bed apartments in gated estates range ₦80–180 million depending on developer and finish.</p>
<h2>Step 2: Choose Location Based on Purpose</h2>
<p>Match location to your investment logic:</p>
<ul>
  <li><strong>Rental income:</strong> Lekki Phase 1, Victoria Island, Gbagada</li>
  <li><strong>Capital growth:</strong> Ajah, Sangotedo, Ibeju-Lekki</li>
  <li><strong>Personal use / holiday home:</strong> Ikoyi, Banana Island, Lekki Phase 1</li>
</ul>
<h2>Step 3: Verify Developer and Title</h2>
<p>This is where most first-timers skip steps and pay for it. Checklist before committing:</p>
<ul>
  <li>Confirm developer has minimum two fully delivered projects</li>
  <li>Request the land title (C of O or Governor's Consent) and verify with Lagos State Land Registry</li>
  <li>Engage your own solicitor — never rely on the developer's lawyer alone</li>
  <li>Confirm estate management structures (service charge, security, facilities management)</li>
</ul>
<h2>Step 4: Negotiate, Agree Terms, Sign</h2>
<p>Key documents in a Lagos property transaction:</p>
<ul>
  <li><strong>Letter of Offer</strong> — records agreed price and terms</li>
  <li><strong>Contract of Sale</strong> — binding agreement; review carefully</li>
  <li><strong>Deed of Assignment</strong> — transfers title; must be registered</li>
  <li><strong>Receipt</strong> — for all payments made</li>
</ul>
<p>Never make cash transfers without paper documentation at every stage.</p>`,
  },
  {
    id: 7,
    tag: 'Buyer Guide',
    title: "5 Red Flags to Avoid When Buying Property in Nigeria",
    excerpt: "Protect your investment — learn the 5 most dangerous red flags when buying Nigerian property and how serious investors verify before committing funds.",
    date: 'March 5, 2026',
    readTime: '4 min read',
    img: '/images/blogpost-7.jpeg',
    gradient: 'linear-gradient(135deg,#E63946,#FFB703)',
    slug: 'red-flags-buying-property-nigeria',
    content: `<h2>Red Flag 1: No Verifiable Title Document</h2>
<p>If a seller cannot produce a <strong>Certificate of Occupancy (C of O)</strong> or <strong>Governor's Consent</strong> — both verifiable directly with Lagos State Land Registry — walk away. "Family land," "community allocation," or informal receipts from previous owners are not title. They are the foundation of most Lagos property disputes.</p>
<p>Always verify the document number with the Land Bureau directly, not just by inspecting a paper copy.</p>
<h2>Red Flag 2: Pressure to Pay Before Legal Review</h2>
<p>Legitimate sellers and developers welcome legal review. If you are told "another buyer is ready," "the price goes up tomorrow," or "don't worry about the lawyer" — treat each statement as a direct warning. A credible purchase process always includes a solicitor review window of at minimum 5–7 business days before any deposit is collected.</p>
<h2>Red Flag 3: Developer With No Completed Project History</h2>
<p>Any developer asking for deposits who cannot show you physically completed estates with identifiable residents is an unacceptable risk. Request: a site visit to a completed project, references from previous buyers, and escrow payment terms — never full payment direct to developer account before completion.</p>
<h2>Red Flag 4: No Physical Survey or Site Visit Evidence</h2>
<p>Remote buyers are particularly vulnerable here. A property listing with only marketing renders and no survey plan, GPS coordinates, or live video documentation may not be what it appears to be. Insist on: an independent survey, a live video site visit with a trusted agent or solicitor present, and a written site condition report.</p>
<h2>Red Flag 5: Unusually Below-Market Pricing</h2>
<p>Lagos pricing is not perfectly uniform, but extreme outliers are almost always explained by one of three things: a title problem, a physical defect, or fraud. If a property is priced 30%+ below comparable verified listings in the same corridor, the burden of explanation is on the seller.</p>`,
  },
  {
    id: 8,
    tag: 'Market Insights',
    title: "Rent vs Buy in Lagos: Which is Better in 2026?",
    excerpt: "Should you rent or buy in Lagos in 2026? A data-driven breakdown of costs, returns, and the financial case for each decision in today's Lagos market.",
    date: 'Feb 26, 2026',
    readTime: '5 min read',
    img: '/images/blogpost-8.jpeg',
    gradient: 'linear-gradient(135deg,#FFB703,#2D7A76)',
    slug: 'rent-vs-buy-lagos-2026',
    content: `<h2>The Case for Buying in Lagos Right Now</h2>
<p>Lagos rents have increased 40–60% in most corridors between 2023 and 2025, driven by inflation, Naira weakness, and housing undersupply. This makes the cost-of-renting trajectory increasingly painful for tenants.</p>
<p><strong>Buy if:</strong></p>
<ul>
  <li>You have a 30–40% deposit available</li>
  <li>You plan to stay 3+ years in Lagos</li>
  <li>You are targeting a corridor with verified appreciation trajectory</li>
</ul>
<h2>The Case for Renting in Lagos Right Now</h2>
<p>Renting remains rational if you need geographic flexibility (common in expat postings), cannot yet verify a clean title on properties in your target area, or are waiting for infrastructure developments to confirm a location's upside before committing.</p>
<p>Renting also preserves capital that can be deployed into higher-yield investments (short-let units, land banking) rather than a primary residence.</p>
<h2>For Foreign Investors: The Buy Case Is Strong</h2>
<p>From a foreign investor's perspective, this is not a personal consumption decision — it is a capital allocation decision. The buy case is compelling:</p>
<ul>
  <li>Rental yields of 8–18% in prime Lagos corridors exceed what renting and redeploying capital elsewhere achieves</li>
  <li>Lagos property assets are dollar-accessible in premium segments</li>
  <li>The housing deficit (28 million units, World Bank) is a structural demand driver, not a cyclical one</li>
</ul>
<p>The investor who rents a Lagos apartment while their capital sits in a UK savings account at 5% is leaving a significant arbitrage on the table.</p>`,
  },
  {
    id: 9,
    tag: 'Legal Guide',
    title: "Understanding Property Titles in Nigeria: C of O & Governor's Consent",
    excerpt: "Learn what Certificate of Occupancy, Governor's Consent, and other Nigerian property titles mean — and which ones protect foreign investors most effectively.",
    date: 'Feb 18, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-9.jpeg',
    gradient: 'linear-gradient(135deg,#0F5E36,#2D7A76)',
    slug: 'understanding-property-titles-nigeria-c-of-o',
    content: `<h2>Nigeria's Land Use Act: The Legal Foundation</h2>
<p>All land in Nigeria is technically vested in the State Governor under the <strong>Land Use Act of 1978</strong>. This means you cannot own land outright (freehold) in the Western sense. What you purchase is a <strong>Right of Occupancy</strong> — a long-term lease from the state, typically 99 years. Any transfer of this right requires state documentation.</p>
<p>This is not a weakness — it is simply a different system. Millions of legal, profitable transactions occur under it annually.</p>
<h2>The Four Title Types (Ranked by Security)</h2>
<p><strong>1. Certificate of Occupancy (C of O)</strong> — The gold standard. Issued directly by the State Governor. Confirms the Right of Occupancy has been formally granted. Verifiable with the Lagos State Land Bureau. If your property has a C of O, you have the highest level of protection available.</p>
<p><strong>2. Governor's Consent</strong> — Required when a property with a C of O is transferred (sold) to a new owner. A property with C of O and subsequent Governor's Consent for each transfer is fully clean.</p>
<p><strong>3. Deed of Assignment (supported by survey plan)</strong> — Used in transactions where the land has been allocated but not yet assigned a C of O. Acceptable as a transitional document but must be supported by a registered survey plan and government allocation records.</p>
<p><strong>4. Family/Community Land and Informal Receipts</strong> — The highest-risk category. Family land in Lagos is subject to competing claims from multiple family members across generations. Avoid this category unless you are an experienced local investor with deep community knowledge.</p>
<h2>How to Verify a Title (Step-by-Step)</h2>
<ol>
  <li>Request the title document from the seller</li>
  <li>Note the title number, name, and date of issue</li>
  <li>Engage a registered Lagos solicitor to conduct a <strong>Land Registry Search</strong> at the Lagos State Land Bureau</li>
  <li>Confirm there are no encumbrances, court orders, or competing claims on file</li>
  <li>For C of O, verify the originating grant is consistent with the property boundaries shown in the survey plan</li>
</ol>
<p>This process typically takes 5–10 business days and costs ₦50,000–₦150,000 in legal fees — the best money you will spend on any property transaction.</p>
<p><em>Source: Land Use Act of Nigeria 1978; Lagos State Land Bureau official documentation.</em></p>`,
  },
  {
    id: 10,
    tag: 'Buyer Guide',
    title: "How to Inspect a Property in Nigeria (Checklist)",
    excerpt: "Complete property inspection checklist for Nigeria — covering structural quality, infrastructure, title, legal checks, and remote inspection methods for diaspora buyers.",
    date: 'Feb 10, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-10.jpeg',
    gradient: 'linear-gradient(135deg,#2D7A76,#E63946)',
    slug: 'how-to-inspect-property-nigeria-checklist',
    content: `<h2>Part 1: Physical Structure Inspection</h2>
<p><strong>Structural checks:</strong></p>
<ul>
  <li>Visible cracks in walls (hairline = monitor; wide = investigate structurally)</li>
  <li>Floor levelness and tile integrity</li>
  <li>Roof condition (flat roofs: check for drainage pooling)</li>
  <li>Staircase stability (especially in older builds)</li>
</ul>
<p><strong>Finishing quality:</strong></p>
<ul>
  <li>Electrical socket and switch quality</li>
  <li>Plumbing fixtures (check pressure on every tap)</li>
  <li>Door and window frame alignment (warping indicates settlement issues)</li>
  <li>Ceiling condition (water stains = plumbing or roof failure above)</li>
</ul>
<h2>Part 2: Infrastructure and Utilities</h2>
<ul>
  <li><strong>Power:</strong> Confirm estate generator capacity and monthly service charge. What is the average daily grid supply (NEPA/PHCN hours)?</li>
  <li><strong>Water:</strong> Borehole or municipal? Confirm pump system and tank capacity.</li>
  <li><strong>Drainage:</strong> Walk the perimeter. Flood-prone properties in Lagos are a documented risk in certain low-lying corridors.</li>
  <li><strong>Road access:</strong> Condition of access roads to the estate — both main road and final approach.</li>
  <li><strong>Security:</strong> Confirm gate management, CCTV, patrol schedule, and emergency response procedure.</li>
</ul>
<h2>Part 3: Legal and Title Verification (Pre-Inspection)</h2>
<p>Complete this before the physical inspection — it determines whether you should inspect at all:</p>
<ul>
  <li>Title document obtained and type confirmed (C of O preferred)</li>
  <li>Land Registry search initiated with solicitor</li>
  <li>Survey plan obtained and cross-referenced with physical property boundaries</li>
  <li>Developer CAC (Corporate Affairs Commission) registration confirmed</li>
  <li>No court order or encumbrance on file</li>
</ul>
<h2>Part 4: Remote Inspection Protocol (For Diaspora Buyers)</h2>
<ol>
  <li>Appoint an independent local agent or surveyor — not the seller's agent — to conduct the inspection on your behalf</li>
  <li>Request a live video walk-through via WhatsApp or Zoom — go room by room, including roof, generator room, and external boundaries</li>
  <li>Request a written inspection report with timestamped photographs</li>
  <li>Cross-check the neighbourhood using Google Maps satellite view for surrounding land use and drainage patterns</li>
  <li>Speak directly with an existing resident of the estate — they will tell you things the marketing brochure will not</li>
</ol>`,
  },
  {
    id: 11,
    tag: 'Investment',
    title: "Buy-to-Let Strategy in Lagos: How Investors Earn Passive Income",
    excerpt: "Lagos buy-to-let yields of 8–15% are attracting serious investors. Here's the exact strategy — from location selection to tenant management — for building passive income from Nigerian property.",
    date: 'April 10, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-11.jpeg',
    gradient: 'linear-gradient(135deg,#1A6B4A,#2D7A76)',
    slug: 'buy-to-let-strategy-lagos-passive-income',
    content: `<h2>Why Buy-to-Let Works in Lagos</h2>
<p>Lagos has a housing deficit exceeding 3 million units — and the city's population grows by roughly 600,000 people per year. Demand for rental accommodation consistently outstrips supply across all market tiers, from budget apartments in Surulere to luxury flats in Ikoyi. This structural undersupply is the fundamental engine of Lagos buy-to-let returns.</p>
<p>Rental yields in established corridors typically range from 8–12% gross. In high-demand short-let areas like Lekki Phase 1, well-managed serviced apartments can achieve 12–18% gross yields depending on occupancy rates. Compare this to UK long-term buy-to-let averaging 3–5% gross, and the Lagos case becomes compelling for any yield-focused investor.</p>
<h2>Choosing the Right Location for Buy-to-Let</h2>
<p>Not all Lagos locations deliver equal rental performance. Prioritise these three criteria when evaluating a buy-to-let location:</p>
<ul>
  <li><strong>Employment catchment:</strong> Properties within 20 minutes of major commercial hubs — Lagos Island, Victoria Island, Lekki Phase 1, Ikeja GRA — command premium rents and attract professional tenants with lower default rates.</li>
  <li><strong>Infrastructure reliability:</strong> Estates with borehole water, backup power, and paved internal roads retain tenants longer and justify higher rents. Tenant churn is the silent killer of buy-to-let returns.</li>
  <li><strong>Proven rental history:</strong> Ask developers and agents for confirmed rental transaction data in the estate — not projected yields, actual achieved rents. A good agent will have this on record.</li>
</ul>
<h2>Calculating Your Real Return</h2>
<p>Gross yield is what developers advertise. Net yield is what you actually earn. The gap matters:</p>
<ul>
  <li><strong>Agency fees:</strong> Typically 10% of one year's rent, paid by tenant — but factor in re-letting costs between tenancies.</li>
  <li><strong>Service charge:</strong> Gated estates charge monthly or annual service fees covering security, cleaning, and generator fuel. Confirm this before purchase — it directly reduces net yield.</li>
  <li><strong>Maintenance reserve:</strong> Budget 5–8% of annual rent for repairs, repainting between tenancies, and appliance replacement.</li>
  <li><strong>Property management:</strong> If you are managing from abroad, professional management costs 8–12% of monthly rent. Non-negotiable for diaspora investors — the alternative is delayed rent collection and unmanaged deterioration.</li>
</ul>
<p>A ₦150,000/month rental apartment generating ₦1.8 million annually, minus 20% for fees, service charge, and maintenance, still nets ₦1.44 million — a 9.6% net yield on an ₦15 million property. That math holds up.</p>`,
  },
  {
    id: 12,
    tag: 'Investment',
    title: "Land Banking in Nigeria: The Smartest Long-Term Investment Strategy",
    excerpt: "Land banking in Nigeria's fast-expanding corridors has delivered 200–400% capital gains over 5–10 years. Here's how to identify the right land, verify it legally, and hold it for maximum return.",
    date: 'April 8, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-12.jpeg',
    gradient: 'linear-gradient(135deg,#78350F,#92400E)',
    slug: 'land-banking-nigeria-long-term-investment',
    content: `<h2>What Is Land Banking — and Why Nigeria Is Ideal for It</h2>
<p>Land banking is the practice of purchasing undeveloped or underdeveloped land in a growth corridor, holding it while the surrounding area develops, and selling at a significant premium once infrastructure and demand have matured. It is the oldest wealth-building strategy in property investment — and Lagos is currently one of the world's most compelling environments for it.</p>
<p>The logic is straightforward: Lagos is a city of 28+ million people that is physically expanding outward. Government infrastructure investment — the Lekki Deep Sea Port, the Lekki-Epe Expressway expansion, the Lagos-Calabar coastal highway — is unlocking land corridors that were inaccessible a decade ago. Land in these corridors is being repriced dramatically as access improves.</p>
<h2>Where to Land Bank in Lagos Right Now</h2>
<p>The highest-performing land banking corridors in 2026:</p>
<ul>
  <li><strong>Ibeju-Lekki:</strong> The most discussed corridor. Proximity to the Dangote Refinery, Lekki Free Trade Zone, and the Deep Sea Port has made this a mainstream institutional target. Early buyers from 2015–2018 have seen 300–500% appreciation. There is still upside, but prices have risen significantly — due diligence is now more critical than ever.</li>
  <li><strong>Epe:</strong> Quieter, less expensive, with strong infrastructure signals. The Lagos State government has earmarked Epe as an agricultural and industrial hub. Land prices remain accessible relative to Ibeju-Lekki with comparable 5–10 year growth potential.</li>
  <li><strong>Mowe/Ofada (Ogun State border):</strong> For investors willing to cross Lagos state lines, this corridor benefits from Lagos commuter overflow and improving rail access. Lower entry point, longer horizon.</li>
</ul>
<h2>Title Verification Is Non-Negotiable for Land</h2>
<p>Land fraud is the primary risk in Nigerian land banking — and it is overwhelmingly concentrated in undocumented or family/community land. The rule is absolute: never purchase land without a verified Certificate of Occupancy (C of O) or confirmed Governor's Consent. Engage a solicitor to conduct an official Land Registry search before any payment.</p>
<h2>How to Hold — and When to Exit</h2>
<p>Land banking requires patience. The minimum recommended holding period for Lagos growth corridors is 5 years; 7–10 years maximises return in most cases. During the holding period, ensure your land is physically demarcated and secured — boundary disputes are common on unoccupied plots.</p>`,
  },
  {
    id: 13,
    tag: 'Landlord',
    title: "Short-Let vs Long-Term Rental in Lagos: Which Makes More Money?",
    excerpt: "Short-let can yield 2–3x more than long-term rental in Lagos — but it demands more management. This guide breaks down the real numbers so you can choose the right strategy for your property.",
    date: 'April 6, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-13.jpeg',
    gradient: 'linear-gradient(135deg,#1E3A8A,#2563EB)',
    slug: 'short-let-vs-long-term-rental-lagos',
    content: `<h2>The Core Difference: Cash Flow vs Stability</h2>
<p>Long-term rental means a fixed tenant paying monthly — predictable, low-management, low-maintenance intensity. Short-let (serviced apartment, Airbnb-style) means multiple guests per month — higher gross revenue, but more operational intensity and vacancy risk. Neither is universally better. The right choice depends on your property, location, and how much management involvement you want or can support.</p>
<h2>The Numbers: A Direct Comparison</h2>
<p>Take a 2-bedroom apartment in Lekki Phase 1 valued at ₦40 million:</p>
<ul>
  <li><strong>Long-term rental:</strong> ₦3.5–4.5 million per annum. Net yield after agency, service charge, and maintenance: approximately 7–9%. Predictable. One annual rent payment upfront is common in Nigeria.</li>
  <li><strong>Short-let:</strong> ₦75,000–₦120,000 per night depending on season and finish. At 65% average occupancy (22–23 nights/month), that is ₦1.65–₦2.7 million per month — ₦19.8–₦32.4 million per annum gross. After all fees and costs, net yield: 20–45%.</li>
</ul>
<p>The premium is real — but so is the complexity. Short-let properties in Lagos require full furnishing to hotel standard, reliable generator and water supply, a responsive management team or agency, and consistent marketing across multiple platforms.</p>
<h2>When Short-Let Makes Sense</h2>
<p>Short-let works best in specific conditions: the property is in a high-footfall location (Lekki, VI, Ikoyi, Ikeja GRA near the airport), the property is furnished to a quality standard that photographs well and commands premium nightly rates, and you have a management partner who can handle check-ins, cleaning, and maintenance responsively.</p>
<h2>When Long-Term Rental Is the Smarter Choice</h2>
<p>Long-term rental is right for investors who want truly passive income, whose property is in a residential-majority location (Surulere, Gbagada, Magodo, Ajah), or who are building a portfolio and cannot dedicate management bandwidth to each unit.</p>`,
  },
  {
    id: 14,
    tag: 'Investment',
    title: "Joint Venture vs Outright Purchase in Nigerian Real Estate",
    excerpt: "Joint venture or outright purchase? Both can build wealth in Nigerian real estate — but each suits a different investor profile. This guide breaks down the risk, return, and control differences clearly.",
    date: 'April 4, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-14.jpeg',
    gradient: 'linear-gradient(135deg,#5B21B6,#7C3AED)',
    slug: 'joint-venture-vs-outright-purchase-nigeria-real-estate',
    content: `<h2>Two Paths to Nigerian Property Ownership</h2>
<p>Nigerian real estate offers multiple entry structures. The two most common for investors are outright purchase — acquiring full ownership of a property or land — and joint venture, where you co-invest with a developer, partner, or landowner to share both capital input and eventual return. Both are legitimate paths. The right one depends on your capital level, risk appetite, and desired level of control.</p>
<h2>Outright Purchase: Full Control, Full Exposure</h2>
<p>Outright purchase is straightforward: you pay the full price, the property becomes yours (under Right of Occupancy under the Land Use Act), and all returns — rental income and capital appreciation — are yours. The requirements are equally clear: sufficient capital to cover full purchase price plus transaction costs (legal fees, survey, stamp duty, agency — typically 10–15% of property value), and the due diligence discipline to verify title independently.</p>
<h2>Joint Venture: Lower Capital, Shared Upside</h2>
<p>Joint venture structures allow investors to participate in larger or more profitable developments with less upfront capital. Common JV structures in Nigeria include:</p>
<ul>
  <li><strong>Land + capital JV:</strong> Landowner provides the land; investor funds the development. Profits from sale or rental income split by agreed ratio (typically 50/50 or 60/40 depending on land value vs construction cost).</li>
  <li><strong>Co-investment:</strong> Two or more investors purchase a property together, sharing ownership proportionally. Simple structure, but requires clear legal documentation of each party's share and exit rights.</li>
  <li><strong>Developer off-plan JV:</strong> Investor provides early-stage capital for an off-plan project in exchange for a preferred return or a discounted unit. Returns can be 20–35% over 18–24 months if the developer is credible.</li>
</ul>
<h2>Risk Comparison</h2>
<p>Outright purchase carries market risk and title risk — both of which are manageable with proper due diligence. Joint ventures carry all of those, plus <strong>partner risk</strong> — the risk that your co-investor or developer fails to perform, disputes arise over profit sharing, or the JV agreement was not legally sound from the start.</p>
<p>The mitigation is documentation: every JV must be governed by a professionally drafted Joint Venture Agreement specifying each party's contribution, decision-making authority, profit distribution mechanism, and dispute resolution process.</p>`,
  },
  {
    id: 15,
    tag: 'Investment',
    title: "Real Estate Investment Trusts (REITs) in Nigeria Explained",
    excerpt: "Nigeria's REITs allow investors to access real estate returns without buying property directly. Here's how they work, the main listed options, and how they compare to direct property ownership.",
    date: 'April 2, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-15.jpeg',
    gradient: 'linear-gradient(135deg,#065F46,#059669)',
    slug: 'reits-nigeria-explained-investors-guide',
    content: `<h2>What Is a REIT and How Does It Work in Nigeria?</h2>
<p>A Real Estate Investment Trust (REIT) is a company that owns income-generating real estate assets — commercial properties, shopping centres, office blocks, or residential estates — and is listed on a stock exchange. Investors buy shares in the REIT, which entitles them to a proportional share of the rental income generated, distributed as dividends.</p>
<p>In Nigeria, REITs are regulated by the Securities and Exchange Commission (SEC) and traded on the Nigerian Exchange Group (NGX). They are required to distribute at least 90% of their taxable income to shareholders as dividends — making them an income-focused investment vehicle.</p>
<h2>Nigeria's Main Listed REITs</h2>
<p>The Nigerian REIT market remains nascent compared to developed markets, but several vehicles offer genuine exposure to Nigerian real estate income:</p>
<ul>
  <li><strong>UPDC REIT:</strong> One of the oldest and most established Nigerian REITs, managed by UPDC (UAC Property Development Company). Portfolio includes residential and commercial properties in Lagos.</li>
  <li><strong>Skye Shelter Fund:</strong> Focused on residential properties and mortgage-backed returns. Targets the growing middle-income housing segment.</li>
</ul>
<p>Always verify current listings and fund status on the NGX official website — the REIT market evolves with new listings and structural changes.</p>
<h2>REITs vs Direct Property: How They Compare</h2>
<ul>
  <li><strong>Liquidity:</strong> REITs win clearly. REIT shares can be bought and sold on the exchange in hours; direct property can take months to transact.</li>
  <li><strong>Capital requirement:</strong> REITs are accessible with small capital — you can invest ₦50,000. Direct property requires millions.</li>
  <li><strong>Return potential:</strong> Direct property in prime Lagos locations has delivered higher capital appreciation historically. REITs primarily offer income returns (dividends), with share price appreciation as a secondary driver.</li>
  <li><strong>Control:</strong> Direct property owners make their own decisions. REIT investors delegate to the fund manager — management quality matters significantly.</li>
</ul>
<p><em>Source: SEC Nigeria REIT Guidelines; NGX Listed Securities Database.</em></p>`,
  },
  {
    id: 16,
    tag: 'Market Insights',
    title: "Lagos Real Estate Market Forecast 2026",
    excerpt: "Lagos property prices, demand drivers, infrastructure pipeline, and rental market trends for 2026. A data-driven forecast for investors planning entry or expansion this year.",
    date: 'March 30, 2026',
    readTime: '8 min read',
    img: '/images/blogpost-16.jpeg',
    gradient: 'linear-gradient(135deg,#0F5E36,#2D7A76)',
    slug: 'lagos-real-estate-market-forecast-2026',
    content: `<h2>Macro Context: What Is Driving Lagos Property in 2026</h2>
<p>The Lagos property market in 2026 is being shaped by three converging forces: a sustained housing deficit that no short-term supply response can close, infrastructure investment unlocking previously inaccessible corridors, and diaspora capital returning at scale as Nigeria stabilises its foreign exchange framework.</p>
<h2>Price Performance by Segment (2025–2026)</h2>
<ul>
  <li><strong>Luxury residential (Ikoyi, Victoria Island):</strong> Dollar-denominated prices have held firm at $500–$2,500/sqm depending on finish and tower. Foreign buyers are finding pricing stable in dollar terms — creating a relative buying opportunity.</li>
  <li><strong>Mid-market estates (Lekki Phase 1, Ajah, Sangotedo):</strong> Strong demand from Lagos's professional class. 2-bedroom apartments in gated estates: ₦30–₦60 million. Year-on-year appreciation: 18–28% in Naira terms.</li>
  <li><strong>Growth corridor land (Ibeju-Lekki, Epe):</strong> Continued appreciation as Dangote Refinery operations ramp up and Deep Sea Port activity increases. Some parcels have seen 20–35% appreciation in the past 12 months alone.</li>
</ul>
<h2>Infrastructure Pipeline: What Will Move Prices in 2026–2028</h2>
<ul>
  <li><strong>Lekki Deep Sea Port:</strong> Operational ramp-up continues — logistics and industrial land within 10–15km radius remains strategically underpriced.</li>
  <li><strong>Lagos-Calabar Coastal Highway:</strong> Corridor opening will unlock coastal communities between Lagos and Ogun State.</li>
  <li><strong>Blue Line Rail Extension:</strong> Commuter connectivity to Lagos Island is being repriced as the rail network expands.</li>
  <li><strong>Lekki-Epe Expressway Expansion:</strong> Ongoing widening is reducing commute times and improving logistics — directly supporting Ajah, Sangotedo, and Epe residential values.</li>
</ul>
<h2>Investment Outlook: 2026 Entry Assessment</h2>
<p>For investors with a 5-year+ horizon, 2026 remains a strong entry point — particularly in mid-market residential and growth corridor land. Prices have risen from pandemic lows but infrastructure and demographic drivers have not yet been fully priced in.</p>
<p><em>Data sources: Lagos State Ministry of Economic Planning; Knight Frank Nigeria 2025 Report; Proshare Real Estate Outlook.</em></p>`,
  },
  {
    id: 17,
    tag: 'Market Insights',
    title: "How Infrastructure Projects Increase Property Value in Lagos",
    excerpt: "Every major Lagos infrastructure project has triggered a property value surge in its surrounding corridor. Here's the historical pattern — and which projects are creating the next opportunity now.",
    date: 'March 26, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-17.jpeg',
    gradient: 'linear-gradient(135deg,#92400E,#D97706)',
    slug: 'how-infrastructure-projects-increase-property-value-lagos',
    content: `<h2>The Infrastructure-Property Value Relationship</h2>
<p>Real estate values are, at their core, a function of access and desirability. Infrastructure — roads, ports, rail, utilities — is the primary driver of access. When infrastructure improves in a corridor, what was previously 90 minutes from the city centre becomes 30 minutes. The result is predictable: demand rises, land use intensifies, and prices follow.</p>
<p>Lagos has demonstrated this pattern consistently. The development of Victoria Island in the 1980s–1990s, the construction of the Third Mainland Bridge, the Lekki Phase 1 and 2 residential buildout along the Lekki-Epe Expressway — each wave of infrastructure unlocked a new property corridor. The investors who positioned before completion captured the largest gains.</p>
<h2>Case Study: Lekki-Epe Expressway and the Lekki Corridor</h2>
<p>When the Lekki-Epe Expressway began significant widening and improvement in the early 2010s, land in Ajah was priced at ₦500,000–₦1.5 million per plot. By 2020, the same plots had risen to ₦4–₦12 million. By 2025, ₦8–₦25 million. The infrastructure investment did not cause speculative demand — it caused real demand by making the corridor viable for residential development, commercial activity, and logistics. Prices followed fundamentals.</p>
<h2>Active Infrastructure Projects to Track in 2026</h2>
<ul>
  <li><strong>Lekki Deep Sea Port:</strong> Africa's deepest sea port, now operational and ramping up. Ibeju-Lekki and Epe residential values are the primary beneficiary.</li>
  <li><strong>Lagos-Calabar Coastal Highway:</strong> When complete, this highway will open 700km of coastal land between Lagos and Cross River State.</li>
  <li><strong>Blue Line Rail (Lagos Rail Mass Transit):</strong> The operational Blue Line corridor from Marina to Mile 2 is already repricing residential values along its route.</li>
  <li><strong>Abeokuta-Lagos Standard Gauge Railway:</strong> Federal government project that, when operational, will make Ogun State a genuine Lagos commuter alternative.</li>
</ul>
<h2>How to Position Before the Price Surge</h2>
<p>The highest-return infrastructure plays follow a consistent pattern: identify a credible, funded infrastructure project with a confirmed route or corridor; acquire verified land within the anticipated impact zone before completion; hold through the construction phase; and exit or develop once infrastructure is operational and prices have repriced.</p>`,
  },
  {
    id: 18,
    tag: 'Market Insights',
    title: "Smart Homes in Nigeria: The Future of Real Estate Investment",
    excerpt: "Smart home technology is reshaping Lagos's luxury and mid-market property segments. Here's what's driving adoption, which features add the most value, and why investors should pay attention now.",
    date: 'March 22, 2026',
    readTime: '6 min read',
    img: '/images/blogpost-18.jpeg',
    gradient: 'linear-gradient(135deg,#1E3A8A,#0F5E36)',
    slug: 'smart-homes-nigeria-future-real-estate-investment',
    content: `<h2>Why Smart Home Technology Is Taking Hold in Lagos</h2>
<p>Lagos's property market has a reliability problem that technology is beginning to solve. Inconsistent grid power, variable water supply, and security concerns in urban environments have made home automation not a luxury feature but a practical response to real infrastructure challenges. The result is an accelerated adoption curve for smart home technology relative to many global markets.</p>
<p>Where smart home adoption in the UK or USA was driven primarily by convenience, Lagos adoption is driven by necessity: solar-battery integration that automatically manages grid and generator switching; smart water tanks that monitor and conserve supply; and security systems with remote monitoring that give expatriates and diaspora owners visibility into properties they manage from abroad.</p>
<h2>Smart Features That Add Measurable Value</h2>
<p>Not all smart home features are equal in the Lagos market. These deliver the most measurable value premium:</p>
<ul>
  <li><strong>Solar-battery power systems:</strong> A property with a well-specified solar-battery system eliminates generator noise, fuel costs, and power interruption. In a city where generator fuel can cost ₦50,000–₦150,000 per month, this is a direct saving tenants will pay a premium to capture. Properties with solar systems command 10–20% rental premiums in comparable estates.</li>
  <li><strong>Smart security (CCTV + remote access):</strong> Integrated CCTV with cloud recording, smart locks with remote access codes, and motion-sensor alerts are increasingly standard in premium estates.</li>
  <li><strong>Smart water management:</strong> Automatic borehole pumping, leak detection, and tank level monitoring address Lagos's intermittent water supply.</li>
  <li><strong>Air quality and cooling efficiency:</strong> Smart AC control (scheduling, zoning, remote access) reduces electricity costs significantly.</li>
</ul>
<h2>The Developer Response — and the Investment Implication</h2>
<p>Lagos's leading developers — Mixta, Shoreline, RevolutionPlus, and others — are incorporating smart home specifications into new estate designs at the mid-market and above. Off-plan buyers who choose smart-spec properties now are positioning in the segment that will be most liquid in 5–10 years, as buyer expectations shift and non-smart properties face discount pressure at resale.</p>`,
  },
  {
    id: 19,
    tag: 'Legal Guide',
    title: "Hidden Costs of Buying Property in Nigeria (Investors Must Know)",
    excerpt: "The listed price is rarely the final cost of buying property in Nigeria. Investors regularly encounter legal fees, taxes, agency costs, and estate charges that add 15–25% to the transaction total.",
    date: 'March 18, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-19.jpeg',
    gradient: 'linear-gradient(135deg,#9D174D,#DB2777)',
    slug: 'hidden-costs-buying-property-nigeria',
    content: `<h2>The Gap Between Listed Price and Total Acquisition Cost</h2>
<p>First-time buyers in Nigeria — especially diaspora investors — consistently underestimate total acquisition costs. The listed price of a property is the starting point, not the finish line. Transaction costs in Lagos typically add 15–25% to the total funds required.</p>
<h2>The Core Transaction Costs</h2>
<ul>
  <li><strong>Legal fees:</strong> A qualified Lagos solicitor will typically charge 5–10% of the property value for handling the full transaction. For a ₦30 million property, budget ₦1.5–₦3 million. Do not economise on legal representation — this is where fraud is caught and title problems are identified.</li>
  <li><strong>Agency/estate agent fees:</strong> Standard Lagos practice is 5–10% of the purchase price, typically paid by the buyer. On a ₦30 million property: ₦1.5–₦3 million.</li>
  <li><strong>Stamp duty:</strong> Levied by the Lagos State government on property transactions. Currently 1.5% of the property value for residential transactions above ₦1 million. On ₦30 million: ₦450,000.</li>
  <li><strong>Governor's Consent fee:</strong> When transferring a property with an existing C of O, you require Governor's Consent for the transfer to be legally registered. This is a state government fee: typically 3% of the property value plus administrative charges. On ₦30 million: approximately ₦900,000–₦1.2 million.</li>
  <li><strong>Survey fees:</strong> An updated survey plan is required for title registration. ₦150,000–₦400,000 depending on property size and location.</li>
  <li><strong>Registration fees:</strong> Land Registry registration of the deed of assignment. Approximately 2% of property value. On ₦30 million: ₦600,000.</li>
</ul>
<h2>Total Cost Illustration</h2>
<p>A ₦30 million property purchase in Lagos with full transaction costs:</p>
<ul>
  <li>Purchase price: ₦30,000,000</li>
  <li>Legal fees (7%): ₦2,100,000</li>
  <li>Agency fees (7.5%): ₦2,250,000</li>
  <li>Stamp duty (1.5%): ₦450,000</li>
  <li>Governor's Consent (3%): ₦900,000</li>
  <li>Survey + registration: ₦800,000</li>
  <li><strong>Total acquisition cost: ₦36,500,000 (22% above listed price)</strong></li>
</ul>
<p><em>Fee structures current as of April 2026. Always confirm current government fees with your solicitor as rates are subject to change.</em></p>`,
  },
  {
    id: 20,
    tag: 'Market Insights',
    title: "How to Identify High-Growth Areas in Lagos Before Prices Rise",
    excerpt: "The investors who capture the biggest Lagos returns are the ones who identify growth corridors before prices surge. Here are the 7 signals that precede a price breakout — with current examples.",
    date: 'March 14, 2026',
    readTime: '7 min read',
    img: '/images/blogpost-20.jpeg',
    gradient: 'linear-gradient(135deg,#1A6B4A,#78350F)',
    slug: 'how-to-identify-high-growth-areas-lagos',
    content: `<h2>Why Timing the Growth Curve Matters</h2>
<p>In Lagos real estate, the difference between good returns and exceptional returns is often timing within a growth corridor's lifecycle. Buy at the beginning of a growth wave — when infrastructure is announced but not yet complete, when developers are entering but not yet dominant, when prices reflect current conditions rather than future potential — and 5-year returns of 150–300% are achievable.</p>
<h2>Signal 1: Confirmed Infrastructure Investment with a Funded Route</h2>
<p>Not all infrastructure announcements are equal. A corridor becomes a genuine growth opportunity when a project moves from announcement to funded commitment — government budget line, contractor appointment, or visible construction commencement. Track project progress, not project announcements.</p>
<h2>Signal 2: Developer Land Acquisition Activity</h2>
<p>Institutional developers have research teams. When Mixta, Amen Estate, RevolutionPlus, or other credible developers begin acquiring large land parcels in a corridor, they are signalling that their research supports future residential demand.</p>
<h2>Signal 3: Improving Access Roads and Utilities</h2>
<p>Before a corridor is commercially developed, the infrastructure that enables development typically arrives first: road widening or resurfacing, electricity transformer upgrades, water mains extension, or telecoms infrastructure. A corridor where roads are being improved and utilities extended is a corridor being prepared for development.</p>
<h2>Signal 4: Rising Land Subdivision Activity</h2>
<p>When landowners begin subdividing large family or agricultural plots into residential-sized parcels, they are responding to inbound buyer interest. This activity precedes formal estate development. Visit target areas and speak to local land agents — they operate on the ground and know which families are selling, at what prices, and why.</p>
<h2>Signal 5: New Commercial Activity Along Access Routes</h2>
<p>Petrol stations, fast food outlets, pharmacy chains, and supermarkets are commercially disciplined businesses that open locations based on traffic counts and residential density projections. When these businesses begin appearing along a corridor's main access road, they are validating the growth thesis with their own capital.</p>
<h2>Signal 6: School and Hospital Development</h2>
<p>Private schools and clinics follow family formation — and family formation drives residential demand. When private primary schools or clinics open in a new corridor, they signal that middle-class families are moving in and infrastructure is reaching the threshold for family residential living.</p>
<h2>Signal 7: Price Differential vs Neighbouring Established Corridors</h2>
<p>Compare the land price in your target corridor to an adjacent, established corridor. If the gap is large — say, ₦3 million/plot in the target area vs ₦15 million/plot 10km closer to the city — and the signals above are present, the differential represents potential upside.</p>
<h2>Applying the Framework Now</h2>
<p>Using this framework in 2026: Epe and coastal Ogun State communities along the Lagos-Calabar Coastal Highway corridor show signals 1, 3, and 7 clearly. Mowe-Ofada shows signals 3, 5, and 7. Ibeju-Lekki has progressed through most signals and is now a maturing growth corridor rather than an early-stage opportunity — entry is still viable but requires more precision on specific sub-areas.</p>`,
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
