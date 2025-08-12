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
    
    // Initialize with sample properties
    this.initializeSampleProperties();
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
