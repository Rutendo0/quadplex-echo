import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@/assets/clouds-hero.jpg";
import { motion } from "framer-motion";
import { ASHUMI_PROPERTIES } from "@shared/schema";
import PaymentCalculator from "@/components/PaymentCalculator";
import BookingModal from "@/components/BookingModal";
import PropertyStats from "@/components/PropertyStats";
import AmenitiesShowcase from "@/components/AmenitiesShowcase";
import InteractivePropertyMap from "@/components/InteractivePropertyMap";
import PropertyTypesGrid from "@/components/PropertyTypesGrid";
import FloatingActionBar from "@/components/FloatingActionBar";
import FinishPackages from "@/components/FinishPackages";
import { Calculator, Heart, ArrowDown, Play } from "lucide-react";
import AshumiLogo from "@/components/AshumiLogo";
import StickyCalculator from "@/components/StickyCalculator";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playingExperience, setPlayingExperience] = useState(false);
  const [experienceReady, setExperienceReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [calculationData, setCalculationData] = useState<any>(null);
  

  useEffect(() => {
    if (!loading) return;
    const total = 1300; // ms
    const started = Date.now();
    const tick = () => {
      const pct = Math.min(100, ((Date.now() - started) / total) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setLoading(false);
      } else {
        requestAnimationFrame(tick);
      }
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading]);

  useEffect(() => {
    if (playingExperience && videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } catch {}
    }
  }, [playingExperience]);

  useEffect(() => {
    if (!playingExperience || experienceReady) return;
    const id = setTimeout(() => setExperienceReady(true), 6000); // Faster timing
    return () => clearTimeout(id);
  }, [playingExperience, experienceReady]);

  const canonical = useMemo(() => (typeof window !== 'undefined' ? window.location.href : 'https://ashumi-estate.com'), []);

  const handleCalculatorOpen = (property: any) => {
    setSelectedProperty(property);
    setShowCalculator(true);
  };

  const handleBookingClick = (calcData: any) => {
    setCalculationData(calcData);
    setShowCalculator(false);
    setShowBooking(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Ashumi Estates</title>
        <meta name="description" content="Discover Ashumi Estates - a forward-thinking community on 20.6 ha with Gwebi River frontage and panoramic Parliament views. Quality homes, sustainable living, unmatched amenities." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Ashumi Estates" />
        <meta property="og:description" content="Premium master-planned lifestyle precinct in Harare's fastest-growing node. Experience quality, dignity, and independence." />
      </Helmet>

      {/* Hero background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Above the Clouds luxury residence sky view"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
      </div>

      {/* Ashumi Logo Header */}
      <div className="absolute top-8 left-8 z-10">
        <AshumiLogo size="lg" />
      </div>

      {/* Content */}
      <section className="container flex min-h-screen flex-col items-center justify-center gap-8">
        <header className="w-full text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight">
            Ashumi Estates
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A master-planned lifestyle precinct on 20.6 hectares featuring Gwebi River frontage, panoramic Parliament views, and homes priced accessibly with unmatched amenities and professional management.
          </p>
          
          {/* Key Stats Bar */}
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="font-bold text-xl" style={{ color: 'hsl(var(--earth-gold))' }}>593</div>
              <div className="text-muted-foreground">Total Units</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl" style={{ color: 'hsl(var(--earth-brown))' }}>20.6 ha</div>
              <div className="text-muted-foreground">Master-Planned</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl" style={{ color: 'hsl(var(--ashumi-black-70))' }}>15%</div>
              <div className="text-muted-foreground">Deposit Only</div>
            </div>
          </motion.div>
        </header>

        <div className="w-full max-w-md">
          {loading ? (
            <motion.div 
              className="text-center select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-4xl md:text-6xl font-serif mb-8 tracking-wider" aria-live="polite">
                {Math.round(progress)}%
              </div>
              <div className="flex justify-center items-center space-x-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Loading</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center space-y-6"
            >
              {/* Main Enter Experience Button */}
              <motion.button
                className="group relative overflow-hidden"
                onMouseDown={() => {
                  setPlayingExperience(true);
                  setExperienceReady(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-12 py-6 text-white hover:bg-white/20 transition-all duration-300">
                  <div className="text-lg font-medium tracking-[0.2em] uppercase">
                    {'Enter experience'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
                <p className="text-xs text-white/60 mt-2 tracking-wider">Press & Hold</p>
              </motion.button>

              {/* Enter Without Sound Option */}
              <motion.button
                onClick={() => {
                  setPlayingExperience(true);
                  setExperienceReady(false);
                }}
                className="text-white/60 hover:text-white/80 text-sm tracking-wider transition-colors duration-300 underline-offset-4 hover:underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Enter without sound
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Clean Cinematic Experience */}
      {playingExperience && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* Seamless Cloud to Community Transition */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {/* Community aerial view - Base layer */}
            <div 
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: "url(https://planning-org-uploaded-media.s3.amazonaws.com/image/9fab9700-599b-4e60-82dc-42f1fbea185dCluster-Residential-Community.jpg)",
                filter: "brightness(1.0) contrast(1.1) saturate(1.0)"
              }}
            />

            {/* Clouds overlay that fades out seamlessly */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
            >
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  filter: "brightness(0.9) contrast(1.1) saturate(0.9)",
                  mixBlendMode: "normal"
                }}
              />
              {/* Gradient to blend clouds naturally into community */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Final overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-sky-100/20" />
          </motion.div>

          {/* Beautiful Centered Navigation Buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto px-6">
              <Link href="/residential">
                <motion.div
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 min-w-[280px]"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center text-white">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3">Residential</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      593 units: Studios to 4-bed homes, duplexes & penthouses from $120,000-$220,000
                    </p>
                    <div className="text-xs text-white/60 space-y-1">
                      <div>• 15% off-plan deposits available</div>
                      <div>• Direct Gwebi River frontage</div>
                      <div>• International-standard materials</div>
                      <div>• One-year workmanship warranty</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
              
              <Link href="/commercial">
                <motion.div
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 min-w-[280px]"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center text-white">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3">Commercial</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      Complete work-live-play ecosystem with integrated lifestyle amenities
                    </p>
                    <div className="text-xs text-white/60 space-y-1">
                      <div>• Food Town curated dining</div>
                      <div>• Innovation Hub with mentorship</div>
                      <div>• Riverfront promenade & green power</div>
                      <div>• Co-working spaces for entrepreneurs</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
            </div>
          </motion.div>






        </motion.div>
      )}

      {/* Detailed Information Sections - Show after cinematic experience */}
      {experienceReady && (
        <>
          {/* Property Statistics Section */}
          <section id="detailed-info" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <PropertyStats />
            </div>
          </section>

          {/* Interactive Property Map */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <InteractivePropertyMap />
            </div>
          </section>

          {/* Property Types Grid */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <PropertyTypesGrid onPropertySelect={handleCalculatorOpen} />
            </div>
          </section>

          {/* Amenities Showcase */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <AmenitiesShowcase />
            </div>
          </section>


          {/* Payment Plans & Mortgage Information */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Payment Options</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Make homeownership accessible with our flexible off-plan deposits and comprehensive mortgage arrangements.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Off-Plan Payment Structure */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Off-Plan Payment Structure</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">Booking Deposit</span>
                      <span className="text-blue-600 font-bold">15%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">At Foundation</span>
                      <span className="text-blue-600 font-bold">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">At Roof Lock-up</span>
                      <span className="text-blue-600 font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">At Completion</span>
                      <span className="text-blue-600 font-bold">30%</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Includes:</strong> One-year workmanship warranty & international-standard materials
                    </p>
                  </div>
                </motion.div>

                {/* Mortgage Example */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-green-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Mortgage Example</h3>
                  <div className="text-sm text-gray-600 mb-4">4-Bed Double-Storey House ($220,000)</div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">Property Price</span>
                      <span className="text-green-600 font-bold">$220,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">20% Deposit</span>
                      <span className="text-green-600 font-bold">$44,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">Loan Principal</span>
                      <span className="text-green-600 font-bold">$176,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="font-medium">Monthly Payment (12yr @ 8%)</span>
                      <span className="text-green-600 font-bold">$2,156</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Available:</strong> Local USD-indexed & Diaspora arrangements (UK, Australia, USA)
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 mr-4"
                  onClick={() => {
                    const sampleProperty = {
                      name: "4-Bed Double-Storey Home",
                      price: 220000
                    };
                    handleCalculatorOpen(sampleProperty);
                  }}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Payment
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600">
                  Schedule Site Visit
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Visit Us Today</h2>
                <div className="max-w-2xl mx-auto space-y-3">
                  <p className="text-lg">ZB Centre, 4th Floor</p>
                  <p className="text-lg">Corner 1st Street & Kwame Nkrumah Avenue</p>
                  <p className="text-lg">Harare, Zimbabwe</p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    info@griafrica.com
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    www.ashumiestates.com
                  </Button>
                </div>

                <p className="mt-8 text-gray-400">
                  Innovation-driven solutions for the Future of Africa's Growth
                </p>
              </motion.div>
            </div>
          </section>

          {/* Interior Finish Packages */}
          <FinishPackages />

        </>
      )}

      {/* Floating Action Bar */}
      <FloatingActionBar 
        onCalculatorClick={() => {
          const sampleProperty = {
            name: "4-Bed Double-Storey Home",
            price: 220000
          };
          handleCalculatorOpen(sampleProperty);
        }} 
      />

      {/* Sticky Calculator for Quick Access */}
      <StickyCalculator showOnPages={['/']} />
    </main>
  );
};

export default Index;
