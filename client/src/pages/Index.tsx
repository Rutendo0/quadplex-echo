import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@/assets/clouds-hero.jpg";
import { motion } from "framer-motion";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playingExperience, setPlayingExperience] = useState(false);
  const [experienceReady, setExperienceReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  

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

  const canonical = useMemo(() => (typeof window !== 'undefined' ? window.location.href : 'https://quadplex80.com'), []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Above the Clouds | Quadplex 80</title>
        <meta name="description" content="Rise above the city to your private sanctuary in the clouds. Quadplex 80 — experience endless horizons." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Above the Clouds | Quadplex 80" />
        <meta property="og:description" content="Rise above the city to your private sanctuary in the clouds." />
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

      {/* Content */}
      <section className="container flex min-h-screen flex-col items-center justify-center gap-8">
        <header className="w-full text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight">
            Above The Clouds — Quadplex 80
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Rise above the hustle and bustle of the city and escape to your private sanctuary in the clouds. Experience a world of endless horizons.
          </p>
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

      {/* Professional Cinematic Experience */}
      {playingExperience && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* Stage 1: High altitude clouds view */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.5, opacity: 1 }}
            animate={{ 
              scale: [1.5, 1.2, 2.5],
              opacity: [1, 1, 0],
              y: [0, 0, "50vh"]
            }}
            transition={{ 
              duration: 4,
              times: [0, 0.6, 1],
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div 
              className="h-full w-full bg-cover bg-center filter"
              style={{
                backgroundImage: `url(${heroImage})`,
                filter: "brightness(0.7) contrast(1.1) saturate(0.8)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-blue-300/10 to-transparent" />
            
            {/* Cloud particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, 1.2, 0.8],
                    opacity: [0.3, 0.6, 0]
                  }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Stage 2: Descent through clouds */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.2, 1.5] }}
            transition={{ 
              duration: 3,
              delay: 2,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut"
            }}
          >
            <div className="h-full w-full bg-gradient-to-b from-blue-200/30 via-green-100/20 to-green-200/40" />
            
            {/* Descent speed lines */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px bg-white/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    height: "100%",
                  }}
                  animate={{
                    y: ["-100vh", "100vh"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2 + Math.random() * 2,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Stage 3: Community reveal with professional 3D effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: "100vh", rotateX: 45, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{ 
              duration: 2.5,
              delay: 4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div
              className="h-full w-full relative"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, delay: 4.5, ease: "easeOut" }}
            >
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  filter: "brightness(1.1) contrast(1.2) saturate(1.1)"
                }}
              />
              
              {/* Professional overlay with depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Animated grid for 3D community layout */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 5.5, duration: 1 }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="communityGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#communityGrid)" />
                </svg>
              </motion.div>

              {/* Community zones with professional markers */}
              <div className="absolute inset-0">
                {[
                  { x: 30, y: 40, label: "Residential", color: "emerald" },
                  { x: 65, y: 35, label: "Commercial", color: "blue" },
                  { x: 45, y: 60, label: "Recreation", color: "amber" },
                  { x: 25, y: 75, label: "Gardens", color: "green" },
                  { x: 70, y: 70, label: "Amenities", color: "purple" }
                ].map((zone, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 5.5 + i * 0.3, duration: 0.6, type: "spring" }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className={`w-4 h-4 bg-${zone.color}-400 rounded-full shadow-lg`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className={`absolute w-8 h-8 border-2 border-${zone.color}-400/50 rounded-full`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                        {zone.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Flying elements for atmosphere */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: -100, y: `${20 + i * 15}%`, opacity: 0 }}
                animate={{ 
                  x: "110vw", 
                  y: [`${20 + i * 15}%`, `${15 + i * 15}%`, `${25 + i * 15}%`],
                  opacity: [0, 0.7, 0]
                }}
                transition={{ 
                  duration: 8 + i,
                  delay: 1 + i * 0.4,
                  ease: "easeInOut"
                }}
              >
                <div className="w-6 h-2 bg-white/60 rounded-full blur-sm" />
              </motion.div>
            ))}
          </div>

          {/* Final Navigation Buttons */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 7, duration: 1, ease: "easeOut" }}
          >
            <div className="flex space-x-6">
              <Link href="/residential">
                <motion.button
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-8 py-4 text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-medium tracking-wider">Residential</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <Link href="/commercial">
                <motion.button
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-8 py-4 text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-medium tracking-wider">Commercial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </div>
            
            <motion.p
              className="text-center text-white/60 text-sm mt-4 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8, duration: 1 }}
            >
              Explore your future above the clouds
            </motion.p>
          </motion.div>

          {/* Floating particles for magical effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Community Title and Description */}
          <motion.div
            className="absolute inset-x-0 top-1/3 text-center text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: experienceReady ? 0 : 1, y: experienceReady ? -20 : 0 }}
            transition={{ duration: 1, delay: 4.5 }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 4.8 }}
            >
              Quadplex 80
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 5.2 }}
            >
              A sanctuary above the clouds where luxury meets tranquility
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: experienceReady ? 1 : 0, 
              y: experienceReady ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-x-0 bottom-16 z-20"
          >
            <div className="container max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                  Choose Your Experience
                </h3>
                <p className="text-white/70">
                  Discover your perfect space in the clouds
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Link 
                    to="/residential" 
                    className="group block rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40"
                  >
                    <div className="text-center">
                      <h4 className="text-2xl md:text-3xl font-serif text-white mb-3">
                        Residential
                      </h4>
                      <p className="text-white/80 mb-6">
                        Private sanctuaries designed for elevated living
                      </p>
                      <div className="inline-flex items-center text-white/90 group-hover:text-white transition-colors">
                        <span className="mr-2">Explore Homes</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <Link 
                    to="/commercial" 
                    className="group block rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40"
                  >
                    <div className="text-center">
                      <h4 className="text-2xl md:text-3xl font-serif text-white mb-3">
                        Commercial
                      </h4>
                      <p className="text-white/80 mb-6">
                        Premium business spaces with inspiring views
                      </p>
                      <div className="inline-flex items-center text-white/90 group-hover:text-white transition-colors">
                        <span className="mr-2">Explore Spaces</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Close experience button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => setPlayingExperience(false)}
                  className="text-white/60 hover:text-white/80 transition-colors text-sm"
                >
                  Close Experience
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default Index;
