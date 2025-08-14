import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import AshumiLogo from "@/components/AshumiLogo";
import StickyCalculator from "@/components/StickyCalculator";
import { Calculator, Home, MapPin, Star, TrendingUp, Users } from "lucide-react";
const Residential = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://ashumi-estate.com/residential';

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

      <section className="container min-h-[60vh] flex items-end pb-16">
        <div className="max-w-3xl animate-enter">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold">Residential</h1>
          <p className="mt-4 text-muted-foreground">
            Serenity, privacy, and panoramic horizons. Crafted interiors and timeless materials elevate everyday living.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="hero" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>Explore</Button>
            <a href="/"><Button variant="outline">Back Home</Button></a>
          </div>
        </div>
      </section>

      <section id="explore" className="container py-24 space-y-16">
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
              <Button className="bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                View Floor Plans
              </Button>
              <Button variant="outline" className="border-[hsl(var(--earth-brown))] text-[hsl(var(--earth-brown))] hover:bg-[hsl(var(--earth-sand))]">
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
          <div className="text-center">
            <h2 className="text-4xl font-serif mb-4" style={{ color: 'hsl(var(--ashumi-black-90))' }}>Choose Your Perfect Home</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From intimate studios to spacious family estates, discover homes designed for every lifestyle
            </p>
          </div>
          
          {/* Single Storey Stand Alone */}
          <div className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/residential/single-storey/3-bed" data-testid="link-single-storey-3bed">
                <motion.div 
                  className="ashumi-interactive-hover property-card group block rounded-xl p-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>3-Bedroom Villa</h4>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: 'hsl(var(--earth-gold))' }}>$185,000</div>
                      <div className="text-sm text-muted-foreground">Starting from</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">Luxury single-storey living with panoramic views and private gardens</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>📐 142m²</span>
                    <span>🛏️ 3 Beds</span>
                    <span>🚿 2 Baths</span>
                    <span>🚗 2 Parking</span>
                  </div>
                  <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                    View Details & Calculate Payment
                  </Button>
                </motion.div>
              </Link>
              <Link to="/residential/single-storey/4-bed" data-testid="link-single-storey-4bed">
                <motion.div 
                  className="ashumi-interactive-hover property-card group block rounded-xl p-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold" style={{ color: 'hsl(var(--ashumi-black-90))' }}>4-Bedroom Estate</h4>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: 'hsl(var(--earth-gold))' }}>$235,000</div>
                      <div className="text-sm text-muted-foreground">Starting from</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">Executive family homes with premium amenities and sky views</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>📐 168m²</span>
                    <span>🛏️ 4 Beds</span>
                    <span>🚿 3 Baths</span>
                    <span>🚗 2 Parking</span>
                  </div>
                  <Button className="w-full bg-[hsl(var(--earth-gold))] hover:bg-[hsl(var(--earth-brown))] text-white">
                    View Details & Calculate Payment
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Single Storey Duplexes */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Single Storey Duplexes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/residential/single-storey-duplex/3-bed" className="property-card group block rounded-lg p-6" data-testid="link-duplex-3bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">3-Bedroom Duplex</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Modern duplex living with shared amenities</p>
              </Link>
              <Link to="/residential/single-storey-duplex/4-bed" className="property-card group block rounded-lg p-6" data-testid="link-duplex-4bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">4-Bedroom Duplex</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Spacious duplex homes with private gardens</p>
              </Link>
            </div>
          </div>

          {/* Double Storey Duplexes */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Double Storey Duplexes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/residential/double-storey-duplex/3-bed" className="property-card group block rounded-lg p-6" data-testid="link-double-duplex-3bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">3-Bedroom Double Duplex</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Two-storey duplex with elevated living spaces</p>
              </Link>
              <Link to="/residential/double-storey-duplex/4-bed" className="property-card group block rounded-lg p-6" data-testid="link-double-duplex-4bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">4-Bedroom Double Duplex</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Premium double-storey homes with sky views</p>
              </Link>
            </div>
          </div>

          {/* Three Story Apartment Blocks */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Three Story Apartment Blocks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/residential/apartment-blocks/ground-floor-studio" className="property-card group block rounded-lg p-6" data-testid="link-studio">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">Ground Floor Studio</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Modern studios with garden access</p>
              </Link>
              <Link to="/residential/apartment-blocks/first-floor-1bed" className="property-card group block rounded-lg p-6" data-testid="link-1bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">First Floor 1-Bed</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Elevated apartments with balconies</p>
              </Link>
              <Link to="/residential/apartment-blocks/second-floor-2bed" className="property-card group block rounded-lg p-6" data-testid="link-2bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">Second Floor 2-Bed</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Premium apartments with cloud views</p>
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* Sticky Calculator for Residential */}
      <StickyCalculator showOnPages={['/residential']} />
    </main>
  );
};

export default Residential;
