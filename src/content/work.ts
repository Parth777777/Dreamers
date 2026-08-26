export type WorkMetric = {
  value: string;
  label: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  tags: string[];
  posterSrc: string;
  year: string;
  period: string;
  objective: string;
  secondary: string;
  challenges: string[];
  strategy: string[];
  results: string[];
  metrics: WorkMetric[];
  visuals: string[];
  deckHref: string;
  deckLabel: string;
  clientLogo?: string;
};

export const work: WorkItem[] = [
  {
    slug: "canara-hsbc",
    title: "Increase Domain Authority and Organic Traffic",
    client: "Canara HSBC",
    summary: "Increase organic traffic by 1.5x and improve current website SEO structure. Jan 2022 – Present.",
    tags: ["SEO", "Insurance"],
    posterSrc: "https://logo.clearbit.com/canarahsbclife.com",
    year: "2023",
    period: "Jan 2022 – Present",
    objective: "To Increase organic traffic and improve current website seo structure.",
    secondary: "To increase organic leads and reduce bounce rate of product pages.",
    challenges: [
      "Highly competitive insurance companies already owned dominant market share, which leads expensive results.",
      "Core term keywords is too competitive to rank on Google."
    ],
    strategy: [
      "Identified high authority pages and linked those to the website.",
      "Targeted high search volume insurance keywords, achieving first page ranking for 484 keywords.",
      "Modified web pages for different devices to increase the conversion rate (e.g. AMP pages for mobile).",
      "Revised existing tags and structure navigation of the website."
    ],
    results: [
      "Overall Website Visits Increased by 25%.",
      "Keywords Ranking Improved by 65%.",
      "Increased organic traffic by 1.5x.",
      "Improved DA by 5 points and Alexa rank by 12,000."
    ],
    metrics: [
      { value: "+25%", label: "Website Visits" },
      { value: "1.5x", label: "Organic Traffic" },
      { value: "+5", label: "Domain Authority" }
    ],
    visuals: ["/studies/slides/canara-hsbc-1.jpg", "/studies/slides/canara-hsbc-2.jpg"],
    deckHref: "/studies/canara-hsbc.pptx",
    deckLabel: "Open the Canara HSBC Presentation",
    clientLogo: "https://logo.clearbit.com/canarahsbclife.com",
  },
  {
    slug: "mastertrust",
    title: "Improving Search Visibility for Mastertrust",
    client: "Mastertrust",
    summary: "Increase search visibility and organic traffic, growing organic new users by 35%. July 2021 – July 2022.",
    tags: ["SEO", "Finance"],
    posterSrc: "https://logo.clearbit.com/mastertrust.co.in",
    year: "2022",
    period: "July 2021 – July 2022",
    objective: "To Increase search visibility and organic traffic of the mastertrust website.",
    secondary: "To increase organic leads and reduce bounce rate of product pages.",
    challenges: [
      "Highly competitive Stock/trading companies already owned dominant market share.",
      "The Core term keywords is too competitive to rank on Google."
    ],
    strategy: [
      "Added sufficient blogs on website to make sure users stay on our website & come back to read.",
      "Connected our website to high DA & PA websites so that those website pass link juice."
    ],
    results: [
      "Website organic new users Increase 35%.",
      "Increase Non brand keywords traffic by 11%."
    ],
    metrics: [
      { value: "+35%", label: "Organic New Users" },
      { value: "+11%", label: "Non-brand Traffic" }
    ],
    visuals: ["/studies/slides/mastertrust-1.jpg", "/studies/slides/mastertrust-2.jpg"],
    deckHref: "/studies/mastertrust.pptx",
    deckLabel: "Open the Mastertrust Presentation",
    clientLogo: "https://logo.clearbit.com/mastertrust.co.in",
  },
  {
    slug: "nivea",
    title: "Nivea B2C Digital Revenue Growth Campaign",
    client: "Nivea",
    summary: "Regain website awareness and drive maximum B2C sales using the newly launched website. Jan 2021 to April 2021.",
    tags: ["Digital", "E-commerce"],
    posterSrc: "https://logo.clearbit.com/nivea.com",
    year: "2021",
    period: "Jan 2021 to April 2021",
    objective: "Regain the website awareness and to be present in the top mind of the customers.",
    secondary: "Generate maximum sale through Online platform while reducing cost/transaction.",
    challenges: [
      "E-commerce portal awareness went down as existing website was not working for a long time."
    ],
    strategy: [
      "Created 5 type of audience persona on Facebook to deliver our range of products.",
      "Created separate search campaigns for Brand, Core & Product specific & Competitor campaigns.",
      "Started smart shopping campaigns to increase sale.",
      "Used Display campaigns to create audience buckets and maximise sale through dynamic remarketing."
    ],
    results: [
      "Growth in Revenue 50%.",
      "Increase in ROI Overall 2.5x.",
      "Growth in Brand Searches 32%."
    ],
    metrics: [
      { value: "+50%", label: "Growth in Revenue" },
      { value: "2.5x", label: "Increase in ROI" },
      { value: "+32%", label: "Brand Searches" }
    ],
    visuals: ["/studies/slides/nivea-1.jpg", "/studies/slides/nivea-2.jpg", "/studies/slides/nivea-3.jpg"],
    deckHref: "/studies/nivea.pptx",
    deckLabel: "Open the Nivea Presentation",
    clientLogo: "https://logo.clearbit.com/nivea.com",
  },
  {
    slug: "lti-seo",
    title: "Increase Domain Authority and Search Visibility",
    client: "Larsen & Toubro Infotech",
    summary: "Achieve highest Non Brand Traffic Share among competitors, growing organic traffic to 100K. July 2019 – June 2020.",
    tags: ["SEO", "Tech"],
    posterSrc: "https://logo.clearbit.com/ltimindtree.com",
    year: "2020",
    period: "July'19 – June'20",
    objective: "To relaunch the brand on online platform and maintain organic traffic.",
    secondary: "To increase online leads from USA and European Countries.",
    challenges: [
      "Highly competitive tech companies already owned dominant market share, which leads expensive results.",
      "Relaunched brand term is too competitive to rank on Google."
    ],
    strategy: [
      "Identified high authority pages and linked those to LTI website.",
      "Targeted high search volume tech and Industry keywords.",
      "Started account based SEO activities to win client accounts.",
      "Modified web pages for different devices to increase the conversion rate (e.g. AMP pages for mobile)."
    ],
    results: [
      "Website Organic Visits Increase by 31%.",
      "Keywords Ranking Improvement 45%.",
      "Increase Leads 18.25%.",
      "Improved DA by 5 points and Alexa rank by 12000."
    ],
    metrics: [
      { value: "+31%", label: "Organic Visits" },
      { value: "+45%", label: "Keyword Rankings" },
      { value: "+18%", label: "Leads" }
    ],
    visuals: [
      "/studies/slides/lti-seo-1.jpg", "/studies/slides/lti-seo-2.jpg", 
      "/studies/slides/lti-seo-3.jpg", "/studies/slides/lti-seo-4.jpg", 
      "/studies/slides/lti-seo-5.jpg", "/studies/slides/lti-seo-6.jpg", 
      "/studies/slides/lti-seo-7.jpg"
    ],
    deckHref: "/studies/lti-seo.pdf",
    deckLabel: "Open the LTI Presentation",
    clientLogo: "https://logo.clearbit.com/ltimindtree.com",
  },
  {
    slug: "omnigel",
    title: "Driving Organic Website Traffic and Search Visibility",
    client: "Omnigel",
    summary: "Increase Organic website traffic and reduce bounce rate of the overall website. June 2022 to Sep 2023.",
    tags: ["SEO", "Healthcare"],
    posterSrc: "https://logo.clearbit.com/cipla.com",
    year: "2023",
    period: "June'22 to Sep'23",
    objective: "Increase Organic website traffic and improve Keyword ranking on Search Engine Result pages.",
    secondary: "Focus on reducing bounce rate of the overall website specially on Blog section.",
    challenges: [
      "Low traffic due to missing basics.",
      "Absence on brand searches.",
      "90% blog bounce rate.",
      "Targeted keywords absent."
    ],
    strategy: [
      "Revamp content emphasizing search intent & user experience (UX) through topic clusters.",
      "AI-Driven Content Analysis and Optimization Leveraging Structured Data.",
      "Implemented E.E.A.T. guidelines.",
      "Applying the Hub-and-Spoke strategy for effective keyword utilization."
    ],
    results: [
      "Website Visit increased by 120%.",
      "The Bounce rate reduced by 90% to 60%.",
      "Keywords Ranking Improvement by 100%."
    ],
    metrics: [
      { value: "+120%", label: "Website Visits" },
      { value: "60%", label: "Bounce Rate" },
      { value: "+100%", label: "Keyword Rankings" }
    ],
    visuals: [
      "/studies/slides/omnigel-1.jpg", "/studies/slides/omnigel-2.jpg",
      "/studies/slides/omnigel-3.jpg", "/studies/slides/omnigel-4.jpg",
      "/studies/slides/omnigel-5.jpg", "/studies/slides/omnigel-6.jpg",
      "/studies/slides/omnigel-7.jpg", "/studies/slides/omnigel-8.jpg",
      "/studies/slides/omnigel-9.jpg", "/studies/slides/omnigel-10.jpg",
      "/studies/slides/omnigel-11.jpg", "/studies/slides/omnigel-12.jpg"
    ],
    deckHref: "/studies/omnigel.pdf",
    deckLabel: "Open the Omnigel Presentation",
    clientLogo: "https://logo.clearbit.com/cipla.com",
  }
];
