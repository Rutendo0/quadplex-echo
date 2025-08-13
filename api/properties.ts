// Vercel Serverless Function for properties API
// This avoids importing server/db.ts so it works without DATABASE_URL

// Minimal property types
interface FloorPlanDetails {
  totalArea: string;
  bedrooms: number;
  bathrooms: number | string;
  garage: number;
  features?: string[];
}

interface Property {
  id: number;
  category: string; // "residential" | "commercial"
  type: string;
  subtype?: string | null;
  name: string;
  description: string;
  shortDescription?: string | null;
  price?: string | null;
  status?: string;
  exteriorImages: string[];
  interiorImages: string[];
  floorPlanImages?: string[];
  interiorVideos?: string[];
  features?: string[];
  floorPlanDetails?: FloorPlanDetails | null;
  specifications?: Record<string, any>;
}

// Static dataset copied from server/storage initializeRealPropertyData
const DATA: Property[] = [
  {
    id: 1,
    category: "residential",
    type: "single-storey",
    subtype: "4-bed",
    name: "4-Bedroom Single-Storey Home",
    description:
      "Discover exceptional single-storey living in these beautifully designed 4-bedroom homes above the clouds. Each residence features contemporary architecture, open-plan living spaces, and premium finishes throughout. Perfect for families seeking comfort, style, and functionality in a prestigious location.",
    shortDescription: "Contemporary 4-bedroom single-storey home with modern finishes",
    price: "$170,000",
    status: "available",
    exteriorImages: [
      "/properties/4-bedroom-single-story/single-story-a01-1.png",
      "/properties/4-bedroom-single-story/single-story-a01-2.png",
      "/properties/4-bedroom-single-story/single-story-a01-3.png",
      "/properties/4-bedroom-single-story/single-story-exterior-1.png",
    ],
    interiorImages: [
      "/properties/interiors/4-bedroom/master-bedroom-1.png",
      "/properties/interiors/4-bedroom/master-bedroom-2.png",
      "/properties/interiors/4-bedroom/kitchen-1.png",
      "/properties/interiors/4-bedroom/kitchen-2.png",
    ],
    floorPlanImages: ["/properties/floorplans/4-bedroom-floorplan-3d.png"],
    interiorVideos: [],
    features: [
      "Open-plan living",
      "Modern kitchen with stone benchtops",
      "Master bedroom with ensuite",
      "Built-in wardrobes",
      "Outdoor entertaining area",
      "Double garage",
      "Energy-efficient appliances",
      "Split-system air conditioning",
    ],
    floorPlanDetails: {
      totalArea: "145 sqm",
      bedrooms: 4,
      bathrooms: 2,
      garage: 2,
      features: [
        "Master bedroom with walk-in robe and ensuite",
        "Two additional bedrooms with built-ins",
        "Open-plan kitchen, dining, and living",
        "Main bathroom with bath and shower",
        "Separate laundry",
        "Double garage with internal access",
        "Covered outdoor entertaining area",
      ],
    },
    specifications: { buildYear: 2024, lotSize: "400 sqm", floorArea: "145 sqm" },
  },
  {
    id: 2,
    category: "residential",
    type: "double-storey-duplex",
    subtype: "4-bed",
    name: "4-Bedroom Double-Storey Home",
    description:
      "Experience elevated family living in these stunning 4-bedroom double-storey homes. Designed with modern families in mind, these residences offer spacious living areas across two levels, premium finishes, and spectacular views. The ground floor features open-plan living and entertaining spaces, while the upper level provides private bedroom retreats.",
    shortDescription: "Spacious 4-bedroom double-storey family home",
    price: "$170,000",
    status: "available",
    exteriorImages: [
      "/properties/4-bedroom-double-story/exterior-view-1.png",
      "/properties/4-bedroom-double-story/exterior-view-2.png",
      "/properties/4-bedroom-double-story/street-view.png",
      "/properties/4-bedroom-double-story/aerial-view.png",
      "/properties/4-bedroom-double-story/front-view-units.png",
    ],
    interiorImages: [
      "/properties/interiors/4-bedroom/master-bedroom-1.png",
      "/properties/interiors/4-bedroom/master-bedroom-2.png",
      "/properties/interiors/4-bedroom/kitchen-1.png",
      "/properties/interiors/4-bedroom/kitchen-2.png",
      "/properties/interiors/4-bedroom/kitchen-3.png",
      "/properties/interiors/4-bedroom/kitchen-detail.png",
    ],
    floorPlanImages: ["/properties/floorplans/4-bedroom-floorplan-3d.png"],
    interiorVideos: [
      "/properties/videos/interior-walkthrough-1.mp4",
      "/properties/videos/interior-walkthrough-2.mp4",
      "/properties/videos/interior-walkthrough-3.mp4",
    ],
    features: [
      "Double-storey design",
      "4 spacious bedrooms",
      "2.5 bathrooms",
      "Open-plan living",
      "Gourmet kitchen",
      "Outdoor entertaining",
      "Double garage",
      "Storage solutions",
    ],
    floorPlanDetails: {
      totalArea: "185 sqm",
      bedrooms: 4,
      bathrooms: 2.5,
      garage: 2,
      features: [
        "Ground floor: Open-plan kitchen, dining, living",
        "Ground floor: Powder room and laundry",
        "Upper level: Master bedroom with ensuite and walk-in robe",
        "Upper level: 3 additional bedrooms with built-ins",
        "Upper level: Main bathroom with bath",
        "Double garage with storage",
        "Outdoor entertaining area",
      ],
    },
    specifications: { buildYear: 2024, lotSize: "450 sqm", floorArea: "185 sqm" },
  },
  {
    id: 3,
    category: "residential",
    type: "single-storey-duplex",
    subtype: "3-bed",
    name: "3-Bedroom Single-Storey Duplex",
    description:
      "Smart duplex living designed for modern lifestyles. These 3-bedroom single-storey duplexes offer the perfect balance of privacy and community living. Each unit features contemporary design, quality finishes, and private outdoor spaces, while sharing premium amenities with your neighbor.",
    shortDescription: "Contemporary 3-bedroom duplex with private outdoor space",
    price: "$150,000",
    status: "available",
    exteriorImages: [
      "/properties/4-bedroom-single-story/single-story-exterior-2.png",
      "/properties/4-bedroom-single-story/single-story-exterior-3.png",
    ],
    interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
    floorPlanImages: ["/api/placeholder/800/600"],
    interiorVideos: [],
    features: [
      "Single-storey duplex design",
      "3 bedrooms with built-ins",
      "Open-plan living",
      "Modern kitchen",
      "Private courtyard",
      "Single garage",
      "Shared driveway",
      "Low maintenance living",
    ],
    floorPlanDetails: {
      totalArea: "125 sqm",
      bedrooms: 3,
      bathrooms: 2,
      garage: 1,
      features: [
        "Master bedroom with ensuite",
        "Two additional bedrooms with built-ins",
        "Open-plan kitchen, dining, living",
        "Main bathroom",
        "Separate laundry",
        "Single garage",
        "Private rear courtyard",
        "Front porch area",
      ],
    },
    specifications: { buildYear: 2024, lotSize: "250 sqm", floorArea: "125 sqm" },
  },
  {
    id: 4,
    category: "residential",
    type: "double-storey-duplex",
    subtype: "3-bed",
    name: "3-Bedroom Double-Storey Twin Duplex",
    description:
      "Sophisticated double-storey duplex living that maximizes space and style. These 3-bedroom twin duplexes feature contemporary architecture across two levels, offering separation of living and sleeping areas. The ground floor provides spacious entertaining areas, while the upper level offers private bedroom retreats with elevated views.",
    shortDescription: "Stylish 3-bedroom double-storey duplex with elevated living",
    price: "$220,000",
    status: "available",
    exteriorImages: [
      "/properties/3-bedroom-double-story/duplex-front-view.png",
      "/properties/3-bedroom-double-story/aerial-view.png",
      "/properties/3-bedroom-double-story/exterior-view-1.png",
      "/properties/3-bedroom-double-story/exterior-view-2.png",
      "/properties/3-bedroom-double-story/street-view-1.png",
      "/properties/3-bedroom-double-story/street-view-2.png",
    ],
    interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
    floorPlanImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    interiorVideos: [],
    features: [
      "Double-storey duplex design",
      "Elevated living spaces",
      "Contemporary architecture",
      "Open-plan ground floor",
      "Private upper level bedrooms",
      "Single garage",
      "Outdoor entertaining",
      "Low maintenance gardens",
    ],
    floorPlanDetails: {
      totalArea: "155 sqm",
      bedrooms: 3,
      bathrooms: 2.5,
      garage: 1,
      features: [
        "Ground floor: Open-plan kitchen, dining, living",
        "Ground floor: Powder room and laundry",
        "Upper level: Master bedroom with ensuite",
        "Upper level: 2 additional bedrooms with built-ins",
        "Upper level: Main bathroom",
        "Single garage with storage",
        "Small rear courtyard",
      ],
    },
    specifications: { buildYear: 2024, lotSize: "280 sqm", floorArea: "155 sqm" },
  },
];

function filterProperties(params: URLSearchParams) {
  const category = params.get("category") || undefined;
  const type = params.get("type") || undefined;
  const subtype = params.get("subtype") || undefined;

  return DATA.filter((p) => {
    if (category && p.category !== category) return false;
    if (type && p.type !== type) return false;
    if (subtype && p.subtype !== subtype) return false;
    return true;
  });
}

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const url = new URL(req.url || "", "http://localhost");
  const results = filterProperties(url.searchParams);
  res.status(200).json(results);
}