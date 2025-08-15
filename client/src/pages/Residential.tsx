import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import AshumiLogo from "@/components/AshumiLogo";
import StickyCalculator from "@/components/StickyCalculator";
import { Calculator, Home, MapPin, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
const Residential = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://ashumi-estate.com/residential';
  const [showFloorplanModal, setShowFloorplanModal] = useState(false);
  const [showVirtualTourModal, setShowVirtualTourModal] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Residential | Ashumi Estate</title>
        <meta name="description" content="Discover refined residential living at Ashumi Estate." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="absolute inset-0 -z-10">
        <img src={heroImage} alt="Residential sky view" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      {/* Ashumi Logo Header */}
      <div className="absolute top-8 left-8 z-10">
        <AshumiLogo size="lg" />
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
            alt="Luxury residential development" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          {/* Classic top-right quick nav */}
          <div className="absolute top-6 right-6 hidden md:flex gap-3 z-10">
            <Link href="/commercial">
              <Button size="sm" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))] hover:bg-[hsl(var(--earth-sand))]">View Commercial</Button>
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
              Residential Living
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Serenity, privacy, and panoramic horizons. Crafted interiors and timeless materials elevate everyday living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white px-8 py-3"
                onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Properties
              </Button>
              <Link to="/">
                <Button size="lg" className="bg-[hsl(var(--earth-beige))] text-[hsl(var(--ashumi-black-90))] hover:bg-[hsl(var(--earth-sand))] px-8 py-3">
                  Back Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floorplan Modal */}
      {showFloorplanModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowFloorplanModal(false)}>
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Floorplans</h3>
              <Button variant="outline" size="sm" onClick={() => setShowFloorplanModal(false)}>Close</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Using available public images */}
              <img src="/floorplans/4-Bedroom.png" alt="4-bed floorplan" className="w-full rounded border" />
              <img src="/floorplans/4-bedroom1.png" alt="4-bed floorplan 2" className="w-full rounded border" />
              <img src="/floorplans/3Bedroom.png" alt="3-bed floorplan" className="w-full rounded border" />
              <img src="/floorplans/plan4.jpg" alt="plan" className="w-full rounded border" />
            </div>
          </div>
        </div>
      )}

      {/* Virtual Tour Modal */}
      {showVirtualTourModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowVirtualTourModal(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Virtual Tour</h3>
              <Button variant="outline" size="sm" onClick={() => setShowVirtualTourModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <video src="/properties/videos/interior-walkthrough-1.mp4" controls className="w-full rounded border" />
              <video src="/properties/videos/interior-walkthrough-2.mp4" controls className="w-full rounded border" />
            </div>
          </div>
        </div>
      )}

      <section id="explore" className="py-20 bg-[hsl(var(--earth-sand))]">
        <div className="container mx-auto px-6">
        {/* Key Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center premium-card p-6 rounded-xl">
            <div className="flex justify-center mb-3">
              <Home className="w-8 h-8" style={{ color: 'hsl(var(--earth-gold))' }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>400+</div>
            <p className="text-sm text-muted-foreground">Residential Units</p>
          </div>
          <div className="text-center premium-card p-6 rounded-xl">
            <div className="flex justify-center mb-3">
              <Users className="w-8 h-8" style={{ color: 'hsl(var(--earth-brown))' }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>98%</div>
            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
          </div>
          <div className="text-center premium-card p-6 rounded-xl">
            <div className="flex justify-center mb-3">
              <Star className="w-8 h-8" style={{ color: 'hsl(var(--earth-gold))' }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Premium</div>
            <p className="text-sm text-muted-foreground">Quality Living</p>
          </div>
          <div className="text-center premium-card p-6 rounded-xl">
            <div className="flex justify-center mb-3">
              <TrendingUp className="w-8 h-8" style={{ color: 'hsl(var(--earth-brown))' }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>15%</div>
            <p className="text-sm text-muted-foreground">ROI Growth</p>
          </div>
        </motion.div>

        {/* Elevated Living Section */}
        <article className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 premium-card p-8 rounded-xl">
            <h2 className="text-3xl font-serif mb-4" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Elevated Living</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expansive glass, soft tones, and curated textures frame the skyline beyond. 
              Each residence is thoughtfully designed to maximize natural light, airflow, 
              and the breathtaking views that Ashumi Estates offers.
            </p>
            <div className="mt-6 flex gap-3">
              <Button 
                className="bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white"
                onClick={() => setShowFloorplanModal(true)}
              >
                View Floor Plans
              </Button>
              <Button 
                variant="outline" 
                className="border-[hsl(var(--earth-brown))] text-[hsl(var(--earth-brown))] hover:bg-[hsl(var(--earth-sand))]"
                onClick={() => setShowVirtualTourModal(true)}
              >
                Virtual Tour
              </Button>
            </div>
          </div>
          <div className="premium-card p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6" style={{ color: 'hsl(var(--earth-gold))' }} />
              <h3 className="text-xl font-medium" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Premium Amenities</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--earth-gold))]"></div>
                <span className="text-muted-foreground">Private sky lounge with panoramic views</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--earth-gold))]"></div>
                <span className="text-muted-foreground">Wellness suite & fitness center</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--earth-gold))]"></div>
                <span className="text-muted-foreground">24/7 dedicated concierge service</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--earth-gold))]"></div>
                <span className="text-muted-foreground">Landscaped gardens & water features</span>
              </li>
            </ul>
          </div>
        </article>

        <article className="space-y-12">
            {/* Quick Browse Subnav */}
            <div className="sticky top-0 z-10 bg-[hsl(var(--earth-sand))]/80 backdrop-blur py-3 rounded-xl shadow-sm mb-6">
              <div className="container mx-auto px-6 flex flex-wrap justify-center gap-3">
                <a href="#single-storey">
                  <Button variant="outline" className="border-[hsl(var(--earth-brown))] text-[hsl(var(--earth-brown))] hover:bg-[hsl(var(--earth-sand))]">
                    Single Storey
                  </Button>
                </a>
                <a href="#double-storey">
                  <Button variant="outline" className="border-[hsl(var(--earth-brown))] text-[hsl(var(--earth-brown))] hover:bg-[hsl(var(--earth-sand))]">
                    Double Storey
                  </Button>
                </a>
                <a href="#apartments">
                  <Button variant="outline" className="border-[hsl(var(--earth-brown))] text-[hsl(var(--earth-brown))] hover:bg-[hsl(var(--earth-sand))]">
                    Apartments
                  </Button>
                </a>
              </div>
            </div>
          {/* Single Storey Stand Alone */}
          <div id="single-storey" className="space-y-6">
            <motion.h3 
              className="text-2xl font-medium flex items-center gap-3"
              style={{ color: 'hsl(var(--earth-brown))' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Home className="w-8 h-8" />
              Single Storey Stand Alone Homes
            </motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--earth-sand))] to-[hsl(var(--earth-beige))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-16 h-16" style={{ color: 'hsl(var(--earth-gold))' }} />
                  </div>
                  <div className="absolute top-4 left-4 bg-[hsl(var(--earth-gold))] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-[hsl(var(--ashumi-black-90))] px-3 py-1 rounded-full text-sm font-bold">
                    $185,000
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>3-Bedroom Villa</h4>
                    <div className="text-sm font-medium text-muted-foreground">142m²</div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Luxury single-storey living with panoramic views and private gardens designed for modern families.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h5 className="font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Features:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        3 bedrooms, 2 bathrooms
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Private garden
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        2 car parking
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Premium finishes
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[hsl(var(--earth-sand))] p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Deposit (10%)</span>
                      <span className="text-lg font-bold" style={{ color: 'hsl(var(--earth-brown))' }}>$18,500</span>
                    </div>
                  </div>
                  
                  <Link to="/residential/single-storey/3-bed" data-testid="link-single-storey-3bed">
                    <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      View Details & Calculate Payment
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--earth-beige))] to-[hsl(var(--earth-brown))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 left-4 bg-[hsl(var(--earth-gold))] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-[hsl(var(--ashumi-black-90))] px-3 py-1 rounded-full text-sm font-bold">
                    $235,000
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>4-Bedroom Estate</h4>
                    <div className="text-sm font-medium text-muted-foreground">168m²</div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Executive family homes with premium amenities and sky views designed for luxury living.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h5 className="font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Features:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        4 bedrooms, 3 bathrooms
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Double garage
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Large garden
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Executive finishes
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[hsl(var(--earth-sand))] p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Deposit (10%)</span>
                      <span className="text-lg font-bold" style={{ color: 'hsl(var(--earth-brown))' }}>$23,500</span>
                    </div>
                  </div>
                  
                  <Link to="/residential/single-storey/4-bed" data-testid="link-single-storey-4bed">
                    <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      View Details & Calculate Payment
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Double Storey Stand Alone Homes */}
          <div id="double-storey" className="space-y-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--ashumi-black-90))' }}>
                Double Storey Stand Alone Homes
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two-storey luxury homes with elevated living spaces and panoramic views
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--earth-sand))] to-[hsl(var(--earth-beige))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-16 h-16" style={{ color: 'hsl(var(--earth-brown))' }} />
                  </div>
                  <div className="absolute top-4 left-4 bg-[hsl(var(--earth-brown))] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Two-Storey
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-[hsl(var(--ashumi-black-90))] px-3 py-1 rounded-full text-sm font-bold">
                    $225,000
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>3-Bedroom Double Storey</h4>
                    <div className="text-sm font-medium text-muted-foreground">180m²</div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Elegant two-storey homes with separated living areas and elevated master suites.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h5 className="font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Features:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        3 bedrooms, 2.5 bathrooms
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Master suite upstairs
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Double garage
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Panoramic views
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[hsl(var(--earth-sand))] p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Deposit (10%)</span>
                      <span className="text-lg font-bold" style={{ color: 'hsl(var(--earth-brown))' }}>$22,500</span>
                    </div>
                  </div>
                  
                  <Link to="/residential/double-storey/3-bed" data-testid="link-double-storey-3bed">
                    <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      View Details & Calculate Payment
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--earth-beige))] to-[hsl(var(--earth-brown))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 left-4 bg-[hsl(var(--earth-brown))] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Executive
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-[hsl(var(--ashumi-black-90))] px-3 py-1 rounded-full text-sm font-bold">
                    $285,000
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-2xl font-bold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>4-Bedroom Double Storey</h4>
                    <div className="text-sm font-medium text-muted-foreground">220m²</div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Executive family homes with expansive living areas and luxury amenities across two floors.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h5 className="font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Features:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        4 bedrooms, 3.5 bathrooms
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Master suite with balcony
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Triple garage
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-[hsl(var(--earth-gold))] rounded-full mr-2"></div>
                        Executive finishes
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[hsl(var(--earth-sand))] p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Deposit (10%)</span>
                      <span className="text-lg font-bold" style={{ color: 'hsl(var(--earth-brown))' }}>$28,500</span>
                    </div>
                  </div>
                  
                  <Link to="/residential/double-storey/4-bed" data-testid="link-double-storey-4bed">
                    <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      View Details & Calculate Payment
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Apartment Living Section */}
          <div id="apartments" className="space-y-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--ashumi-black-90))' }}>
                Apartment Living
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Modern apartments with sky views and premium amenities
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-40 bg-gradient-to-br from-[hsl(var(--earth-sand))] to-[hsl(var(--earth-beige))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🏠</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[hsl(var(--earth-gold))] text-white px-2 py-1 rounded text-xs font-medium">
                    Studio
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Ground Floor Studio</h4>
                  <p className="text-sm text-muted-foreground mb-3">Modern studios with garden access</p>
                  <div className="text-lg font-bold" style={{ color: 'hsl(var(--earth-gold))' }}>From $45,000</div>
                  <Link to="/residential/apartment-blocks/ground-floor-studio" data-testid="link-studio">
                    <Button size="sm" className="w-full mt-3 bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-40 bg-gradient-to-br from-[hsl(var(--earth-beige))] to-[hsl(var(--earth-brown))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🏢</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[hsl(var(--earth-brown))] text-white px-2 py-1 rounded text-xs font-medium">
                    1-Bed
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--ashumi-black-90))' }}>First Floor 1-Bed</h4>
                  <p className="text-sm text-muted-foreground mb-3">Elevated apartments with balconies</p>
                  <div className="text-lg font-bold" style={{ color: 'hsl(var(--earth-gold))' }}>From $65,000</div>
                  <Link to="/residential/apartment-blocks/first-floor-1bed" data-testid="link-1bed">
                    <Button size="sm" className="w-full mt-3 bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-40 bg-gradient-to-br from-[hsl(var(--earth-sand))] to-[hsl(var(--earth-beige))]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🌅</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[hsl(var(--earth-brown))] text-white px-2 py-1 rounded text-xs font-medium">
                    2-Bed
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Second Floor 2-Bed</h4>
                  <p className="text-sm text-muted-foreground mb-3">Premium apartments with sky views</p>
                  <div className="text-lg font-bold" style={{ color: 'hsl(var(--earth-gold))' }}>From $85,000</div>
                  <Link to="/residential/apartment-blocks/second-floor-2bed" data-testid="link-2bed">
                    <Button size="sm" className="w-full mt-3 bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

        </article>
        </div>
      </section>



      {/* Sticky Calculator for Residential */}
      <StickyCalculator showOnPages={['/residential']} />
    </main>
  );
};

export default Residential;
