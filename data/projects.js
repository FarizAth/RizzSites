/* RizzSites — Portfolio project data
   Single source of truth for the Work page and the reusable project template. */

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hvac', label: 'HVAC' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'construction', label: 'Construction & Contracting' },
  { id: 'auto', label: 'Auto' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'organizing', label: 'Professional Organizing' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'spec', label: 'Spec Work' },
];

export const CATEGORY_LABELS = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c.label;
  return acc;
}, {});

/**
 * previewMode: 'iframe' — attempt a live embedded preview, falling back gracefully
 * industry: shown as a small sub-label, useful for spec work where category is 'spec'
 */
export const PROJECTS = [
  // ---------------- HVAC ----------------
  {
    slug: 'cole-hvac',
    name: 'Cole HVAC',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/Cole-HVAC-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A heating and cooling contractor site built around fast quote requests and clear service areas.',
    tags: ['Local Service', 'Booking'],
  },
  {
    slug: 'juniors-heating-services',
    name: "Junior's Heating Services",
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/Junior-s-Heating-Services-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A family-run heating company site that leads with trust: licensing, response time, and reviews.',
    tags: ['Local Service', 'Trust Signals'],
  },
  {
    slug: 'stay-cool-nyc',
    name: 'Stay Cool NYC',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/staycoolnyc-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A city-focused AC repair site built for urgency, with same-day service front and center.',
    tags: ['Local Service', 'Urgency'],
  },
  {
    slug: 'ajm-hvac',
    name: 'A.J.M. HVAC',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/A.J.M.HVAC-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A straightforward HVAC business site organized around residential and commercial service lines.',
    tags: ['Local Service', 'Commercial'],
  },
  {
    slug: 'vortex-air',
    name: 'Vortex Air Heating Cooling Plumbing',
    category: 'hvac',
    industry: 'HVAC & Plumbing',
    url: 'https://farizath.github.io/VORTEX-AIR-Heating-Cooling-Pumbling-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A multi-trade home services site covering heating, cooling, and plumbing under one brand.',
    tags: ['Multi-Service', 'Local Service'],
  },
  {
    slug: 'prime-hvac-brooklyn',
    name: 'Prime HVAC Brooklyn',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/Prime-HVAC-Brooklyn-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A borough-specific HVAC site designed to rank and convert for Brooklyn service searches.',
    tags: ['Local Service', 'SEO Foundation'],
  },
  {
    slug: 'at-your-service-hvac',
    name: 'At Your Service HVAC',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/AtYourServiceHVAC-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A dependable, no-friction service site built to make calling or booking the obvious next step.',
    tags: ['Local Service', 'Booking'],
  },
  {
    slug: 'brooklyn-hvac-services',
    name: 'Brooklyn HVAC Services',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/Brooklyn-HVAC-Services-demo/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A clean, service-first site laying out installs, repairs, and maintenance plans clearly.',
    tags: ['Local Service', 'Service Plans'],
  },
  {
    slug: 'leach-hvac',
    name: 'Leach HVAC',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://leach-hvac-by-farizath.lovable.app',
    specWork: false,
    previewMode: 'iframe',
    description: 'A modern HVAC brand site with a confident hero and a simple path to requesting service.',
    tags: ['Local Service', 'Modern Brand'],
  },
  {
    slug: 'carvajal-hvac-construction',
    name: 'Carvajal HVAC Construction LLC',
    category: 'hvac',
    industry: 'HVAC & Construction',
    url: 'https://farizath.github.io/Carvajal-HVAC-Construction-LLC/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A combined HVAC and construction site built for a contractor who covers both trades.',
    tags: ['Multi-Service', 'Construction'],
  },
  {
    slug: 'force-service',
    name: 'Force Service',
    category: 'hvac',
    industry: 'HVAC',
    url: 'https://farizath.github.io/Force-Service/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A no-nonsense service company site focused on getting a technician booked quickly.',
    tags: ['Local Service', 'Booking'],
  },

  // ---------------- PLUMBING ----------------
  {
    slug: 'virgils-plumbing',
    name: "Virgil's Plumbing LLC",
    category: 'plumbing',
    industry: 'Plumbing',
    url: 'https://farizath.github.io/Virgil-s-Plumbing-LLC/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A plumbing contractor site built around emergency calls and clear pricing expectations.',
    tags: ['Local Service', 'Emergency Service'],
  },

  // ---------------- CONSTRUCTION & CONTRACTING ----------------
  {
    slug: 'forge-frame-contracting',
    name: 'Forge Frame Contracting',
    category: 'construction',
    industry: 'Construction',
    url: 'https://farizath.github.io/Forge-Frame-Contracting/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A framing and general contracting site built to showcase project scope and past work.',
    tags: ['Contracting', 'Project Showcase'],
  },
  {
    slug: 'harris-hangers',
    name: 'Harris Hangers',
    category: 'construction',
    industry: 'Construction',
    url: 'https://farizath.github.io/Harris-Hangers/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A specialty contracting site with a straightforward layout built around inquiries.',
    tags: ['Contracting', 'Specialty Trade'],
  },

  // ---------------- AUTO ----------------
  {
    slug: 'premium-auto-detailing',
    name: 'Premium Auto Detailing',
    category: 'auto',
    industry: 'Auto Detailing',
    url: 'https://premium-autodetailing-by-farizath.lovable.app',
    specWork: false,
    previewMode: 'iframe',
    description: 'A detailing brand site built to look as sharp as the cars it sells the service on.',
    tags: ['Local Service', 'Booking'],
  },

  // ---------------- FITNESS ----------------
  {
    slug: 'boxfit',
    name: 'BoxFit',
    category: 'fitness',
    industry: 'Fitness',
    url: 'https://boxfit-delenparsley-by-farizath.lovable.app',
    specWork: false,
    previewMode: 'iframe',
    description: 'A boxing and fitness studio site built for energy, with class schedules and membership front and center.',
    tags: ['Studio', 'Membership'],
  },

  // ---------------- PROFESSIONAL ORGANIZING ----------------
  {
    slug: 'nest-with-abi',
    name: 'Nest with Abi',
    category: 'organizing',
    industry: 'Professional Organizing',
    url: 'https://nest-with-abi-by-farizath.lovable.app',
    specWork: false,
    previewMode: 'iframe',
    description: 'A calm, personal brand site for a professional organizer, built to feel like her own style.',
    tags: ['Personal Brand', 'Booking'],
  },
  {
    slug: 'tidy-af',
    name: 'Tidy AF',
    category: 'organizing',
    industry: 'Professional Organizing',
    url: 'https://farizath.github.io/Tidy-AF/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A bold, personality-forward organizing brand site that stands out from the category norm.',
    tags: ['Personal Brand', 'Bold Identity'],
  },

  // ---------------- RESTAURANT ----------------
  {
    slug: 'umibozu',
    name: 'Umibozu',
    category: 'restaurant',
    industry: 'Restaurant',
    url: 'https://farizath.github.io/Umibozu/',
    specWork: false,
    previewMode: 'iframe',
    description: 'A restaurant site built around atmosphere, menu, and making a reservation simple.',
    tags: ['Hospitality', 'Menu & Reservations'],
  },

  // ---------------- SPEC WORK ----------------
  {
    slug: 'clearpath-junk-removal',
    name: 'ClearPath Junk Removal',
    category: 'spec',
    industry: 'Junk Removal',
    url: 'https://farizath.github.io/ClearPath-Junk-Removal/',
    specWork: true,
    previewMode: 'iframe',
    description: 'Spec concept for a junk removal brand: fast quotes, clear pricing logic, and same-day pickup.',
    tags: ['Spec Work', 'Local Service'],
  },
  {
    slug: 'great-plains-landscape-co',
    name: 'Great Plains Landscape Co.',
    category: 'spec',
    industry: 'Landscaping',
    url: 'https://farizath.github.io/Great-Plains-Landscaping-Co/',
    specWork: true,
    previewMode: 'iframe',
    description: 'Spec concept for a landscaping company built around seasonal services and real project photos.',
    tags: ['Spec Work', 'Local Service'],
  },
  {
    slug: 'velora-specwork',
    name: 'Velora',
    category: 'spec',
    industry: 'Concept Brand',
    url: 'https://farizath.github.io/Velora-specwork/',
    specWork: true,
    previewMode: 'iframe',
    description: 'An original concept brand exploring a more editorial, fashion-adjacent site direction.',
    tags: ['Spec Work', 'Concept Brand'],
  },
  {
    slug: 'aurelius-atelier',
    name: 'Aurelius Atelier',
    category: 'spec',
    industry: 'Concept Brand',
    url: 'https://farizath.github.io/Aurelius-Atelier/',
    specWork: true,
    previewMode: 'iframe',
    description: 'An original concept brand for a studio atelier, built to explore a quieter, gallery-like layout.',
    tags: ['Spec Work', 'Concept Brand'],
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProjects(project, count = 3) {
  const sameCategory = PROJECTS.filter(
    (p) => p.slug !== project.slug && p.category === project.category
  );
  const rest = PROJECTS.filter(
    (p) => p.slug !== project.slug && p.category !== project.category
  );
  return [...sameCategory, ...rest].slice(0, count);
}
