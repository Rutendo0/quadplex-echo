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

      {/* Clean Cinematic Experience */}
      {playingExperience && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* Cloud to Community Transition */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            {/* Initial clouds view */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  filter: "brightness(0.8) contrast(1.1) saturate(0.9)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 via-blue-200/10 to-transparent" />
            </motion.div>

            {/* Community aerial view reveal */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, y: "20vh" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 2, ease: "easeOut" }}
            >
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://planning-org-uploaded-media.s3.amazonaws.com/image/9fab9700-599b-4e60-82dc-42f1fbea185dCluster-Residential-Community.jpg)",
                  filter: "brightness(1.0) contrast(1.1) saturate(1.0)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
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
                    <p className="text-white/80 text-sm leading-relaxed">
                      Luxury apartments & homes with breathtaking aerial views
                    </p>
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
                    <p className="text-white/80 text-sm leading-relaxed">
                      Premium office spaces & retail locations with city views
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
            </div>
          </motion.div>






        </motion.div>
      )}
    </main>
  );
};

export default Index;
