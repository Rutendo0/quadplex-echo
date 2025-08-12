import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPropertySchema, insertInquirySchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Property structure route
  app.get("/api/property-structure", async (req, res) => {
    try {
      const structure = storage.getPropertyStructure();
      res.json(structure);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { category, type, subtype } = req.query;
      const properties = await storage.getProperties(
        category as string,
        type as string, 
        subtype as string
      );
      res.json(properties);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.json(property);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Inquiries routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.json(inquiry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const { propertyId } = req.query;
      const inquiries = await storage.getInquiries(
        propertyId ? parseInt(propertyId as string) : undefined
      );
      res.json(inquiries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // User routes (existing)
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Booking routes for ecommerce functionality
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const { propertyId } = req.query;
      const bookings = await storage.getBookings(
        propertyId ? parseInt(propertyId as string) : undefined
      );
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedBooking = await storage.updateBooking(id, updates);
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Placeholder for future Stripe integration
  app.post("/api/create-payment-intent", async (req, res) => {
    res.status(501).json({ 
      error: "Payment integration not configured. Stripe API keys needed." 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
