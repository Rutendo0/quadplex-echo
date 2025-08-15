import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Wifi, Car, Coffee, Shield, Star, Users, Building2, Store, Zap } from "lucide-react";
import { Link } from "wouter";
import AshumiLogo from "@/components/AshumiLogo";
import commercialExterior1 from "/properties/commercial/image5.jpeg";
import commercialExterior2 from "/properties/commercial/image1.jpeg";
import commercialOffice from "/properties/commercial/image2.jpeg";
import commercialRetail from "/properties/commercial/image3.jpeg";
import commercialInterior from "/properties/commercial/image6.jpeg";

const Commercial = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://ashumi-estate.com/commercial';

  const commercialSpaces = [
    {
      id: 1,
      title: "Ashumi Estates Mall",
      category: "Retail & Entertainment",
      image: commercialExterior1,
      description: "Modern shopping destination with iconic architecture featuring curved glass facades and premium retail spaces.",
      features: ["Food Court", "Cinema Complex", "Anchor Stores", "Parking for 500+ cars"],
      size: "50,000 sqm",
      status: "Under Development"
    },
    {
      id: 2,
      title: "Food Lovers Market",
      category: "Supermarket",
      image: commercialExterior2,
      description: "Flagship supermarket location with dedicated parking and modern retail facilities.",
      features: ["Fresh Produce", "Deli Section", "Bakery", "Pharmacy"],
      size: "3,500 sqm",
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "Office Suites",
      category: "Professional Offices",
      image: commercialOffice,
      description: "Contemporary office buildings with glass facades, landscaped courtyards, and modern amenities.",
      features: ["High-speed Internet", "Meeting Rooms", "Reception Areas", "Executive Parking"],
      size: "15,000 sqm",
      status: "Available"
    },
    {
      id: 4,
      title: "Innovation Hub",
      category: "Tech & Innovation",
      image: commercialInterior,
      description: "Modern interior spaces designed for tech companies and startups with flexible layouts.",
      features: ["Open Workspaces", "Conference Centers", "Co-working Areas", "Business Lounge"],
      size: "8,000 sqm",
      status: "Pre-Launch"
    }
  ];

  const amenities = [
    { icon: Wifi, title: "High-Speed Internet", description: "Fiber optic connectivity throughout" },
    { icon: Car, title: "Ample Parking", description: "500+ covered parking spaces" },
    { icon: Shield, title: "24/7 Security", description: "Professional security and CCTV monitoring" },
    { icon: Coffee, title: "Food Court", description: "Diverse dining options and cafes" },
    { icon: Building2, title: "Modern Design", description: "Contemporary architecture and interiors" },
    { icon: Store, title: "Retail Variety", description: "From supermarkets to specialty stores" }
  ];

  return (
    <main className="min-h-screen bg-[hsl(var(--earth-sand))]">
      <Helmet>
        <title>Commercial Spaces | Ashumi Estates</title>
        <meta name="description" content="Discover modern commercial spaces at Ashumi Estates - retail, office suites, and innovation hubs in Harare's fastest-growing node." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Commercial Spaces | Ashumi Estates" />
        <meta property="og:description" content="Premium commercial development with modern retail, office spaces, and business amenities." />
      </Helmet>

      {/* Ashumi Logo Header */}
      <div className="absolute top-8 left-8 z-10">
        <AshumiLogo size="lg" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src={commercialExterior1} 
            alt="Ashumi Estates Commercial Complex" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Classic top-right quick nav */}
          <div className="absolute top-6 right-6 hidden md:flex gap-3">
            <Link href="/">
              <Button size="sm" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))] hover:bg-[hsl(var(--earth-sand))]">Back Home</Button>
            </Link>
            <Link href="/residential">
              <Button size="sm" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))] hover:bg-[hsl(var(--earth-sand))]">View Residential</Button>
            </Link>
          </div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Commercial Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              World-class commercial spaces in Zimbabwe's most dynamic development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white px-8 py-3">
                Explore Opportunities
              </Button>
              <a href="/brochure.pdf" download>
                <Button size="lg" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))] hover:bg-[hsl(var(--earth-sand))] px-8 py-3">
                  Download Brochure
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commercial Spaces Grid */}
      <section className="py-20 bg-[hsl(var(--earth-sand))]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Commercial Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From retail destinations to professional office spaces, discover investment opportunities in Harare's premier commercial development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {commercialSpaces.map((space, index) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img 
                    src={space.image} 
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[hsl(var(--earth-brown))] text-white">
                    {space.status}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>{space.title}</h3>
                    <Badge variant="secondary" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))]">{space.size}</Badge>
                  </div>
                  
                  <p className="mb-4 text-sm font-medium" style={{ color: 'hsl(var(--earth-brown))' }}>
                    {space.category}
                  </p>
                  
                  <p className="mb-4 leading-relaxed text-[hsl(var(--ashumi-black-80))]">
                    {space.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {space.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-[hsl(var(--ashumi-black-70))]">
                          <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-[hsl(var(--earth-sand))]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Amenities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every commercial space comes with world-class amenities designed for modern business success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[hsl(var(--earth-beige))]">
                  <amenity.icon className="w-8 h-8" style={{ color: 'hsl(var(--earth-brown))' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--ashumi-black-90))' }}>{amenity.title}</h3>
                <p className="text-[hsl(var(--ashumi-black-70))]">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[hsl(var(--earth-brown))] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Invest?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Zimbabwe's most exciting commercial development. Contact our sales team for investment opportunities and space availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3 bg-[hsl(var(--earth-gold))] text-black hover:bg-[hsl(var(--earth-sand))]">
                Contact Sales Team
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[hsl(var(--earth-brown))] px-8 py-3">
                Schedule Site Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-[hsl(var(--earth-beige))]">
        <div className="container mx-auto px-6 text-center">
          <Link to="/">
            <Button variant="outline" className="mr-4">
              ← Back to Home
            </Button>
          </Link>
          <Link to="/residential">
            <Button variant="outline">
              View Residential →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Commercial;