export const site = {
  name: "Central Island Home",
  domain: "https://centralislandhome.com",
  bookingUrl: "https://jtaylormade.guestybookings.com/en",
  guestySiteUrl: "jtaylormade.guestybookings.com",
  email: "thejonathontaylor@gmail.com",
};

export const photos = [
  { id: "living-overview", source: "photos/hero-1-exterior.jpg", alt: "Open-plan living room with seating, television, and bar", caption: "Room to gather, settle in, and stay awhile." },
  { id: "bright-bedroom", source: "photos/hero-2-bedroom-king.jpg", alt: "Bright bedroom with a large bed and glass doors", caption: "A bright sleeping space opening toward the garden." },
  { id: "kitchen-living", source: "photos/hero-3-living.jpg", alt: "Open kitchen and living area with island seating", caption: "The kitchen and living room share one easy, social space." },
  { id: "bar-tv", source: "photos/hero-4-kitchen.jpg", alt: "Interior bar seating with a wall-mounted television", caption: "An indoor bar for unhurried evenings at home." },
  { id: "bar-patio", source: "photos/hero-5-backyard.jpg", alt: "Interior bar beside glass patio doors", caption: "Inside comfort with a glimpse toward the patio." },
  { id: "two-beds", source: "photos/bedroom-2-singles.jpg", alt: "Bedroom furnished with two separate beds", caption: "A flexible bedroom with two separate beds." },
  { id: "large-bed", source: "photos/bedroom-3-queen.jpg", alt: "Bedroom furnished with a large bed", caption: "A calm room anchored by a generous bed." },
  { id: "backyard-wide", source: "photos/album/album-22.jpg", alt: "Wide back lawn with mature trees behind the house", caption: "A generous back lawn beneath mature trees." },
  { id: "rear-deck", source: "photos/album/album-25.jpg", alt: "Rear deck with wooden chairs beside the house under a blue sky", caption: "Morning coffee on the back deck." },
  { id: "fire-pit", source: "photos/album/album-04.jpg", alt: "Stone fire pit on a paver patio behind the house at golden hour", caption: "Evenings gather around the fire pit." },
  { id: "patio-dining", source: "photos/album/album-19.jpg", alt: "High-top patio table for four under a shade sail with string lights", caption: "Dinner outside, under sail and string lights." },
  { id: "grill-patio", source: "photos/album/album-17.jpg", alt: "Covered patio with a gas grill and wall-mounted television", caption: "A covered grill patio for slow afternoons." },
  { id: "outdoor-shower", source: "photos/album/album-23.jpg", alt: "Outdoor shower enclosure with benches and shelves", caption: "Rinse off the beach in the outdoor shower." },
  { id: "breakfast-bar", source: "photos/album/album-02.jpg", alt: "Kitchen breakfast bar with seating for four", caption: "Four seats at the breakfast bar." },
  { id: "kitchen-range", source: "photos/album/album-13.jpg", alt: "Kitchen with stainless range, microwave, and refrigerator", caption: "A full kitchen, ready for real cooking." },
  { id: "kitchen-coffee", source: "photos/album/album-39.jpg", alt: "Kitchen sink wall with coffee station and hanging pot rack", caption: "The coffee station holds down the sink wall." },
  { id: "dining-room", source: "photos/album/album-28.jpg", alt: "Dining room with an oval wood table seating six", caption: "A dining table with room for six." },
  { id: "bath-aqua", source: "photos/album/album-20.jpg", alt: "Bathroom with tub shower, vanity, and sea turtle art", caption: "A bright aqua bath with tub and shower." },
  { id: "bath-yellow", source: "photos/album/album-14.jpg", alt: "Bathroom with pedestal sink, beadboard walls, and coastal shelves", caption: "The sunny hall bath keeps it simple." },
];

// Decorative sea textures generated with the OpenAI Images API — never
// presented as the property. See /guide/ for the pipeline.
export const generated = [
  { id: "seafloor-sand", source: "src/generated/seafloor-sand.png" },
  { id: "sea-horizon", source: "src/generated/sea-horizon.png" },
  { id: "lagoon-aerial", source: "src/generated/lagoon-aerial.png" },
];

export const pages = {
  home: {
    path: "/",
    title: "Central Island Home | A relaxed coastal stay",
    description: "Explore Central Island Home through real property photography and check current availability through Guesty.",
    eyebrow: "A coastal state of mind",
    heading: "Come home to the slower side of the coast.",
    intro: "An easygoing place to gather, recharge, and make the most of time together—presented through the real rooms that shape the stay.",
  },
  stay: {
    path: "/stay/",
    title: "Inside the stay | Central Island Home",
    description: "Step inside the photographed living spaces and bedrooms at Central Island Home.",
    eyebrow: "Inside the home",
    heading: "Spaces that make room for everyone.",
    intro: "Move from shared mornings in the kitchen to quiet rooms at the end of the day. Every image on this page is from the property.",
  },
  gallery: {
    path: "/gallery/",
    title: "Gallery | Central Island Home",
    description: "Browse real photographs of Central Island Home in a wind-touched coastal gallery.",
    eyebrow: "The photo line",
    heading: "A closer look, carried on the breeze.",
    intro: "Swipe, drag, or use the arrow keys to move along the line. Each photograph shows a real space inside the home.",
  },
  location: {
    path: "/location/",
    title: "Plan your stay | Central Island Home",
    description: "Plan a Charleston-area stay while preserving the privacy of the exact property location.",
    eyebrow: "Plan the days",
    heading: "Start with Charleston. Let the rest unfold.",
    intro: "Use this page as a gentle starting point for a Charleston-area visit. Exact arrival details are shared through the confirmed booking journey.",
  },
  faq: {
    path: "/faq/",
    title: "Booking questions | Central Island Home",
    description: "Find verified booking guidance and continue to Guesty for current availability, pricing, and policies.",
    eyebrow: "Before you book",
    heading: "A few useful answers before the coast calls.",
    intro: "Availability, pricing, and reservation-specific terms can change. Guesty remains the source of truth throughout booking.",
  },
  guide: {
    path: "/guide/",
    title: "How this site was built | Central Island Home",
    description: "A maker's guide to the Clearwater design: a transparent WebGL ocean, AI-generated sea textures, and a Guesty calendar beneath the surface.",
    eyebrow: "The maker's guide",
    heading: "How the water got into the website.",
    intro: "Everything on this site — the transparent turquoise sea, the glass calendar, the type, the textures — was designed and built by Claude (Fable 5). Here is exactly how, so you can do it too.",
  },
  contact: {
    path: "/contact/",
    title: "Contact Us | Central Island Home",
    description: "Get in touch with us directly regarding your stay at Central Island Home.",
    eyebrow: "Get in Touch",
    heading: "Questions about your upcoming trip?",
    intro: "Send a direct message below. Submissions are saved to our direct reservations database.",
  },
};
