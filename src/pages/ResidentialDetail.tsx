import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/clouds-hero.jpg";
import InquiryForm from "@/components/InquiryForm";

const CONFIG: Record<string, { title: string; price: string; description: string; images: string[]; amenities: string[] }> = {
  apartments: {
    title: "The Apartments",
    price: "$250,000+",
    description: "Bright, efficient layouts with panoramic outlooks and refined finishes.",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Sky lounge access", "Fitness studio", "Concierge"],
  },
  duplex: {
    title: "E-bedroomed Duplex",
    price: "$480,000+",
    description: "Expansive duplex residences with double‑height living and flexible spaces.",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Private terrace", "Dedicated study", "Storage"],
  },
  "single-storey": {
    title: "Single‑storey",
    price: "$320,000+",
    description: "Single‑level living with seamless flow and generous glazing.",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Garden outlooks", "Modern kitchen", "Parking"],
  },
  others: {
    title: "Other Residences",
    price: "Pricing on request",
    description: "Townhomes and limited editions crafted for distinct lifestyles.",
    images: [heroImage, "/placeholder.svg"],
    amenities: ["Custom options", "Premium finishes", "On‑site services"],
  },
};

const ResidentialDetail = () => {
  const { type = "" } = useParams();
  const data = CONFIG[type];
  const canonical = useMemo(
    () => (typeof window !== "undefined" ? window.location.href : `https://quadplex80.com/residential/${type}`),
    [type]
  );

  if (!data) {
    return (
      <main className="container py-24">
        <h1 className="text-3xl font-serif">Not found</h1>
        <p className="mt-2 text-muted-foreground">The requested residence could not be found.</p>
        <div className="mt-6"><Link to="/residential"><Button variant="outline">Back to Residential</Button></Link></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{`${data.title} | Residential | Quadplex 80`}</title>
        <meta name="description" content={`${data.title} — ${data.description} Price: ${data.price}.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="container py-16">
        <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">{data.title}</h1>
          <p className="mt-3 text-muted-foreground">{data.description}</p>
          <div className="mt-4 inline-flex items-center gap-3">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-xl font-medium">{data.price}</span>
          </div>
        </motion.header>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:col-span-2 space-y-4">
            <div className="aspect-[16/9] overflow-hidden rounded-lg border bg-card">
              <img src={data.images[0]} alt={`${data.title} interior`} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-lg border bg-card">
                <img src={data.images[1]} alt={`${data.title} detail`} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-video rounded-lg border bg-card flex items-center justify-center text-sm text-muted-foreground">
                Floor plan (placeholder)
              </div>
            </div>
          </motion.div>

          <aside className="space-y-6">
            <div className="p-5 rounded-lg border bg-card/50 backdrop-blur-sm">
              <h3 className="font-medium">Highlights</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {data.amenities.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-lg border bg-card/50 backdrop-blur-sm">
              <h3 className="font-medium mb-3">Register Interest</h3>
              <InquiryForm propertyName={data.title} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ResidentialDetail;
