const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const heroImage = u("1507652313519-d4e9174996dd", 2000);
export const providerBandImage = u("1519823551278-64ac92734fb1", 2000);

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "cosmetic",
    name: "Cosmetic",
    blurb: "Injectables, facials, laser",
    image: u("1512290923902-8a9f81dc236c", 900),
  },
  {
    slug: "restorative",
    name: "Restorative",
    blurb: "Massage, recovery, bodywork",
    image: u("1600334129128-685c5582fd35", 900),
  },
  {
    slug: "preventative",
    name: "Preventative",
    blurb: "Wellness, yoga, nutrition",
    image: u("1545205597-3d9d02c29597", 900),
  },
  {
    slug: "diagnostic",
    name: "Diagnostic",
    blurb: "Screening, lab panels",
    image: u("1631217868264-e5b90bb7e133", 900),
  },
];

export type Clinic = {
  slug: string;
  name: string;
  city: string;
  category: string;
  rating: number | null;
  reviews: number;
  services: string[];
  image: string;
  gallery?: string[];
  address?: string;
  phone?: string;
  about?: string;
  lng: number;
  lat: number;
};

export const clinics: Clinic[] = [
  {
    slug: "great-lakes-wellness-ann-arbor",
    lng: -83.743,
    lat: 42.2808,
    name: "Great Lakes Wellness",
    city: "Ann Arbor",
    category: "Preventative",
    rating: 4.7,
    reviews: 31,
    services: ["IV Vitamin Therapy", "Wellness Blood Panel", "Weight Management"],
    image: u("1540555700478-4be289fbecef", 1200),
    gallery: [
      u("1560750588-73207b1ef5b8", 1600),
      u("1540555700478-4be289fbecef", 900),
      u("1515377905703-c4788e51af15", 900),
      u("1519824145371-296894a0daa9", 900),
      u("1507652313519-d4e9174996dd", 900),
    ],
    address: "210 S State St, Ann Arbor, MI 48104",
    phone: "(734) 555-0110",
    about:
      "A calm, clinician-led studio in downtown Ann Arbor focused on preventative care: infusions, lab work, and long-term wellness plans.",
  },
  {
    slug: "motor-city-medspa-birmingham",
    lng: -83.2113,
    lat: 42.5467,
    name: "Motor City MedSpa",
    city: "Birmingham",
    category: "Cosmetic",
    rating: 4.9,
    reviews: 54,
    services: ["Botox", "CoolSculpting", "Lip Filler"],
    image: u("1570172619644-dfd03ed5d881", 1200),
    address: "112 Willits St, Birmingham, MI 48009",
    phone: "(248) 555-0132",
    about:
      "Aesthetic medicine with a light touch. Board-certified injectors, honest consults, and results that look like you.",
  },
  {
    slug: "kimmie-e-esthetics",
    lng: -83.2455,
    lat: 42.5837,
    name: "Kimmie E. Esthetics",
    city: "Bloomfield Township",
    category: "Cosmetic",
    rating: 4.8,
    reviews: 22,
    services: ["Brow Shaping", "Dermaplaning", "Chemical Peels"],
    image: u("1616394584738-fc6e612e71b9", 1200),
    address: "4080 Telegraph Rd, Bloomfield Township, MI 48302",
    phone: "(248) 555-0177",
    about:
      "A single-esthetician studio known for meticulous brow work and skin care tailored to each visit.",
  },
  {
    slug: "soluna-wellness-studio",
    lng: -82.9199,
    lat: 42.587,
    name: "Soluna Wellness Studio",
    city: "Clinton Township",
    category: "Restorative",
    rating: 4.6,
    reviews: 18,
    services: ["Deep Tissue Massage", "Guided Meditation", "Cupping"],
    image: u("1591343395902-1adcb454c4e2", 1200),
    address: "40340 Garfield Rd, Clinton Township, MI 48038",
    phone: "(586) 555-0149",
    about:
      "Bodywork and mindfulness under one roof. Sessions built around recovery, not upsells.",
  },
  {
    slug: "lakeshore-aesthetics-detroit",
    lng: -83.0458,
    lat: 42.3314,
    name: "Lakeshore Aesthetics",
    city: "Detroit",
    category: "Cosmetic",
    rating: 4.5,
    reviews: 40,
    services: ["Microneedling", "HydraFacial", "Laser Hair Removal"],
    image: u("1560750588-73207b1ef5b8", 1200),
    address: "1420 Washington Blvd, Detroit, MI 48226",
    phone: "(313) 555-0186",
    about:
      "Downtown Detroit skin clinic pairing medical-grade devices with realistic, well-explained plans.",
  },
  {
    slug: "aqua-aesthetics-wellness",
    lng: -84.4839,
    lat: 42.737,
    name: "Aqua Aesthetics & Wellness",
    city: "East Lansing",
    category: "Restorative",
    rating: 4.7,
    reviews: 26,
    services: ["Hot Stone Massage", "Aromatherapy", "Lymphatic Drainage"],
    image: u("1544161515-4ab6ce6db874", 1200),
    address: "300 Grove St, East Lansing, MI 48823",
    phone: "(517) 555-0163",
    about:
      "A quiet massage-first practice near campus, with therapists who remember how you like the pressure.",
  },
];

export const cities = [
  { name: "Detroit", count: 4 },
  { name: "Ann Arbor", count: 3 },
  { name: "Birmingham", count: 2 },
  { name: "Grand Rapids", count: 2 },
  { name: "East Lansing", count: 2 },
  { name: "Bloomfield Township", count: 2 },
];

export const reviews = [
  {
    clinic: "great-lakes-wellness-ann-arbor",
    author: "Marisol V.",
    date: "Jul 2026",
    rating: 4,
    verified: true,
    text: "Clean space and a friendly team. They were running about fifteen minutes late, but someone told me while I was waiting.",
  },
  {
    clinic: "great-lakes-wellness-ann-arbor",
    author: "Deshawn R.",
    date: "Jun 2026",
    rating: 5,
    verified: true,
    text: "The blood panel review was the first time a clinician actually walked me through my numbers.",
  },
  {
    clinic: "great-lakes-wellness-ann-arbor",
    author: "Priya N.",
    date: "May 2026",
    rating: 5,
    verified: false,
    text: "Booked through CareTrove on a Tuesday, confirmed by the next morning. The infusion room is genuinely relaxing.",
  },
];
