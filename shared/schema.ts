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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

// Property type definitions for the hierarchical structure
export const PROPERTY_STRUCTURE = {
  residential: {
    'single-storey': {
      name: 'Single Storey Stand Alone',
      subtypes: ['3-bed', '4-bed']
    },
    'single-storey-duplex': {
      name: 'Single Storey Duplexes', 
      subtypes: ['3-bed', '4-bed']
    },
    'double-storey-duplex': {
      name: 'Double Storey Duplexes',
      subtypes: ['3-bed', '4-bed'] 
    },
    'apartment-blocks': {
      name: 'Three Story Apartment Blocks',
      subtypes: ['ground-floor-studio', 'first-floor-1bed', 'second-floor-2bed']
    }
  },
  commercial: {
    'malls': {
      name: 'Shopping Malls',
      subtypes: ['retail-space', 'food-court', 'anchor-store']
    },
    'ground-play-office': {
      name: 'Ground Play Office',
      subtypes: ['small-office', 'medium-office', 'large-office']
    },
    'others': {
      name: 'Other Commercial Spaces',
      subtypes: ['warehouse', 'mixed-use', 'specialized']
    }
  }
} as const;
