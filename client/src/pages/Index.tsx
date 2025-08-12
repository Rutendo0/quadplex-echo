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
            <div className="text-center select-none">
              <div className="text-2xl md:text-3xl font-serif mb-6" aria-live="polite">
                {Math.round(progress)}%
              </div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Loading</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Button
                variant="hero"
                className="h-12 px-8"
                onClick={() => {
                  setPlayingExperience(true);
                  setExperienceReady(false);
                }}
                aria-label="Enter Experience"
              >
                Enter Experience
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cinematic Experience Overlay */}
      {playingExperience && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Sky/Clouds Scene with zoom effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.5, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img
              src={heroImage}
              alt="Sky view from above clouds"
              className="h-full w-full object-cover filter blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-blue-300/20 to-transparent" />
            {/* Add moving cloud shadows */}
            <motion.div
              className="absolute inset-0"
              animate={{ 
                background: [
                  "radial-gradient(ellipse 800px 400px at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(ellipse 800px 400px at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(ellipse 800px 400px at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Flying Birds Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: -100, 
                  y: `${15 + i * 12}%`,
                  scale: 0.3,
                  opacity: 0
                }}
                animate={{ 
                  x: "110vw",
                  y: [`${15 + i * 12}%`, `${10 + i * 12}%`, `${20 + i * 12}%`, `${15 + i * 12}%`],
                  scale: [0.3, 0.8, 1, 0.6],
                  opacity: [0, 1, 0.8, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 10 + i * 0.7, 
                  delay: 0.5 + i * 0.4,
                  ease: "easeInOut"
                }}
              >
                <svg width="32" height="20" viewBox="0 0 32 20" className="text-white/80">
                  <path
                    d="M2 10c3-3 8-8 14-8s11 5 14 8c-3 3-8 8-14 8s-11-5-14-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 10l8-4 8 4-8 4-8-4z"
                    fill="currentColor"
                    opacity="0.4"
                  />
                  <path
                    d="M12 8l4-2 4 2v4l-4 2-4-2v-4z"
                    fill="currentColor"
                    opacity="0.2"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Descent Animation - Cinematic zoom down effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={{ scale: 2.5, y: "150vh", opacity: 0 }}
            transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
          >
            <div className="h-full w-full bg-gradient-to-b from-blue-300/40 via-blue-200/30 to-green-100/20" />
            {/* Cloud layers for depth */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)"
              }}
            />
          </motion.div>

          {/* Community Area Reveal with 3D perspective */}
          <motion.div
            className="absolute inset-0 overflow-hidden z-10"
            initial={{ y: "100vh", opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
          >
            <div className="h-full w-full relative">
              <motion.img
                src={heroImage}
                alt="Community area aerial view"
                className="h-full w-full object-cover brightness-120 contrast-110 saturate-110"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 4, ease: "easeOut" }}
              />
              {/* 3D community layout indicators */}
              <div className="absolute inset-0">
                {/* Building/area markers */}
                {[
                  { x: 25, y: 35, size: 8, label: "Residential Zone" },
                  { x: 65, y: 30, size: 12, label: "Commercial Hub" },
                  { x: 45, y: 55, size: 6, label: "Recreation" },
                  { x: 35, y: 70, size: 4, label: "Gardens" },
                  { x: 55, y: 75, size: 5, label: "Amenities" }
                ].map((area, i) => (
                  <motion.div
                    key={i}
                    className="absolute flex items-center justify-center"
                    style={{ 
                      left: `${area.x}%`, 
                      top: `${area.y}%`,
                      width: `${area.size}%`,
                      height: `${area.size * 0.6}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ delay: 4 + i * 0.3, duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-white/20 border border-white/40 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                    </div>
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white/80 text-xs font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4.5 + i * 0.3 }}
                    >
                      {area.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
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
