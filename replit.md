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
  ✓ Transformed website to Ashumi Estates with real property data
  ✓ Integrated payment calculator starting with 10% deposit
  ✓ Added ecommerce booking functionality for property reservations
  ✓ Updated landing page with authentic Ashumi Estates information
  ✓ Database setup with PostgreSQL and proper schema migration
  ✓ Maintained original aesthetic while incorporating new features
  ✓ Added interactive property details and pricing from brochure
  ✓ Integrated commercial space images and redesigned Commercial page
  ✓ Added world-class commercial showcase with mall, offices, and retail spaces
  ✓ Enhanced UI/UX with comprehensive brochure data integration
  ✓ Added PropertyStats and AmenitiesShowcase components
  ✓ Implemented detailed payment plans and mortgage information
  ✓ Improved landing page with complete Ashumi Estates information
  ✓ Advanced UI/UX enhancements completed:
    - Interactive property map with hover zones
    - Property types grid with filtering and animations  
    - Testimonials carousel with auto-rotation
    - Floating action bar with expanded menu
    - Interior finish packages by Imbayedu designers
    - Enhanced navigation and scroll experience
    - World-class animations and micro-interactions
  ✓ Project migration completed successfully
- 2025-08-14: Major design system overhaul and brand implementation:
  ✓ Implemented beige/earth-tone color scheme throughout website
  ✓ Replaced custom logo with authentic Ashumi Estates logo image on all pages
  ✓ Removed "Above the Clouds" text from landing page title
  ✓ Added brand colors: 90% black (confidence), 70% black (sophistication)
  ✓ Redesigned entire CSS system with earth-warm, earth-beige, earth-sand themes
  ✓ Enhanced Residential page with dramatic background image hero section
  ✓ Completely redesigned property listings with commercial-style card layouts
  ✓ Added professional property cards with gradient backgrounds and pricing
  ✓ Implemented shadow effects and hover animations for visual appeal
  ✓ Added always-visible sticky calculator component for quick access
  ✓ Created eye-catching property type listings with real pricing data
  ✓ Enhanced Commercial page with Ashumi logo integration
  ✓ Maintained calculator visibility across residential and commercial pages
  ✓ Added interactive hover effects and micro-animations
  ✓ Integrated brand typography following clean, modern guidelines

## User Preferences
- Beige/earth-tone color scheme inspired by luxury real estate sites
- Ashumi Estates logo displayed on every page (flowing river forming 'ae')
- Clean, modern typography following brand guidelines (90% and 70% black colors)
- Always-visible calculator and function icons on residential pages
- Interactive and eye-catching property listings with real pricing
- Enhanced user experience with hover animations and micro-interactions
- Payment calculator for home buyers (starting with 10% deposit)
- Ecommerce booking system for properties
- Easy navigation UI with premium visual appeal

## Development Notes
- Uses in-memory storage (MemStorage) by default
- Assets stored in client/src/assets/
- Following fullstack_js development guidelines
- Server runs on port 5000 (required for Replit)