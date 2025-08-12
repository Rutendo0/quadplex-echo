import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Zap, 
  Coffee, 
  Stethoscope, 
  Car, 
  TreePine, 
  Waves, 
  Dumbbell,
  Shield,
  Wifi,
  Building2,
  Lightbulb
} from "lucide-react";

interface AmenitiesShowcaseProps {
  className?: string;
}

const AmenitiesShowcase = ({ className = "" }: AmenitiesShowcaseProps) => {
  const amenityCategories = [
    {
      title: "Recreation & Wellness",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "Swimming pool & gym",
        "Children's play areas", 
        "Multi-use sports courts",
        "Community football pitch",
        "Rooftop lounge"
      ]
    },
    {
      title: "Green Living",
      icon: TreePine,
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50",
      items: [
        "Walking trails & picnic lawns",
        "Native landscaping",
        "Gwebi River frontage access",
        "Solar-generated electricity",
        "Water-wise gardens"
      ]
    },
    {
      title: "Daily Convenience",
      icon: Coffee,
      color: "text-orange-600",
      bgColor: "bg-orange-50", 
      items: [
        "On-site clinic",
        "Fuel station & drive-through",
        "Food Town curated dining",
        "Supermarket & pharmacy",
        "Daily-needs shops"
      ]
    },
    {
      title: "Work & Innovation",
      icon: Lightbulb,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "Office suites & co-working",
        "Innovation Hub mentorship",
        "High-speed connectivity",
        "Professional workspace",
        "Entrepreneur networking"
      ]
    }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Unmatched Community Amenities
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Everything you need for modern living, working, and leisure - all within walking distance of your home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenityCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mr-4`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Key Stats Row */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Professional Management</h4>
            <p className="text-sm text-gray-600">24/7 security, maintenance & community services</p>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Sustainable Living</h4>
            <p className="text-sm text-gray-600">Solar power, water-wise design & eco-commitment</p>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">ISO-Compliant Quality</h4>
            <p className="text-sm text-gray-600">International standards & one-year warranty</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AmenitiesShowcase;