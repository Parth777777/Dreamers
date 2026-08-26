export const site = {
  name: "Dreamers",
  legalName: "Dreamers Studio",
  tagline: "Growth marketing for ambitious brands.",
  description:
    "Dreamers is a growth marketing partner for ambitious brands — combining creative thinking, content, strategy and performance to turn attention into measurable growth.",
  url: "https://www.example.com",
  email: "contact@dreamerscreativestudios.com",
  formspreeId: "",
  locationLabel: "PNQ, IND",
  logoOutline: "/logo-recent.svg",
  logoSolid: "/logo-recent.svg",
  keywords: [
    "content production",
    "performance marketing",
    "website design",
    "branding",
    "influencer marketing",
    "social media management",
    "creative direction",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/content-library" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
  ],
} as const;

export const hero = {
  lines: ["every idea starts with a", '"what if?"'],
  aside:
    "Dreamers is a growth marketing partner for ambitious brands — combining creative thinking, content, strategy and performance to turn attention into measurable growth.",
  scroll: "Work",
} as const;

export const aboutIntro = {
  lines: [
    "Dreamers is a growth marketing partner for ambitious brands",
    "combining creative thinking, content, strategy and performance",
    "to turn attention into measurable growth.",
  ],
} as const;

export const clientTrust = {
  label: "Trusted by 60+ Organizations",
} as const;

export const journeys = [
  {
    id: "step-1",
    kicker: "01",
    title: "Understanding your brand",
    body: "We dive deep into your brand's core values, target audience, and market positioning.",
  },
  {
    id: "step-2",
    kicker: "02",
    title: "Build the story",
    body: "Crafting a compelling narrative that resonates with your audience and stands out.",
  },
  {
    id: "step-3",
    kicker: "03",
    title: "Chase the insight",
    body: "Finding the hidden truths and data points that drive real engagement and growth.",
  },
  {
    id: "step-4",
    kicker: "04",
    title: "Shape the strategy",
    body: "Developing a clear, actionable plan to turn your insights into measurable results.",
  },
  {
    id: "step-5",
    kicker: "05",
    title: "Bring the idea to life",
    body: "Executing the strategy flawlessly across all touchpoints, from design to production.",
  },
] as const;

export const services = [
  {
    id: "01",
    title: "Content Production",
    body: "Good ideas deserve good execution. We turn concepts into photographs, films and videos that people actually want to watch. From the first frame to the final cut, we bring the idea to life without losing what made it interesting in the first place.",
  },
  {
    id: "02",
    title: "Performance Marketing",
    body: "Being good isn't much use if nobody can find you. We believe great marketing should do more than just gain attention; it should get results. From paid ads, SEO, GEO, AEO and data-led optimisation, we build strategies that help your brand get found, grow and stay relevant.",
  },
  {
    id: "03",
    title: "Website Design",
    body: "Your website has a job. It should tell people who you are, make the right impression and make it easy to take the next step. We create digital experiences that look good, work hard and give your brand somewhere worth landing.",
  },
  {
    id: "04",
    title: "Branding",
    body: "Before people understand what you do, they notice how you make them feel. We build identities that give good ideas a shape: from strategy and visual identity to the details that make a brand recognisable.",
  },
  {
    id: "05",
    title: "Influencer Marketing",
    body: "The right person can make a brand feel less like a brand. We find creators who make sense for your audience, your culture and your business then build collaborations that feel natural rather than painfully scripted. Because influence works better when people actually believe it.",
  },
  {
    id: "06",
    title: "Content Writing",
    body: "Words should do more than fill space. We find the right thing to say, the right way to say it, and the right reason for someone to care. From brand stories and campaigns to social content and copy, we make your ideas sound like you; only sharper.",
  },
  {
    id: "07",
    title: "Creative Direction",
    body: "Visual storytelling that gives your brand a point of view; from content concepts and campaigns to the look, feel, and creative language across every touchpoint.",
  },
  {
    id: "08",
    title: "Social Media Management",
    body: "We turn social into a space for your brand to experiment, evolve, and be seen. Strategy-led, creatively driven, and built for the culture of the internet.",
  },
] as const;

export const founders = [
  {
    name: "Bhini Dave",
    role: "Co-Founder, Head of Marketing",
    photo: "/people/bhini.png",
    linkedin: "https://www.linkedin.com/in/bhinidave/",
    instagram: "https://www.instagram.com/bhini.dave/",
  },
  {
    name: "Preet Ghelani",
    role: "Co-Founder, Head of Design",
    photo: "/people/preet.png",
    linkedin: "https://www.linkedin.com/in/preet-ghelani-6159641b4/",
    instagram: "https://www.instagram.com/preetghelani",
  },
] as const;
