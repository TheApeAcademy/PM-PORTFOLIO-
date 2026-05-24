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
  caseStudyUrl?: string
  showInGrid?: boolean
}

export const projects: Project[] = [
  {
    id: 'apeacademy',
    name: 'ApeAcademy',
    tagline: 'A SaaS platform connecting students with real assignments — with real payments.',
    status: 'Live',
    showInGrid: true,
    iconGradient: 'linear-gradient(135deg, #0A1628 0%, #1A3050 100%)',
    iconLabel: '🦍',
    iconColor: '#0071E3',
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
    caseStudyUrl: 'https://apeacademy.vercel.app',
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
  {
    id: 'daye',
    name: 'Daye',
    tagline: 'An AI music intelligence layer for Spotify. Conversational. Context-aware. Alive.',
    status: 'Concept',
    showInGrid: true,
    iconGradient: 'linear-gradient(135deg, #041208 0%, #0A2214 100%)',
    iconLabel: '♫',
    iconColor: '#1DB954',
    problem:
      'Spotify\'s interaction model hasn\'t changed since 2006: search, press play, shuffle. 31% of users report "playlist paralysis". Static playlists degrade. The platform knows nothing about why you\'re listening — a late-night Lagos rooftop and a 6am gym session get identical treatment. TikTok, Apple, and AI-native startups are building toward conversational music. Spotify\'s window is now.',
    solution:
      'Daye is an AI-native conversational layer built on top of Spotify\'s existing infrastructure. Users speak or type naturally — "give me late-night Lagos rooftop energy, start mellow, build slowly" — and Daye interprets emotional intent, curates an adaptive session, and manages transitions like a professional DJ. Real-time queue re-evaluation every 2 tracks. Harmonic mixing. BPM arc management. Voice + text modes. AI DJ personality with contextual commentary. Producer Mode for creators.',
    role: 'PM (Unsolicited Pitch)',
    keyDecisions: [
      'Layer on Spotify\'s existing infra, not a standalone app — zero switching cost, leverages Audio Features API already in production',
      'Real-time adaptive queue (re-evaluates every 2 tracks) vs. static playlists — keeps sessions emotionally coherent, not just novel',
      'Dual interaction modes: voice for gym/commute, text for quiet contexts — maximises addressable session types',
      'Free tier gets 2 Daye sessions/day (text-only) — creates habit loop and drives Premium conversion without cannibalising ad revenue',
    ],
    stack: ['Spotify Audio Features API', 'NLP / LLM', 'Harmonic Mixing Algorithms', 'AI Voice Model', 'Adaptive Queue Engine'],
    metrics: [
      { label: 'Session duration', value: '+18%' },
      { label: 'Skip rate target', value: '<8%' },
      { label: 'Premium conversion', value: '+12%' },
      { label: 'Daye NPS target', value: '65+' },
    ],
    timeline: 'Concept pitch — 2025',
    caseStudyUrl: '/daye-case-study.html',
  },
  {
    id: 'padi',
    name: 'Padi',
    tagline: 'An AI companion platform with season-based content drops and voice call UI.',
    status: 'Live',
    iconGradient: 'linear-gradient(135deg, #0D0A1A 0%, #1A1030 100%)',
    iconLabel: 'P',
    iconColor: '#7C3AED',
    problem:
      'Digital entertainment lacks genuine emotional intimacy. Users consume content passively — there is no reciprocity, no memory, no relationship that builds over time. Social media creates the illusion of connection without the substance.',
    solution:
      'Padi is an AI companion platform where users do not just scroll — they interact, respond, and build a relationship across episodes. Season-based narrative drops create appointment behaviour. A voice call UI lowers the barrier to emotional engagement. Bold dark editorial design keeps users coming back episode to episode.',
    role: 'Product Designer + Frontend Developer',
    keyDecisions: [
      'Season-based drops create appointment viewing behaviour — drives return visits and measurable retention vs. always-on content',
      'Voice call UI lowers the intimacy barrier vs. text-only interactions — increases emotional attachment metrics',
      'Dark editorial design targets entertainment-native audiences, not productivity users',
      'AI personality persistence across sessions builds genuine attachment — users know their companion remembers them',
    ],
    stack: ['React', 'Framer Motion', 'AI Platform', 'Voice UI', 'Tailwind'],
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Content model', value: 'Season drops' },
      { label: 'Interaction', value: 'Voice + Text' },
      { label: 'Category', value: 'AI Entertainment' },
    ],
    timeline: '2024 – Present',
  },
  {
    id: 'malaak',
    name: 'Malaak',
    tagline: 'Minimal editorial fashion for Snapchat-native modest luxury buyers.',
    status: 'Live',
    iconGradient: 'linear-gradient(135deg, #1A1008 0%, #2D2010 100%)',
    iconLabel: 'M',
    iconColor: '#C9A227',
    problem:
      'Modest fashion brands in MENA operate primarily on Snapchat and WhatsApp, but lack a digital presence that matches their luxury positioning. Standard e-commerce templates strip the brand of its premium identity — and lose customers at checkout.',
    solution:
      'A minimal editorial fashion site with a split-hero layout, hover-reveal product grid, and a seamless WhatsApp order flow. Designed specifically for Snapchat-native buyers: mobile-first, frictionless, and brand-coherent from first scroll to order confirmation.',
    role: 'Product Designer + Frontend Developer',
    keyDecisions: [
      'WhatsApp order flow eliminates cart-abandonment friction — no checkout form, no payment gateway anxiety for the target market',
      'Split-hero layout signals editorial luxury — differentiates from generic Shopify templates',
      'Mobile-first build reflects the target audience\'s device distribution (94%+ mobile usage)',
      'Hover-reveal product grid turns discovery into interaction, increasing session time and purchase intent',
    ],
    stack: ['React', 'Tailwind', 'Framer Motion', 'WhatsApp API'],
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Target market', value: 'MENA' },
      { label: 'Order flow', value: 'WhatsApp native' },
      { label: 'Device split', value: 'Mobile-first' },
    ],
    timeline: '2024',
  },
  {
    id: 'aaura',
    name: 'Aaura',
    tagline: 'An animated luxury perfumery. Gold particle canvas. Arabesque type. WhatsApp ordering.',
    status: 'Live',
    iconGradient: 'linear-gradient(135deg, #0A0800 0%, #1A1200 100%)',
    iconLabel: 'A',
    iconColor: '#D4A017',
    problem:
      'Luxury fragrance brands carry rich heritage and strong visual identity, but their digital experiences feel generic. Standard e-commerce templates strip the sensory journey that makes luxury perfumery worth its price — and worth its story.',
    solution:
      'A bespoke immersive experience with an animated gold particle canvas, arabesque typography, and WhatsApp-native ordering. Every interaction communicates luxury: the product does not just look expensive, it feels expensive. The brand\'s cultural identity is built into every pixel.',
    role: 'Product Designer + Frontend Developer',
    keyDecisions: [
      'Canvas-based gold particle field delivers sensory richness that photography alone cannot — creates a signature digital experience',
      'Arabic-influenced typography aligns with brand heritage and target market identity, not generic sans-serif defaults',
      'WhatsApp ordering maintains the personal, high-touch feel of luxury buying — no impersonal checkout flow',
      'Custom UI per product family — each fragrance line has its own visual language, not a template',
    ],
    stack: ['React', 'Canvas API', 'Tailwind', 'WhatsApp API', 'Framer Motion'],
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Visual FX', value: 'Gold particle canvas' },
      { label: 'Order flow', value: 'WhatsApp' },
      { label: 'Category', value: 'Luxury brand' },
    ],
    timeline: '2024',
  },
]
