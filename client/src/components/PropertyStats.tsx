import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyStatsProps {
  className?: string;
}

const PropertyStats = ({ className = "" }: PropertyStatsProps) => {
  const stats = [
    {
      title: "Residential Units",
      value: "593",
      subtitle: "Total residential properties",
      breakdown: [
        { label: "Single-Storey Homes", count: "63 units" },
        { label: "Double-Storey Homes", count: "62 units" },
        { label: "Apartment Units", count: "468 units" }
      ]
    },
    {
      title: "Property Types",
      value: "8",
      subtitle: "Different housing options",
      breakdown: [
        { label: "3-4 Bed Homes", count: "For sale" },
        { label: "Studios & 1-Bed", count: "For rent" },
        { label: "Penthouse Units", count: "Premium option" }
      ]
    },
    {
      title: "Community Size",
      value: "20.6 ha",
      subtitle: "Master-planned development",
      breakdown: [
        { label: "Residential Area", count: "15.6 ha" },
        { label: "Commercial Zone", count: "2.5 ha" },
        { label: "Green Spaces", count: "2.5 ha" }
      ]
    },
    {
      title: "Price Range",
      value: "$120K-$220K",
      subtitle: "Accessible home ownership",
      breakdown: [
        { label: "Penthouses", count: "From $120,000" },
        { label: "Single-Storey", count: "$170,000" },
        { label: "Double-Storey", count: "$220,000" }
      ]
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.subtitle}</p>
              </div>
              
              <div className="space-y-2">
                {stat.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyStats;