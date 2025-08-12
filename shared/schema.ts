import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Property categories and types schema
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // residential, commercial
  type: text("type").notNull(), // single-storey, double-storey, apartment, etc.
  subtype: text("subtype"), // 3-bed, 4-bed, ground-floor-studio, etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  exteriorImages: text("exterior_images").array().notNull().default([]),
  interiorImages: text("interior_images").array().notNull().default([]),
  interiorVideos: text("interior_videos").array().notNull().default([]),
  floorPlanImages: text("floor_plan_images").array().notNull().default([]),
  floorPlanDetails: json("floor_plan_details"), // JSON for detailed floor plan info
  price: text("price"), // price range or specific price
  features: text("features").array().notNull().default([]),
  specifications: json("specifications"), // JSON for detailed specs
  status: text("status").notNull().default("available"), // available, sold, reserved
});

// Property inquiries
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  inquiryType: text("inquiry_type").notNull().default("general"), // viewing, pricing, availability
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Property bookings and reservations
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  bookingType: text("booking_type").notNull(), // reservation, purchase
  depositAmount: integer("deposit_amount").notNull(), // in cents
  totalPrice: integer("total_price").notNull(), // in cents
  paymentPlan: json("payment_plan"), // payment schedule details
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Ashumi Estates property data based on brochure
export const ASHUMI_PROPERTIES = {
  // Residential Properties
  residential: {
    'single-storey-homes': {
      name: '3-Bed Single-Storey Homes',
      units: 10,
      type: 'Sale',
      price: 170000,
      description: 'Beautifully designed 3-bedroom single-storey homes with modern finishes and private gardens.'
    },
    'single-storey-duplex': {
      name: '3-Bed Single-Storey Duplexes', 
      units: 20,
      type: 'Sale',
      price: 150000,
      description: 'Contemporary 3-bedroom duplex units perfect for families, featuring shared amenities.'
    },
    'four-bed-single': {
      name: '4-Bed Single-Storey Homes',
      units: 33,
      type: 'Sale',
      price: 170000,
      description: 'Spacious 4-bedroom single-storey homes with premium fixtures and landscaped gardens.'
    },
    'double-storey-duplex': {
      name: '3-Bed Double-Storey Duplexes',
      units: 36,
      type: 'Sale',
      price: 220000,
      description: 'Elegant 3-bedroom double-storey duplex units with panoramic views.'
    },
    'four-bed-double': {
      name: '4-Bed Double-Storey Homes',
      units: 26,
      type: 'Sale',
      price: 220000,
      description: 'Luxurious 4-bedroom double-storey homes with modern architecture and premium amenities.'
    },
    'apartment-studios': {
      name: 'Ground-Floor Studios',
      units: 252,
      type: 'Rental',
      size: '40 m²',
      description: 'Compact studios with private garden access, aluminium sliding doors, and en-suite bathroom.'
    },
    'apartment-one-bed': {
      name: 'First-Floor 1-Bedrooms',
      units: 144,
      type: 'Rental',
      size: '55–70 m² + 10 m² balcony',
      description: 'Modern one-bedroom apartments with kitchenette, courtyard views, and covered balcony.'
    },
    'apartment-penthouse': {
      name: 'Second-Floor 2-3 Bedrooms (Penthouse)',
      units: 72,
      type: 'Sale',
      price: 120000,
      size: '100 m² + 33 m² rooftop terrace',
      description: 'Exclusive penthouse residences with panoramic views and premium finishes.'
    }
  },
  // Commercial Properties  
  commercial: {
    'retail-services': {
      name: 'Retail & Services',
      description: 'Supermarket, cafés, pharmacy, fuel station, and daily-needs shops.'
    },
    'office-suites': {
      name: 'Office Suites & Co-Work',
      description: 'Professional workspace for telecommuters and entrepreneurs with high-speed connectivity.'
    },
    'innovation-hub': {
      name: 'Innovation Hub',
      description: 'Mentorship programs and networking space for entrepreneurs and creators.'
    }
  },
  // Community Amenities
  amenities: {
    recreation: [
      'Children\'s play areas',
      'Multi-use sports courts', 
      'Community football pitch',
      'Clubhouse with swimming pool',
      'Gym and event rooms',
      'Rooftop lounge'
    ],
    green_spaces: [
      'Walking trails',
      'Picnic lawns',
      'Native landscaping',
      'Riverfront access',
      'Gwebi River frontage'
    ],
    convenience: [
      'On-site clinic',
      'Fuel station & drive-through',
      'Food Town (curated food court)',
      'Solar-generated electricity',
      'Professional management'
    ]
  }
} as const;
