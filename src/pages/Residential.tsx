import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";

const Residential = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://quadplex80.com/residential';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Residential | Quadplex 80</title>
        <meta name="description" content="Discover refined residential living above the clouds at Quadplex 80." />
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
            <a href="#explore"><Button variant="hero">Explore</Button></a>
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
      </section>
    </main>
  );
};

export default Residential;
