import { User, InsertUser, Property, InsertProperty, Inquiry, InsertInquiry, Booking, InsertBooking, PROPERTY_STRUCTURE } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  createProperty(property: InsertProperty): Promise<Property>;
  getProperties(category?: string, type?: string, subtype?: string): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(propertyId?: number): Promise<Inquiry[]>;
  getInquiryById(id: number): Promise<Inquiry | undefined>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(propertyId?: number): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking | undefined>;
  
  // Property structure
  getPropertyStructure(): typeof PROPERTY_STRUCTURE;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private inquiries: Map<number, Inquiry>;
  private bookings: Map<number, Booking>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentInquiryId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    this.bookings = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentInquiryId = 1;
    this.currentBookingId = 1;
    
    // Initialize with real property data
    this.initializeRealPropertyData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createProperty(propertyData: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...propertyData, 
      id,
      status: propertyData.status || "available",
      subtype: propertyData.subtype || null,
      shortDescription: propertyData.shortDescription || null,
      exteriorImages: propertyData.exteriorImages || [],
      interiorImages: propertyData.interiorImages || [],
      interiorVideos: propertyData.interiorVideos || [],
      floorPlanImages: propertyData.floorPlanImages || [],
      features: propertyData.features || [],
      specifications: propertyData.specifications || {},
      floorPlanDetails: propertyData.floorPlanDetails || null,
      price: propertyData.price || null
    };
    this.properties.set(id, property);
    return property;
  }

  async getProperties(category?: string, type?: string, subtype?: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => {
      if (category && property.category !== category) return false;
      if (type && property.type !== type) return false;
      if (subtype && property.subtype !== subtype) return false;
      return true;
    });
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  async createInquiry(inquiryData: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      ...inquiryData,
      id,
      propertyId: inquiryData.propertyId || null,
      phone: inquiryData.phone || null,
      inquiryType: inquiryData.inquiryType || "general",
      createdAt: new Date().toISOString(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(propertyId?: number): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(inquiry => 
      propertyId ? inquiry.propertyId === propertyId : true
    );
  }

  async getInquiryById(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  getPropertyStructure(): typeof PROPERTY_STRUCTURE {
    return PROPERTY_STRUCTURE;
  }

  private async initializeRealPropertyData() {
    // Real Property Data - 4-Bed Single-Storey Homes (10 units, $170,000 each)
    await this.createProperty({
      category: "residential",
      type: "single-storey", 
      subtype: "4-bed",
      name: "4-Bedroom Single-Storey Home",
      description: "Discover exceptional single-storey living in these beautifully designed 4-bedroom homes above the clouds. Each residence features contemporary architecture, open-plan living spaces, and premium finishes throughout. Perfect for families seeking comfort, style, and functionality in a prestigious location.",
      shortDescription: "Contemporary 4-bedroom single-storey home with modern finishes",
      price: "$170,000",
      status: "available",
      exteriorImages: [
        "/properties/4-bedroom-single-story/single-story-a01-1.png",
        "/properties/4-bedroom-single-story/single-story-a01-2.png",
        "/properties/4-bedroom-single-story/single-story-a01-3.png",
        "/properties/4-bedroom-single-story/single-story-exterior-1.png"
      ],
      interiorImages: [
        "/properties/interiors/4-bedroom/master-bedroom-1.png",
        "/properties/interiors/4-bedroom/master-bedroom-2.png",
        "/properties/interiors/4-bedroom/kitchen-1.png",
        "/properties/interiors/4-bedroom/kitchen-2.png"
      ],
      floorPlanImages: ["/properties/floorplans/4-bedroom-floorplan-3d.png"],
      interiorVideos: [],
      features: ["Open-plan living", "Modern kitchen with stone benchtops", "Master bedroom with ensuite", "Built-in wardrobes", "Outdoor entertaining area", "Double garage", "Energy-efficient appliances", "Split-system air conditioning"],
      floorPlanDetails: {
        totalArea: "145 sqm",
        bedrooms: 4,
        bathrooms: 2,
        garage: 2,
        features: ["Master bedroom with walk-in robe and ensuite", "Two additional bedrooms with built-ins", "Open-plan kitchen, dining, and living", "Main bathroom with bath and shower", "Separate laundry", "Double garage with internal access", "Covered outdoor entertaining area"]
      },
      specifications: { buildYear: 2024, lotSize: "400 sqm", floorArea: "145 sqm" }
    });

    // 4-Bed Double-Storey Homes (26 units, $170,000 each)
    await this.createProperty({
      category: "residential",
      type: "double-storey-duplex",
      subtype: "4-bed", 
      name: "4-Bedroom Double-Storey Home",
      description: "Experience elevated family living in these stunning 4-bedroom double-storey homes. Designed with modern families in mind, these residences offer spacious living areas across two levels, premium finishes, and spectacular views. The ground floor features open-plan living and entertaining spaces, while the upper level provides private bedroom retreats.",
      shortDescription: "Spacious 4-bedroom double-storey family home",
      price: "$170,000",
      status: "available",
      exteriorImages: [
        "/properties/4-bedroom-double-story/exterior-view-1.png",
        "/properties/4-bedroom-double-story/exterior-view-2.png", 
        "/properties/4-bedroom-double-story/street-view.png",
        "/properties/4-bedroom-double-story/aerial-view.png",
        "/properties/4-bedroom-double-story/front-view-units.png"
      ],
      interiorImages: [
        "/properties/interiors/4-bedroom/master-bedroom-1.png",
        "/properties/interiors/4-bedroom/master-bedroom-2.png",
        "/properties/interiors/4-bedroom/kitchen-1.png",
        "/properties/interiors/4-bedroom/kitchen-2.png",
        "/properties/interiors/4-bedroom/kitchen-3.png",
        "/properties/interiors/4-bedroom/kitchen-detail.png"
      ],
      floorPlanImages: ["/properties/floorplans/4-bedroom-floorplan-3d.png"],
      interiorVideos: [
        "/properties/videos/interior-walkthrough-1.mp4",
        "/properties/videos/interior-walkthrough-2.mp4",
        "/properties/videos/interior-walkthrough-3.mp4"
      ],
      features: ["Double-storey design", "4 spacious bedrooms", "2.5 bathrooms", "Open-plan living", "Gourmet kitchen", "Outdoor entertaining", "Double garage", "Storage solutions"],
      floorPlanDetails: {
        totalArea: "185 sqm",
        bedrooms: 4,
        bathrooms: 2.5,
        garage: 2,
        features: ["Ground floor: Open-plan kitchen, dining, living", "Ground floor: Powder room and laundry", "Upper level: Master bedroom with ensuite and walk-in robe", "Upper level: 3 additional bedrooms with built-ins", "Upper level: Main bathroom with bath", "Double garage with storage", "Outdoor entertaining area"]
      },
      specifications: { buildYear: 2024, lotSize: "450 sqm", floorArea: "185 sqm" }
    });

    // 3-Bed Single-Storey Duplexes (20 units, $150,000 each)
    await this.createProperty({
      category: "residential",
      type: "single-storey-duplex",
      subtype: "3-bed",
      name: "3-Bedroom Single-Storey Duplex",
      description: "Smart duplex living designed for modern lifestyles. These 3-bedroom single-storey duplexes offer the perfect balance of privacy and community living. Each unit features contemporary design, quality finishes, and private outdoor spaces, while sharing premium amenities with your neighbor.",
      shortDescription: "Contemporary 3-bedroom duplex with private outdoor space",
      price: "$150,000",
      status: "available",
      exteriorImages: [
        "/properties/4-bedroom-single-story/single-story-exterior-2.png",
        "/properties/4-bedroom-single-story/single-story-exterior-3.png"
      ],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Single-storey duplex design", "3 bedrooms with built-ins", "Open-plan living", "Modern kitchen", "Private courtyard", "Single garage", "Shared driveway", "Low maintenance living"],
      floorPlanDetails: {
        totalArea: "125 sqm",
        bedrooms: 3,
        bathrooms: 2,
        garage: 1,
        features: ["Master bedroom with ensuite", "Two additional bedrooms with built-ins", "Open-plan kitchen, dining, living", "Main bathroom", "Separate laundry", "Single garage", "Private rear courtyard", "Front porch area"]
      },
      specifications: { buildYear: 2024, lotSize: "250 sqm", floorArea: "125 sqm" }
    });

    // 3-Bed Double-Storey Duplexes (36 units, $220,000 each)
    await this.createProperty({
      category: "residential",
      type: "double-storey-duplex", 
      subtype: "3-bed",
      name: "3-Bedroom Double-Storey Twin Duplex",
      description: "Sophisticated double-storey duplex living that maximizes space and style. These 3-bedroom twin duplexes feature contemporary architecture across two levels, offering separation of living and sleeping areas. The ground floor provides spacious entertaining areas, while the upper level offers private bedroom retreats with elevated views.",
      shortDescription: "Stylish 3-bedroom double-storey duplex with elevated living",
      price: "$220,000",
      status: "available",
      exteriorImages: [
        "/properties/3-bedroom-double-story/duplex-front-view.png",
        "/properties/3-bedroom-double-story/aerial-view.png",
        "/properties/3-bedroom-double-story/exterior-view-1.png",
        "/properties/3-bedroom-double-story/exterior-view-2.png",
        "/properties/3-bedroom-double-story/street-view-1.png",
        "/properties/3-bedroom-double-story/street-view-2.png"
      ],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Double-storey duplex design", "Elevated living spaces", "Contemporary architecture", "Open-plan ground floor", "Private upper level bedrooms", "Single garage", "Outdoor entertaining", "Low maintenance gardens"],
      floorPlanDetails: {
        totalArea: "155 sqm",
        bedrooms: 3,
        bathrooms: 2.5,
        garage: 1,
        features: ["Ground floor: Open-plan kitchen, dining, living", "Ground floor: Powder room and laundry", "Upper level: Master bedroom with ensuite", "Upper level: 2 additional bedrooms with built-ins", "Upper level: Main bathroom", "Single garage with storage", "Small rear courtyard"]
      },
      specifications: { buildYear: 2024, lotSize: "280 sqm", floorArea: "155 sqm" }
    });

    // Ground-Floor Studios (252 units total across 18 blocks, Rental)
    await this.createProperty({
      category: "residential",
      type: "apartment-blocks",
      subtype: "ground-floor-studio",
      name: "Ground-Floor Studio Apartment",
      description: "Modern studio apartments designed for urban professionals and students. These ground-floor units feature contemporary open-plan living with direct access to landscaped courtyards. Each studio includes premium finishes, European appliances, and access to world-class shared amenities across the three-storey apartment blocks.",
      shortDescription: "Contemporary studio with courtyard access",
      price: "Rental Only",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Ground-floor access", "Open-plan living", "European appliances", "Built-in storage", "Courtyard access", "Communal facilities", "Secure building entry", "On-site management"],
      floorPlanDetails: {
        totalArea: "35 sqm",
        bedrooms: 0,
        bathrooms: 1,
        garage: 0,
        features: ["Open-plan living and sleeping area", "Compact kitchen with quality appliances", "Full bathroom with shower", "Built-in wardrobes", "Private courtyard access", "Shared laundry facilities"]
      },
      specifications: { buildYear: 2024, lotSize: "N/A", floorArea: "35 sqm" }
    });

    // First-Floor 1-Bedrooms (144 units total across 18 blocks, Rental)
    await this.createProperty({
      category: "residential",
      type: "apartment-blocks",
      subtype: "first-floor-1bed",
      name: "First-Floor 1-Bedroom Apartment",
      description: "Elevated 1-bedroom apartments offering privacy and convenience. Located on the first floor of our three-storey apartment blocks, these residences feature separate bedroom and living areas, modern kitchens, and access to building amenities. Perfect for professionals and couples seeking contemporary apartment living.",
      shortDescription: "Elevated 1-bedroom with separate living areas",
      price: "Rental Only",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["First-floor location", "Separate bedroom", "Open living areas", "Modern kitchen", "Built-in storage", "Balcony access", "Lift access", "Building amenities"],
      floorPlanDetails: {
        totalArea: "55 sqm",
        bedrooms: 1,
        bathrooms: 1,
        garage: 0,
        features: ["Separate bedroom with built-in wardrobes", "Open-plan kitchen and living area", "Full bathroom with shower", "Private balcony", "Internal laundry", "Secure building entry with lift access"]
      },
      specifications: { buildYear: 2024, lotSize: "N/A", floorArea: "55 sqm" }
    });

    // Second-Floor 2-3 Bedrooms (72 units total across 18 blocks, Sale - $120,000)
    await this.createProperty({
      category: "residential",
      type: "apartment-blocks",
      subtype: "second-floor-2bed", 
      name: "Second-Floor 2-Bedroom Apartment",
      description: "Premium top-floor apartments with spectacular elevated views. These 2-3 bedroom residences occupy the highest level of our three-storey apartment blocks, offering the best views and maximum privacy. Each apartment features quality finishes, spacious living areas, and premium inclusions throughout.",
      shortDescription: "Premium top-floor apartments with elevated views",
      price: "$120,000",
      status: "available", 
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Top-floor position", "2-3 bedroom options", "Elevated views", "Quality finishes", "Spacious living", "Private balconies", "Lift access", "Premium inclusions"],
      floorPlanDetails: {
        totalArea: "75 sqm",
        bedrooms: 2,
        bathrooms: 2,
        garage: 1,
        features: ["Master bedroom with ensuite", "Second bedroom with built-ins", "Open-plan living and dining", "Modern kitchen with stone benchtops", "Main bathroom", "Private balcony with views", "Secure parking space"]
      },
      specifications: { buildYear: 2024, lotSize: "N/A", floorArea: "75 sqm" }
    });
  }

  // Booking management methods
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = {
      ...bookingData,
      id,
      status: bookingData.status || "pending",
      stripePaymentIntentId: bookingData.stripePaymentIntentId || null,
      paymentPlan: bookingData.paymentPlan || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(propertyId?: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => 
      propertyId ? booking.propertyId === propertyId : true
    );
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = {
      ...booking,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  private initializeSampleProperties() {
    // Sample residential properties for each category and subtype
    const sampleProperties = [
      // Single Storey Stand Alone
      {
        category: "residential" as const,
        type: "single-storey" as const,
        subtype: "3-bed" as const,
        name: "Luxury 3-Bedroom Single Storey Villa",
        description: "Experience refined living in this stunning single-storey villa featuring three spacious bedrooms, open-plan living areas, and panoramic cloud views. Premium finishes throughout with marble countertops, hardwood floors, and floor-to-ceiling windows that frame the endless sky. The master suite includes a walk-in closet and spa-like ensuite with soaking tub.",
        shortDescription: "Elegant 3-bed villa with cloud views and premium finishes",
        exteriorImages: ["/api/placeholder/800/600?text=Single+Storey+3Bed+Exterior", "/api/placeholder/800/600?text=Villa+Garden+View"],
        interiorImages: ["/api/placeholder/600/400?text=Living+Room", "/api/placeholder/600/400?text=Master+Bedroom", "/api/placeholder/600/400?text=Kitchen"],
        interiorVideos: [],
        floorPlanImages: ["/api/placeholder/800/600?text=3Bed+Floor+Plan"],
        floorPlanDetails: {
          totalArea: "2,100 sq ft",
          bedrooms: 3,
          bathrooms: 2,
          livingAreas: 1,
          garage: 2,
          features: ["Master ensuite", "Walk-in closets", "Open kitchen", "Private garden"]
        },
        price: "$850,000 - $950,000",
        features: ["Panoramic views", "Premium finishes", "Smart home system", "Private garden"],
        specifications: {
          lotSize: "0.5 acres",
          yearBuilt: "2024",
          heating: "Radiant floor heating",
          cooling: "Central air conditioning"
        },
        status: "available" as const
      },
      {
        category: "residential" as const,
        type: "single-storey" as const,
        subtype: "4-bed" as const,
        name: "Executive 4-Bedroom Single Storey Estate",
        description: "Spacious executive home with four generous bedrooms, multiple living areas, and stunning architectural details. Features include a gourmet kitchen with butler's pantry, formal dining room, family room with fireplace, and a luxurious master wing with sitting area.",
        shortDescription: "Executive 4-bed estate with multiple living areas",
        exteriorImages: ["/api/placeholder/800/600?text=Single+Storey+4Bed+Exterior", "/api/placeholder/800/600?text=Estate+Front+View"],
        interiorImages: ["/api/placeholder/600/400?text=Gourmet+Kitchen", "/api/placeholder/600/400?text=Family+Room", "/api/placeholder/600/400?text=Master+Suite"],
        interiorVideos: [],
        floorPlanImages: ["/api/placeholder/800/600?text=4Bed+Floor+Plan"],
        floorPlanDetails: {
          totalArea: "2,800 sq ft",
          bedrooms: 4,
          bathrooms: 3,
          livingAreas: 2,
          garage: 3,
          features: ["Master wing", "Butler's pantry", "Fireplace", "Study room"]
        },
        price: "$1,150,000 - $1,350,000",
        features: ["Executive layout", "Gourmet kitchen", "Multiple living areas", "3-car garage"],
        specifications: {
          lotSize: "0.75 acres",
          yearBuilt: "2024",
          heating: "Zoned radiant heating",
          cooling: "Dual-zone air conditioning"
        },
        status: "available" as const
      },
      // Apartment Blocks
      {
        category: "residential" as const,
        type: "apartment-blocks" as const,
        subtype: "ground-floor-studio" as const,
        name: "Cloud View Studio Apartment",
        description: "Modern ground-floor studio apartment with direct access to landscaped gardens. Features an open-concept design with kitchen, living, and sleeping areas flowing seamlessly together. Floor-to-ceiling windows provide abundant natural light and stunning views of the clouds above.",
        shortDescription: "Modern studio with garden access and cloud views",
        exteriorImages: ["/api/placeholder/800/600?text=Studio+Building+Exterior"],
        interiorImages: ["/api/placeholder/600/400?text=Studio+Interior", "/api/placeholder/600/400?text=Kitchen+Area"],
        interiorVideos: [],
        floorPlanImages: ["/api/placeholder/800/600?text=Studio+Floor+Plan"],
        floorPlanDetails: {
          totalArea: "650 sq ft",
          bedrooms: 0,
          bathrooms: 1,
          livingAreas: 1,
          features: ["Garden access", "Built-in storage", "Modern kitchen", "Spa bathroom"]
        },
        price: "$320,000 - $380,000",
        features: ["Garden access", "Modern appliances", "Built-in storage", "Concierge service"],
        specifications: {
          floor: "Ground",
          balcony: "Private patio",
          parking: "Assigned space"
        },
        status: "available" as const
      },
      {
        category: "residential" as const,
        type: "apartment-blocks" as const,
        subtype: "first-floor-1bed" as const,
        name: "First Floor One-Bedroom Apartment",
        description: "Sophisticated one-bedroom apartment on the first floor offering elevated views and modern living. Features a spacious bedroom with built-in wardrobes, open-plan kitchen and living area, and a private balcony perfect for morning coffee while watching the clouds drift by.",
        shortDescription: "Elevated 1-bed apartment with private balcony",
        exteriorImages: ["/api/placeholder/800/600?text=1Bed+Building+View"],
        interiorImages: ["/api/placeholder/600/400?text=1Bed+Living", "/api/placeholder/600/400?text=Bedroom", "/api/placeholder/600/400?text=Balcony+View"],
        interiorVideos: [],
        floorPlanImages: ["/api/placeholder/800/600?text=1Bed+Floor+Plan"],
        floorPlanDetails: {
          totalArea: "850 sq ft",
          bedrooms: 1,
          bathrooms: 1,
          livingAreas: 1,
          features: ["Private balcony", "Built-in wardrobes", "Open kitchen", "City views"]
        },
        price: "$450,000 - $520,000",
        features: ["Elevated views", "Private balcony", "Built-in storage", "Modern appliances"],
        specifications: {
          floor: "First",
          balcony: "Private balcony",
          parking: "Assigned space"
        },
        status: "available" as const
      }
    ];

    // Add all sample properties to storage
    sampleProperties.forEach(sample => {
      const id = this.currentPropertyId++;
      this.properties.set(id, { ...sample, id });
    });
  }
}

export const storage = new MemStorage();
