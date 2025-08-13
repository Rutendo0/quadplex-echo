import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Building2, Trees, Waves } from "lucide-react";

interface InteractivePropertyMapProps {
  className?: string;
}

const InteractivePropertyMap = ({ className = "" }: InteractivePropertyMapProps) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    {
      id: "residential-north",
      name: "Northern Residential",
      type: "residential",
      icon: Home,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      position: { top: "20%", left: "30%" },
      units: "295 units",
      description: "Single & double-storey homes with river views",
      features: ["3-4 bedroom homes", "Private gardens", "River proximity"]
    },
    {
      id: "residential-south", 
      name: "Southern Residential",
      type: "residential",
      icon: Building2,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600", 
      position: { top: "60%", left: "25%" },
      units: "298 units",
      description: "Apartment complexes with modern amenities",
      features: ["Studio to 3-bed apartments", "Penthouse options", "Community facilities"]
    },
    {
      id: "commercial-hub",
      name: "Commercial Hub",
      type: "commercial",
      icon: Building2,
      color: "bg-purple-500", 
      hoverColor: "hover:bg-purple-600",
      position: { top: "40%", left: "65%" },
      units: "Mixed use",
      description: "Shopping, dining, and business center",
      features: ["Food Town", "Office suites", "Innovation hub"]
    },
    {
      id: "green-spaces",
      name: "Green Corridor",
      type: "amenity",
      icon: Trees,
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
      position: { top: "30%", left: "10%" },
      units: "2.5 ha",
      description: "Walking trails and recreation areas", 
      features: ["Riverfront access", "Picnic areas", "Native landscaping"]
    },
    {
      id: "gwebi-river",
      name: "Gwebi River",
      type: "natural",
      icon: Waves,
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600", 
      position: { top: "10%", left: "5%" },
      units: "Waterfront",
      description: "Direct river frontage and scenic views",
      features: ["Riverfront promenade", "Scenic walkways", "Water activities"]
    }
  ];

  return (
    <div className={`bg-white rounded-2xl p-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Site Plan</h3>
        <p className="text-gray-600">Explore the 20.6-hectare master-planned community</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interactive Map */}
        <div className="relative">
          <div 
            className="relative w-full h-96 bg-gradient-to-br from-green-100 via-blue-50 to-green-50 rounded-xl overflow-hidden border-2 border-gray-200"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.10) 0%, transparent 50%)`
            }}
          >
            {/* Site Boundary */}
            <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-lg opacity-50"></div>
            
            {/* Parliament View Indicator */}
            <div className="absolute top-2 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
              Parliament Views →
            </div>

            {/* Interactive Zones */}
            {zones.map((zone) => (
              <motion.div
                key={zone.id}
                className={`absolute w-16 h-16 ${zone.color} ${zone.hoverColor} rounded-full cursor-pointer shadow-lg border-4 border-white flex items-center justify-center transition-all duration-300`}
                style={zone.position}
                onMouseEnter={() => setActiveZone(zone.id)}
                onMouseLeave={() => setActiveZone(null)}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <zone.icon className="w-6 h-6 text-white" />
                
                {/* Tooltip */}
                {activeZone === zone.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-48 z-20"
                  >
                    <div className="text-sm font-semibold text-gray-900">{zone.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{zone.units}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Residential North</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Residential South</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span>Commercial Hub</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span>Green Spaces</span>
            </div>
          </div>
        </div>

        {/* Zone Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Site Features</h4>
          
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0.7 }}
              animate={{ 
                opacity: !activeZone || activeZone === zone.id ? 1 : 0.4,
                scale: activeZone === zone.id ? 1.02 : 1
              }}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                activeZone === zone.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${zone.color} rounded-full flex items-center justify-center mr-3`}>
                    <zone.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{zone.name}</h5>
                    <p className="text-sm text-gray-600">{zone.units}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{zone.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {zone.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Key Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Development Overview</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Area:</span>
                <br />20.6 hectares
              </div>
              <div>
                <span className="font-medium">Residential:</span>
                <br />593 units
              </div>
              <div>
                <span className="font-medium">Green Space:</span>
                <br />2.5 hectares
              </div>
              <div>
                <span className="font-medium">River Frontage:</span>
                <br />Direct access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePropertyMap;