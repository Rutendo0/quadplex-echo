import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
const Commercial = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://quadplex80.com/commercial';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Commercial | Quadplex 80</title>
        <meta name="description" content="Discover elevated commercial spaces with panoramic horizons at Quadplex 80." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="absolute inset-0 -z-10">
        <img src={heroImage} alt="Commercial sky view" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <section className="container min-h-[60vh] flex items-end pb-16">
        <div className="max-w-3xl animate-enter">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold">Commercial</h1>
          <p className="mt-4 text-muted-foreground">
            Inspiring horizons for modern business. Design-forward spaces that invite calm focus and clarity.
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
            <h2 className="text-2xl font-serif">Skyline Offices</h2>
            <p className="mt-2 text-muted-foreground">Natural light and soft materials create an atmosphere of quiet productivity.</p>
          </div>
          <div className="p-8 rounded-lg border bg-card/50 backdrop-blur-sm animate-fade-in">
            <h3 className="font-medium">Features</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Flexible floorplates</li>
              <li>Executive terraces</li>
              <li>On-site hospitality</li>
            </ul>
          </div>
        </article>

        <article className="space-y-6">
          <h2 className="text-2xl font-serif">Commercial Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "malls", title: "Malls" },
              { key: "ground-play-office", title: "Ground play office" },
              { key: "others", title: "Other commercial spaces" },
            ].map((item) => (
              <Link key={item.key} to={`/commercial/${item.key}`} className="group block rounded-lg border bg-card/50 backdrop-blur-sm p-6 hover-scale">
                <motion.h3 whileHover={{ y: -2 }} className="text-lg font-medium">{item.title}</motion.h3>
                <p className="mt-1 text-sm text-muted-foreground">Explore details and location</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Commercial;
