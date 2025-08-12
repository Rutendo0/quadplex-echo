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
    const id = setTimeout(() => setExperienceReady(true), 8000);
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

      {/* Experience section with video and selection */}
      <section id="experience" className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
          >
            <source src="/videos/clouds.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        </div>

        <div className="container">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Explore the Community</h2>
            <p className="mt-2 text-muted-foreground">Choose your path to elevated living or modern business.</p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/residential" className="group block rounded-lg border bg-card/60 backdrop-blur-md p-8 hover-scale">
              <motion.h3 whileHover={{ y: -2 }} className="text-2xl font-serif">Residential</motion.h3>
              <p className="mt-2 text-muted-foreground">Private sanctuary in the clouds.</p>
              <div className="mt-6"><Button variant="hero">Enter</Button></div>
            </Link>
            <Link to="/commercial" className="group block rounded-lg border bg-card/60 backdrop-blur-md p-8 hover-scale">
              <motion.h3 whileHover={{ y: -2 }} className="text-2xl font-serif">Commercial</motion.h3>
              <p className="mt-2 text-muted-foreground">Elevated spaces for modern business.</p>
              <div className="mt-6"><Button variant="hero">Enter</Button></div>
            </Link>
          </div>
        </div>
      </section>
      {playingExperience && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            autoPlay
            onEnded={() => setExperienceReady(true)}
          >
            <source src="/videos/clouds.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/60" />

          <div className="pointer-events-none absolute inset-0">
            {[0,1,2,3,4,5].map((i) => (
              <motion.span
                key={i}
                className="absolute block h-1 w-4 bg-foreground/50 rounded-full"
                style={{ top: `${10 + i * 12}%` } as React.CSSProperties}
                initial={{ x: "-10vw", y: 0, rotate: 0, opacity: 0.6 }}
                animate={{ x: "110vw", y: [0, -8, 0], rotate: [0, 6, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: experienceReady ? 1 : 0, y: experienceReady ? 0 : 10 }}
            className="absolute inset-x-0 bottom-12"
          >
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/residential" className="group block rounded-lg border bg-card/70 backdrop-blur-md p-6 hover-scale">
                <h3 className="text-2xl font-serif">Residential</h3>
                <p className="mt-1 text-muted-foreground">Private sanctuary in the clouds.</p>
              </Link>
              <Link to="/commercial" className="group block rounded-lg border bg-card/70 backdrop-blur-md p-6 hover-scale">
                <h3 className="text-2xl font-serif">Commercial</h3>
                <p className="mt-1 text-muted-foreground">Elevated spaces for modern business.</p>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default Index;
