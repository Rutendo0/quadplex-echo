import { User, InsertUser, Property, InsertProperty, Inquiry, InsertInquiry, PROPERTY_STRUCTURE } from "@shared/schema";

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
  
  // Property structure
  getPropertyStructure(): typeof PROPERTY_STRUCTURE;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with premium sample properties
    this.initializePremiumProperties();
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
      shortDescription: propertyData.shortDescription || null
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

  private async initializePremiumProperties() {
    // Premium Single Storey Properties
    await this.createProperty({
      category: "residential",
      type: "single-storey", 
      subtype: "3-bed",
      name: "Skyline Villa 3-Bed",
      description: "An exquisite single-storey villa offering panoramic cloud views with premium finishes throughout. This 3-bedroom residence features an open-plan living design that seamlessly connects indoor and outdoor spaces.",
      shortDescription: "Luxury single-storey living with panoramic views",
      price: "$850,000",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Panoramic cloud views", "Open-plan living", "Premium finishes", "Outdoor terrace", "Smart home technology", "Energy efficient design"],
      floorPlanDetails: {
        totalArea: "180 sqm",
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        features: ["Master suite with walk-in wardrobe", "Gourmet kitchen with island", "Spacious living area", "Private outdoor terrace", "Study nook", "Storage solutions"]
      },
      specifications: { buildYear: 2024, lotSize: "450 sqm", floorArea: "180 sqm" }
    });

    await this.createProperty({
      category: "residential",
      type: "single-storey",
      subtype: "4-bed", 
      name: "Horizon Estate 4-Bed",
      description: "A magnificent 4-bedroom single-storey estate designed for executive families. Featuring expansive living spaces, premium amenities, and breathtaking elevated views above the clouds.",
      shortDescription: "Executive family home with premium amenities",
      price: "$1,200,000",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Executive design", "Expansive living spaces", "Premium kitchen appliances", "Home office", "Entertainment area", "Landscaped gardens"],
      floorPlanDetails: {
        totalArea: "240 sqm",
        bedrooms: 4,
        bathrooms: 3,
        garage: 2,
        features: ["Master suite with ensuite and walk-in robe", "Three additional bedrooms", "Separate home office", "Open-plan kitchen/dining/living", "Butler's pantry", "Alfresco entertaining area"]
      },
      specifications: { buildYear: 2024, lotSize: "600 sqm", floorArea: "240 sqm" }
    });

    // Premium Duplex Properties
    await this.createProperty({
      category: "residential",
      type: "single-storey-duplex",
      subtype: "3-bed",
      name: "Cloud Duplex 3-Bed",
      description: "Modern duplex living that combines privacy with shared premium amenities. Each 3-bedroom unit features contemporary design with access to communal facilities and gardens.",
      shortDescription: "Modern duplex living with shared amenities",
      price: "$680,000",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Duplex design", "Shared amenities", "Private gardens", "Contemporary finishes", "Community spaces", "Low maintenance"],
      floorPlanDetails: {
        totalArea: "150 sqm",
        bedrooms: 3,
        bathrooms: 2,
        garage: 1,
        features: ["Open-plan living", "Private courtyard", "Modern kitchen", "Master bedroom with ensuite", "Shared community facilities", "Visitor parking"]
      },
      specifications: { buildYear: 2024, lotSize: "300 sqm", floorArea: "150 sqm" }
    });

    await this.createProperty({
      category: "residential",
      type: "double-storey-duplex", 
      subtype: "4-bed",
      name: "Elevation Duplex 4-Bed",
      description: "Premium double-storey duplex homes offering elevated living with expansive sky views. These 4-bedroom residences feature sophisticated design across two levels.",
      shortDescription: "Premium double-storey homes with sky views",
      price: "$950,000",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Two-storey design", "Elevated sky views", "Sophisticated interiors", "Private rooftop access", "Premium fixtures", "Smart home integration"],
      floorPlanDetails: {
        totalArea: "220 sqm",
        bedrooms: 4,
        bathrooms: 3,
        garage: 2,
        features: ["Ground floor living areas", "Upper level bedrooms", "Rooftop terrace access", "Double-height ceilings", "Premium kitchen with stone benches", "Walk-in pantry"]
      },
      specifications: { buildYear: 2024, lotSize: "400 sqm", floorArea: "220 sqm" }
    });

    // Premium Apartment Properties
    await this.createProperty({
      category: "residential",
      type: "apartment-blocks",
      subtype: "ground-floor-studio",
      name: "Ground Floor Studio",
      description: "Contemporary ground-floor studio with direct garden access and modern amenities. Perfect for professionals seeking efficient living in a premium location.",
      shortDescription: "Modern studios with garden access",
      price: "$320,000",
      status: "available",
      exteriorImages: ["/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Garden access", "Open-plan design", "Modern appliances", "Built-in storage", "Communal facilities", "Secure entry"],
      floorPlanDetails: {
        totalArea: "45 sqm",
        bedrooms: 0,
        bathrooms: 1,
        garage: 0,
        features: ["Open-plan living/sleeping area", "Compact kitchen with European appliances", "Private garden courtyard", "Built-in wardrobes", "Communal laundry", "Bike storage"]
      },
      specifications: { buildYear: 2024, lotSize: "N/A", floorArea: "45 sqm" }
    });

    await this.createProperty({
      category: "residential",
      type: "apartment-blocks",
      subtype: "second-floor-2bed", 
      name: "Second Floor 2-Bed Premium",
      description: "Premium second-floor 2-bedroom apartment with unobstructed cloud views and luxury finishes. Features expansive windows and private balcony access.",
      shortDescription: "Premium apartments with cloud views",
      price: "$620,000",
      status: "available", 
      exteriorImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
      interiorImages: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      floorPlanImages: ["/api/placeholder/800/600"],
      interiorVideos: [],
      features: ["Unobstructed cloud views", "Private balcony", "Luxury finishes", "Floor-to-ceiling windows", "Premium appliances", "Lift access"],
      floorPlanDetails: {
        totalArea: "85 sqm",
        bedrooms: 2,
        bathrooms: 2,
        garage: 1,
        features: ["Open-plan living/dining", "Master bedroom with ensuite", "Second bedroom with built-ins", "Private balcony with views", "European laundry", "Secure parking"]
      },
      specifications: { buildYear: 2024, lotSize: "N/A", floorArea: "85 sqm" }
    });
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
