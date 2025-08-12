import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Wifi, Car, Coffee, Shield, Star, Users, Building2, Store, Zap } from "lucide-react";
import { Link } from "wouter";
import commercialExterior1 from "@assets/image_1755032117599.png";
import commercialExterior2 from "@assets/image_1755032134655.png";
import commercialOffice from "@assets/image_1755032147406.png";
import commercialRetail from "@assets/image_1755032159378.png";
import commercialInterior from "@assets/image_1755032194653.png";

const Commercial = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://ashumiestates.com/commercial';

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
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>Commercial Spaces | Ashumi Estates</title>
        <meta name="description" content="Discover modern commercial spaces at Ashumi Estates - retail, office suites, and innovation hubs in Harare's fastest-growing node." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Commercial Spaces | Ashumi Estates" />
        <meta property="og:description" content="Premium commercial development with modern retail, office spaces, and business amenities." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={commercialExterior1} 
            alt="Ashumi Estates Commercial Complex" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
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
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Explore Opportunities
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commercial Spaces Grid */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img 
                    src={space.image} 
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                    {space.status}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{space.title}</h3>
                    <Badge variant="secondary">{space.size}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm font-medium text-blue-600">
                    {space.category}
                  </p>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {space.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {space.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
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
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
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
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Contact Sales Team
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Schedule Site Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-100">
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