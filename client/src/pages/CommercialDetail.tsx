import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/clouds-hero.jpg";

const CONFIG: Record<string, { title: string; description: string; location: string; images: string[]; amenities: string[] }> = {
  malls: {
    title: "Malls",
    description: "Retail destinations with open concourses and natural light.",
    location: "Central promenade",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Parking", "Security", "Food court"],
  },
  "ground-play-office": {
    title: "Ground play office",
    description: "Flexible ground‑level offices with direct outdoor access.",
    location: "South district",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Fiber internet", "Conference rooms", "Green courtyard"],
  },
  others: {
    title: "Other commercial spaces",
    description: "Studios and special‑use spaces for diverse businesses.",
    location: "Various",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["24/7 access", "Loading bays", "On‑site management"],
  },
};

const CommercialDetail = () => {
  const { type = "" } = useParams();
  const data = CONFIG[type];
  const canonical = useMemo(
    () => (typeof window !== "undefined" ? window.location.href : `https://ashumi-estate.com/commercial/${type}`),
    [type]
  );

  if (!data) {
    return (
      <main className="container py-24">
        <h1 className="text-3xl font-serif">Not found</h1>
        <p className="mt-2 text-muted-foreground">The requested commercial space could not be found.</p>
        <div className="mt-6"><Link to="/commercial"><Button variant="outline">Back to Commercial</Button></Link></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{`${data.title} | Commercial | Quadplex 80`}</title>
        <meta name="description" content={`${data.title} — ${data.description}. Located: ${data.location}.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="container py-16">
        <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">{data.title}</h1>
          <p className="mt-3 text-muted-foreground">{data.description}</p>
          <div className="mt-2 text-sm text-muted-foreground">Location: {data.location}</div>
        </motion.header>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:col-span-2 space-y-4">
            <div className="aspect-[16/9] overflow-hidden rounded-lg border bg-card">
              <img src={data.images[0]} alt={`${data.title} overview`} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-lg border bg-card">
                <img src={data.images[1]} alt={`${data.title} detail`} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-video rounded-lg border bg-card flex items-center justify-center text-sm text-muted-foreground">
                3D/Map (placeholder)
              </div>
            </div>
          </motion.div>

          <aside className="space-y-6">
            <div className="p-5 rounded-lg border bg-card/50 backdrop-blur-sm">
              <h3 className="font-medium">Amenities</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {data.amenities.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-lg border bg-card/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3">Contact for Leasing</h3>
              <Link to="/commercial"><Button variant="hero" className="w-full">Explore More</Button></Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CommercialDetail;
