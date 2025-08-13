import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
        <article className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 p-8 rounded-lg border bg-card/50 backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl font-serif">Elevated Living</h2>
            <p className="mt-2 text-muted-foreground">Expansive glass, soft tones, and curated textures frame the skyline beyond.</p>
          </div>
          <div className="p-8 rounded-lg border bg-card/50 backdrop-blur-sm animate-fade-in">
            <h3 className="font-medium">Amenities</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Private sky lounge</li>
              <li>Wellness suite</li>
              <li>Dedicated concierge</li>
            </ul>
          </div>
        </article>

        <article className="space-y-8">
          <h2 className="text-2xl font-serif">Property Types</h2>
          
          {/* Single Storey Stand Alone */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Single Storey Stand Alone</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/residential/single-storey/3-bed" className="property-card group block rounded-lg p-6" data-testid="link-single-storey-3bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">3-Bedroom Villa</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Luxury single-storey living with panoramic views</p>
              </Link>
              <Link to="/residential/single-storey/4-bed" className="property-card group block rounded-lg p-6" data-testid="link-single-storey-4bed">
                <motion.h4 whileHover={{ y: -2 }} className="text-lg font-medium">4-Bedroom Estate</motion.h4>
                <p className="mt-1 text-sm text-muted-foreground">Executive family homes with premium amenities</p>
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
    </main>
  );
};

export default Residential;
