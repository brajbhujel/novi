export const navLinks = [
  { label: "Capabilities", href: "#features" },
  { label: "Import", href: "#integrations" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const features = [
  {
    id: "boards",
    title: "Boards that move at your speed",
    description:
      "Plan sprints and track tasks without hunting through spreadsheets. Drag, filter, and ship in one view.",
    accent: "boards",
  },
  {
    id: "threads",
    title: "Threads, not another inbox",
    description:
      "Keep project conversations attached to the work itself so context never gets lost in chat.",
    accent: "threads",
  },
  {
    id: "timeline",
    title: "One timeline for the whole team",
    description:
      "Every deadline and milestone in one shared view. See what is due, what is blocked, and what is next.",
    accent: "timeline",
  },
  {
    id: "import",
    title: "Works the way you already do",
    description:
      "Import from Trello, Asana, or a spreadsheet in minutes. Your tools change. Your workflow stays.",
    accent: "import",
  },
] as const;

export const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Help center", href: "#" },
    { label: "Guides", href: "#" },
    { label: "API", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ],
} as const;

export const howSteps = [
  {
    step: "01",
    title: "Bring your work in",
    description: "Import boards or start fresh. Novi maps tasks, owners, and due dates automatically.",
  },
  {
    step: "02",
    title: "Plan in one place",
    description: "Boards, docs, and threads live together so your team stops bouncing between tabs.",
  },
  {
    step: "03",
    title: "Ship with clarity",
    description: "Shared timelines keep deadlines visible. Everyone knows what matters this week.",
  },
] as const;
