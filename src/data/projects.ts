export interface Project {
  id: string
  name: string
  tagline: string
  status: 'Live' | 'Concept' | 'In Progress'
  iconGradient: string
  iconLabel: string
  iconColor: string
  problem: string
  solution: string
  role: string
  keyDecisions: string[]
  stack: string[]
  metrics: { label: string; value: string }[]
  timeline: string
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: 'apeacademy',
    name: 'ApeAcademy',
    tagline: 'A SaaS platform connecting students with real assignments — with real payments.',
    status: 'Live',
    iconGradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
    iconLabel: '🦍',
    iconColor: '#2D7A4F',
    problem:
      'Students in African universities struggle to gain practical experience. Companies need quality work done cheaply. The gap between education and employability is wide — and growing.',
    solution:
      'ApeAcademy is a marketplace where companies post real assignments and students earn by completing them. Built with full payment processing via Flutterwave, real-time notifications, and a review system. I was the product manager, frontend developer, and first user.',
    role: 'PM + Frontend (Solo)',
    keyDecisions: [
      'Chose Supabase over Firebase for row-level security and SQL flexibility at scale',
      'Integrated Flutterwave instead of Stripe — 40% lower fees for African markets',
      'Delayed mobile app to validate web first — saved 3 months of engineering time',
      'Built assignment review system before marketing to ensure quality on both sides',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Flutterwave', 'Tailwind', 'Vite', 'PostgreSQL'],
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Payment Integration', value: 'Flutterwave' },
      { label: 'Built in', value: '4 months' },
      { label: 'Team size', value: 'Solo' },
    ],
    timeline: 'Jan 2025 – Present',
    liveUrl: 'https://apeacademy.vercel.app',
  },
  {
    id: 'jobhunter',
    name: 'Job Finder',
    tagline: 'Hyper-local job discovery for graduates in African cities.',
    status: 'Concept',
    iconGradient: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
    iconLabel: '🔍',
    iconColor: '#0071E3',
    problem:
      'Graduates in Lagos, Nairobi, and Cape Town apply to hundreds of jobs on LinkedIn and hear nothing. The signal-to-noise ratio is broken. Hiring managers are buried. There is no product built for the African graduate job market specifically.',
    solution:
      'A location-aware job board that surfaces only hyper-relevant opportunities based on skills, proximity, and industry — with a one-tap "Express Apply" that pre-fills from a candidate profile. Employers pay per verified application, not per posting.',
    role: 'PM (Concept + Pitch)',
    keyDecisions: [
      'Verified application model removes spam — employers only see serious candidates',
      'Location-first UX reduces cognitive load vs. traditional keyword search',
      'Mobile-first — 78% of African internet users are mobile-only',
      'Candidate profiles are skills-based, not CV-based, to reduce bias',
    ],
    stack: ['React Native', 'Supabase', 'Node.js', 'PostgreSQL', 'Flutterwave'],
    metrics: [
      { label: 'Status', value: 'Concept' },
      { label: 'Target market', value: 'Africa' },
      { label: 'Model', value: 'Pay-per-verified-apply' },
      { label: 'Stage', value: 'Pitch ready' },
    ],
    timeline: 'Concept — 2025',
  },
  {
    id: 'rbagency',
    name: 'RB Studio',
    tagline: 'A boutique creative-tech agency for founders who ship.',
    status: 'In Progress',
    iconGradient: 'linear-gradient(135deg, #1A0A00 0%, #2D1500 100%)',
    iconLabel: 'RB',
    iconColor: '#D4A017',
    problem:
      'Early-stage founders need design and development but can\'t afford agencies and don\'t trust freelancers. The gap between "idea" and "live product" costs them time and momentum.',
    solution:
      'RB Studio offers fixed-scope, fixed-price product sprints — landing pages, MVPs, and design systems — delivered in 2-week cycles. No retainers. No scope creep. Just a product in your hands.',
    role: 'Founder + PM',
    keyDecisions: [
      'Fixed-scope model eliminates client anxiety about budget overruns',
      '2-week sprint cadence forces prioritisation on both sides',
      'No logo design — product-focused only, higher value per hour',
      'Targeting founders in Cape Town as initial market before going remote',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'Framer', 'Figma', 'Supabase'],
    metrics: [
      { label: 'Status', value: 'In Progress' },
      { label: 'Model', value: 'Fixed-scope sprints' },
      { label: 'Sprint length', value: '2 weeks' },
      { label: 'Target', value: 'Cape Town founders' },
    ],
    timeline: '2025 – Present',
  },
]
