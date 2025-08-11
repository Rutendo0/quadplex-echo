import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { PressHoldButton } from "@/components/PressHoldButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/clouds-hero.jpg";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);

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
          {!entered ? (
            loading ? (
              <div className="text-center select-none">
                <div className="text-2xl md:text-3xl font-serif mb-6" aria-live="polite">
                  {Math.round(progress)}%
                </div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">Loading</p>
              </div>
            ) : (
              <PressHoldButton onComplete={() => setEntered(true)} />
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-enter">
              <Link to="/residential" className="group block rounded-lg border bg-card/50 backdrop-blur-sm p-8 hover-scale">
                <h3 className="text-2xl font-serif">Residential</h3>
                <p className="mt-2 text-muted-foreground">Private sanctuary in the clouds.</p>
                <div className="mt-6"><Button variant="hero">Explore</Button></div>
              </Link>
              <Link to="/commercial" className="group block rounded-lg border bg-card/50 backdrop-blur-sm p-8 hover-scale">
                <h3 className="text-2xl font-serif">Commercial</h3>
                <p className="mt-2 text-muted-foreground">Elevated spaces for modern business.</p>
                <div className="mt-6"><Button variant="hero">Explore</Button></div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Quadplex 80 — Above the Clouds",
          url: canonical,
          description: "Rise above the city to your private sanctuary in the clouds.",
        })}
      </script>
    </main>
  );
};

export default Index;
