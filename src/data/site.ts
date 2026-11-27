export const academy = {
  name: 'Netaji Defence Academy',
  tagline: 'Your Dream, Our Mission, One Nation',
  // Values are supplied only at build time after client confirmation.
  // Never put API keys or private credentials in VITE_* variables: browser code is public.
  whatsapp: import.meta.env.VITE_ACADEMY_WHATSAPP ?? '',
  phone: import.meta.env.VITE_ACADEMY_PHONE ?? '',
  secondaryPhone: import.meta.env.VITE_ACADEMY_SECONDARY_PHONE ?? '',
  email: import.meta.env.VITE_ACADEMY_EMAIL ?? '',
  address: import.meta.env.VITE_ACADEMY_ADDRESS ?? '',
  mapUrl: import.meta.env.VITE_ACADEMY_MAP_URL ?? '',
  mapEmbedUrl: import.meta.env.VITE_ACADEMY_MAP_EMBED_URL ?? '',
};

export const pages = [
  {
    path: '/',
    label: 'Home',
    title: 'Your next chapter. In uniform.',
    description:
      'Explore NDA, Army, Navy, Air Force and police preparation at Netaji Defence Academy.',
  },
  {
    path: '/about',
    label: 'About Us',
    title: 'A purpose worth preparing for.',
    description: 'Our mission, values and approach to defence preparation.',
  },
  {
    path: '/courses',
    label: 'Our Courses',
    title: 'Find your path to service.',
    description: 'Explore defence and police preparation pathways.',
  },
  {
    path: '/courses-poster',
    label: 'Courses Poster',
    title: 'Courses and recruitment pathways.',
    description: 'A complete course guide by qualification and age category.',
  },
  {
    path: '/courses/others',
    label: 'Other Courses',
    title: 'More paths. One ambition.',
    description: 'Additional course information from Netaji Defence Academy.',
  },
  {
    path: '/training',
    label: 'Training & Facilities',
    title: 'Build strength. Develop discipline.',
    description:
      'Explore running, rope climbing, pull-ups, agility, cross country and classroom preparation.',
  },
  {
    path: '/achievements',
    label: 'Achievements',
    title: 'Progress with purpose.',
    description: 'Verified academy achievements and student success information.',
  },
  {
    path: '/gallery',
    label: 'Gallery',
    title: 'A closer look at the academy.',
    description: 'Browse academy reference images and training photographs.',
  },
  {
    path: '/hostel',
    label: 'Hostel & Food',
    title: 'Make room for your ambition.',
    description: 'Accommodation and food information for prospective students.',
  },
  {
    path: '/notifications',
    label: 'Notifications',
    title: 'Stay ready for your opportunity.',
    description:
      'Verified defence and police recruitment updates with official source links.',
  },
  {
    path: '/registration',
    label: 'Student Registration',
    title: 'Your first step starts here.',
    description:
      'Prepare your admission enquiry and review it before sending through WhatsApp.',
  },
  {
    path: '/contact',
    label: 'Contact Us',
    title: 'Let’s talk about your future.',
    description: 'Contact and location information for Netaji Defence Academy.',
  },
];

export const courses = [
  {
    id: 'nda',
    name: 'NDA Training',
    short: 'NDA',
    number: '01',
    icon: 'shield',
    description:
      'Prepare for the written examination and explore the SSB selection process for the National Defence Academy.',
    subjects: 'Mathematics · General Ability · SSB awareness',
    ageCriteria:
      'NDA/NA age is batch-specific. For NDA II 2026, the official DOB window is 01 January 2008 to 01 January 2011.',
  },
  {
    id: 'navy',
    name: 'Indian Navy',
    short: 'Indian Navy',
    number: '02',
    icon: 'anchor',
    description:
      'Explore naval recruitment pathways and prepare for the academic and physical requirements of the relevant entry.',
    subjects: 'Science · Mathematics · Physical readiness',
    ageCriteria:
      'Agniveer Navy SSR/MR: commonly 17½–21 years; NDA/other Navy entries use the age window in the relevant batch notice.',
  },
  {
    id: 'air-force',
    name: 'Indian Air Force',
    short: 'Indian Air Force',
    number: '03',
    icon: 'plane',
    description:
      'Work towards air force recruitment with focused academic preparation and physical readiness.',
    subjects: 'English · Reasoning · Science fundamentals',
    ageCriteria:
      'Agniveer Vayu: commonly 17½–21 years; the exact DOB window is fixed by each intake notification.',
  },
  {
    id: 'army',
    name: 'Indian Army',
    short: 'Indian Army',
    number: '04',
    icon: 'flag',
    description:
      'Build the academic foundations and physical discipline needed to pursue army recruitment pathways.',
    subjects: 'General knowledge · Reasoning · Fitness',
    ageCriteria:
      'Agniveer Army: commonly 17½–21 years; other Army entries use the age window in the relevant batch notice.',
  },
  {
    id: 'police',
    name: 'Police Constable',
    short: 'Police Constable',
    number: '05',
    icon: 'badge',
    description:
      'Explore police and paramilitary preparation, including State Police — Andhra Pradesh (AP) and Telangana (TG).',
    subjects: 'General studies · Arithmetic · Physical preparation',
    ageCriteria:
      'Varies by State Police notification. Confirm the official state recruitment notice before applying.',
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable',
    short: 'SSC GD',
    number: '06',
    icon: 'badge',
    description:
      'Prepare for SSC Constable (GD) recruitment in CAPFs, NIA, SSF and Rifleman (GD) in Assam Rifles.',
    subjects: 'General knowledge · Reasoning · Mathematics · English/Hindi · Fitness',
    ageCriteria:
      '18–23 years for SSC GD 2026, measured on 1 January 2026. Category relaxations may apply.',
  },
  {
    id: 'others',
    name: 'Other Courses',
    short: 'Others',
    number: '07',
    icon: 'compass',
    description:
      'Looking for another pathway? Additional course offerings will be listed after academy confirmation.',
    subjects: 'Course details awaiting confirmation',
    ageCriteria: 'Depends on the official notification for the selected pathway.',
  },
];

export const facilities = [
  {
    name: 'Running Track',
    description: 'Endurance, pacing and a consistent running routine.',
  },
  { name: 'Rope Climbing', description: 'Grip, coordination and upper-body strength.' },
  { name: 'Pull-Ups', description: 'Progressive strength and controlled movement.' },
  { name: 'Zigzag Running', description: 'Agility, balance and changes of direction.' },
  {
    name: 'Cross Country',
    description:
      'Outdoor endurance, games and self-defence practice for all-round readiness.',
  },
  {
    name: 'Classroom',
    description:
      'Technical and non-technical course teaching with focused examination preparation.',
  },
];

export const galleryImages = [
  {
    src: '/images/optimized/1000667288.webp',
    title: 'Classroom reference — other academy branding',
    category: 'Classrooms',
    alt: 'Students in a classroom with Indian Defence Academy branding; supplied reference only',
  },
  {
    src: '/images/originals/NDA3.jpeg',
    title: 'Netaji Defence Academy — building exterior',
    category: 'Campus',
    alt: 'Building exterior with a Netaji Defence Academy sign above the entrance',
  },
];
