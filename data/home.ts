

export const homeHero = {
 
  line1: "Where",
  line2Gold: "Vision",
  line2Rest: "Extends",
  line3: "Beyond Limits",
  body:
    "More than a marketplace — SkyFalcons delivers complete aviation solutions. Intelligence-driven marketing attracts qualified prospects, a global network creates opportunities, and a hands-on approach ensures every detail is managed from inquiry to seamless aircraft integration.",
  links: [
    { label: "Sales & Acquisition", href: "/marketplace" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Charter Services", href: "/charter" }
  ],
  videoSrc: "/hero-video.mp4",
  poster: "/hero-poster.jpg"
};

export const whoWeAre = {
  eyebrow: "Who We Are",
  headingLead: "Beyond conventional",
  headingAccent: "deal-making",
  lead:
    "In a market where precision, timing, and trust define success, SkyFalcons stands as a next-generation aviation brokerage firm that goes beyond conventional deal-making.",
  body:
    "Founded in 2019, SkyFalcons combines technical expertise, global connectivity, and intelligent technology to deliver seamless aviation solutions across private jet sales and acquisitions, charter brokerage, and consultancy.",
  founded: "2019",
  quote:
    "We are not just brokers — we are pilots, aerospace engineers, and strategists who understand aircraft from both a technical and investment perspective.",
  pillars: [
    {
      icon: "/avhub_Logo_DB.png",
      title: "",
      desc: "Our exclusive business-aviation intelligence system."
    },
    {
      icon: "store",
      title: "Global Marketplace",
      desc: "An in-house marketplace for sourcing and selling aircraft."
    },
    {
      icon: "network",
      title: "Partner Network",
      desc: "A strong network of industry partners worldwide."
    }
  ],
  outcome:
    "Together, they give our clients enhanced speed, transparency, and access that set us apart in the market."
};

export const turnKey = {
  eyebrow: "Turn Key Solution",
  heading: "Turn Key Solution",
  subtitle:
    "More than a marketplace — we're brokers with turnkey solutions, coordinating MROs, authorities, and post-closing workscope for seamless aircraft integration.",

  aircraft: "/aircraft.png",

  services: [
    {
      label: "Aircraft Sales",
      icon: "sales",
      description:
        "Discreet, end-to-end representation for sellers — positioning, marketing and negotiation to close at the right value."
    },
    {
      label: "Acquisitions",
      icon: "acquisitions",
      description:
        "Sourcing and securing the right aircraft on the right terms, with full technical and market diligence."
    },
    {
      label: "Appraisals",
      icon: "appraisals",
      description:
        "Independent, market-grounded valuations for purchase, sale, finance or insurance decisions."
    },
    {
      label: "Maintenance Oversight",
      icon: "maintenance",
      description:
        "Coordination of MROs, inspections and workscopes so your asset stays airworthy and on schedule."
    },
    {
      label: "Completions",
      icon: "completions",
      description:
        "Management of interior and exterior completion programs, from specification through to delivery."
    },
    {
      label: "Marketing & Outreach",
      icon: "marketing",
      description:
        "Targeted global marketing that puts your aircraft in front of qualified, ready buyers."
    }
  ]
};

export type TurnKeyService = (typeof turnKey.services)[number];