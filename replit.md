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
- Routing system converted to Wouter as per Replit guidelines
- All dependencies installed and LSP errors resolved
- Application running on port 5000

## User Preferences
*None specified yet*

## Development Notes
- Uses in-memory storage (MemStorage) by default
- Assets stored in client/src/assets/
- Following fullstack_js development guidelines
- Server runs on port 5000 (required for Replit)