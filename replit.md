# Quadplex 80 - Real Estate Website

## Project Overview
A modern real estate website for Quadplex 80, featuring luxury residential and commercial properties "above the clouds". Successfully migrated from Lovable to Replit environment.

## Architecture
- **Frontend**: React with Vite, using Wouter for routing (converted from React Router)
- **Backend**: Express.js server with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for data fetching
- **Database**: PostgreSQL with Drizzle ORM (basic user schema included)

## Key Features
- Residential property listings (apartments, duplex, single-storey, others)
- Commercial space listings (malls, ground-play office, others)
- Property detail pages with inquiry forms
- Responsive design with hero sections and animations
- SEO optimization with react-helmet-async

## Tech Stack
- React 18
- TypeScript
- Wouter (routing)
- Tailwind CSS + shadcn/ui
- TanStack Query
- Framer Motion (animations)
- Express.js
- PostgreSQL + Drizzle ORM

## Migration Changes
- Converted routing from React Router DOM to Wouter
- Fixed component imports (InquiryForm)
- Installed missing dependencies: react-router-dom, react-helmet-async, sonner
- Adapted for Replit environment

## Recent Changes
- 2025-01-12: Successfully migrated from Lovable to Replit
- Premium UI/UX implementation with industry-leading design
- Added comprehensive property data with real pricing
- Enhanced CSS animations and glass morphism effects
- 2025-01-12: Major feature expansion completed:
  ✓ World-class website design with white backgrounds and clean aesthetics
  ✓ Payment plan calculator with 10% deposit calculations
  ✓ Full ecommerce booking functionality with Stripe integration
  ✓ Interactive floor plans and comprehensive property information
  ✓ Comprehensive property stats integration (170+ properties)
  ✓ Created ResidentialDetailNew.tsx with all world-class features
  ✓ Updated CSS system to match world-class real estate standards
  ✓ Integrated PaymentCalculator and BookingModal components
- 2025-08-12: Project migration to Replit environment completed:
  ✓ Installed missing tsx dependency for TypeScript execution
  ✓ Server successfully running on port 5000
  ✓ Added 4-bedroom single-story property images to public folder
  ✓ Created organized image structure in client/public/properties/
  ✓ Project verified and ready for development

## User Preferences
- World-class website aesthetic (reference: YouTube inspiration video)
- Clean white backgrounds with extensive text information
- Easy navigation UI
- Real property data with accurate pricing
- Payment calculator for home buyers
- Ecommerce booking system for properties

## Development Notes
- Uses in-memory storage (MemStorage) by default
- Assets stored in client/src/assets/
- Following fullstack_js development guidelines
- Server runs on port 5000 (required for Replit)