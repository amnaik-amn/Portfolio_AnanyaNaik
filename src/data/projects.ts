export type ProjectType = "architecture" | "art" | "personal";

export interface Project {
  id: string;
  title: string;
  description?: string;
  project_type: ProjectType;
  category?: string;
  location?: string;
  year?: string;
  area?: string;
  client?: string;
  cover_image: string;
  gallery_images?: string[];
  // Optional extended fields for detailed page
  problem_statement?: string;
  site_diagrams?: string[]; // images illustrating site/context
  solution?: string;
  results_images?: string[]; // final results media (fallback to gallery_images)
  partners?: string[]; // community partners
  origin?: string; // where the project was from (program, studio, competition)
}

export const sampleProjects: Project[] = [
  {
    id: "arch-01",
    title: "San Francisco's Guide",
    description:
      "A residential retreat carved into the coastline, balancing privacy with panoramic views of the sea.",
    project_type: "architecture",
    category: "museum",
    location: "Pier 19, San Francisco",
    year: "2024",
    area: "4,900 sq ft",
    client: "The Marinho Family",
    cover_image: "/images/renderp1.jpg",
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a87fc1574?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=80"
    ],
    problem_statement:
      "The steep coastal site suffered from erosion, harsh western glare, and strong monsoon winds, while the brief required unobstructed sea views and protected outdoor living.",
    site_diagrams: [
      "/images/problemp1.png"
    ],
    solution:
      "The building terraces into the rock, forming wind-buffered courtyards. Deep overhangs and vertical fins filter low sun while framing horizons. Local laterite, reclaimed timber, and micro-piles reduce site disturbance.",
    results_images: [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&auto=format&fit=crop&q=80"
    ],
    partners: ["Coastal Ecology Lab", "Goa Stone Crafts", "Studio Forma"],
    origin: "Graduate Design Studio, Semester 9"
  },
  {
    id: "art-01",
    title: "Chromatic Reverie",
    description:
      "Immersive installation exploring the tension between geometry and motion through layers of light.",
    project_type: "art",
    category: "installation",
    location: "Mumbai, India",
    year: "2023",
    cover_image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1440470177933-78ddab1c9d3e?w=1200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "personal-01",
    title: "Luminous Objects",
    description:
      "A series of sculptural light experiments blending reclaimed glass, CNC-milled timber, and circuitry.",
    project_type: "personal",
    category: "experiment",
    year: "2022",
    cover_image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
    ]
  }
  ,
  {
    id: "arch-02",
    title: "Regenerative Housing",
    description: "Prototype for equitable slum rehabilitation integrating incremental growth, shared services, and dignified vertical circulation.",
    project_type: "architecture",
    category: "slum_rehabilitation",
    location: "Sion, Maharashtra",
    year: "2024",
    area: "1,250 sq ft (pilot module)",
    client: "Community Cooperative",
    cover_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1486326658981-107a20e5d26f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&auto=format&fit=crop&q=80"
    ],
    problem_statement: "Existing informal housing blocks suffer from poor ventilation, unsafe ad-hoc extensions, limited sanitation cores, and fragmented social space.",
    solution: "A modular structural frame allows phased unit upgrades; clustered wet cores reduce service runs; porous circulation decks promote airflow and social interaction while enabling future vertical expansion.",
    origin: "Urban Rehabilitation Studio"
  },
  {
    id: "arch-03",
    title: "CO-HOUSING AND FARMS",
    description: "An academic courtyard forged from compressed earth blocks and shaded log trellises, fostering passive cooling and collective study.",
    project_type: "architecture",
    category: "affordable_co_living",
    location: "Richmond, California",
    year: "2023",
    area: "3,400 sq ft",
    client: "Riverside Public School",
    cover_image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505842465776-3d90f616310d?w=1200&auto=format&fit=crop&q=80"
    ],
    problem_statement: "Existing hardscaped quad trapped heat and discouraged lingering during peak afternoon hours.",
    solution: "Porous earthen walls channel breezes; planted bio-swales cool air; timber lattice mediates glare while supporting creeping vines.",
    origin: "Undergraduate Studio Project"
  },
  {
    id: "arch-04",
    title: "THE DANTEUM",
    description: "Rapid-deploy shelter system using interlocking fiber panels and inflatable ribs for seasonal flood response staging.",
    project_type: "architecture",
    category: "film_set",
    location: "Southern Italy",
    year: "2024",
    area: "900 sq ft (cluster)",
    client: "Regional Disaster Coalition",
    cover_image: "https://images.unsplash.com/photo-1503416997304-7f8bf166c121?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1504307651755-4fa54c3f1a89?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop&q=80"
    ],
    problem_statement: "Conventional relief tents degrade rapidly under prolonged rain and require skilled assembly.",
    solution: "Interlocking recycled fiber panels snap around inflatable ring beams; integrated gutters harvest and divert water to bladder tanks.",
    origin: "Disaster Resilience Research Fellowship"
  },
  {
    id: "arch-05",
    title: "SPICE SHOP",
    description: "A stepped maker space embedded into a hillside, showcasing local ceramic and textile production with passive daylighting.",
    project_type: "architecture",
    category: "retail_interiors",
    location: "Budaiya, Bahrain",
    year: "2023",
    area: "2,600 sq ft",
    client: "Handmade Cooperative",
    cover_image: "https://images.unsplash.com/photo-1512917774080-9991f1c74fae?w=1200&auto=format&fit=crop&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=80"
    ],
    problem_statement: "Artisan workshops suffered from glare on upper terraces and dampness on lower levels.",
    solution: "Sawtooth skylights and lime-plaster retaining walls modulate light and humidity; shared kiln courtyard binds levels.",
    origin: "Community Design-Build Initiative"
  }
];

