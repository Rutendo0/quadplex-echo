import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building2, Crown, Users, DollarSign, MapPin } from "lucide-react";

interface PropertyTypesGridProps {
  className?: string;
  onPropertySelect?: (property: any) => void;
}

const PropertyTypesGrid = ({ className = "", onPropertySelect }: PropertyTypesGridProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const propertyTypes = [
    {
      id: "3-bed-single",
      category: "single-storey",
      name: "3-Bed Single-Storey Homes",
      units: 10,
      price: 170000,
      type: "Sale",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Beautifully designed homes with modern finishes and private gardens",
      features: ["Private garden", "Open plan living", "Modern kitchen", "Master en-suite"],
      size: "120m²",
      popular: false
    },
    {
      id: "3-bed-duplex",
      category: "duplex", 
      name: "3-Bed Single-Storey Duplexes",
      units: 20,
      price: 150000,
      type: "Sale",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Contemporary duplex units perfect for families with shared amenities",
      features: ["Shared amenities", "Family-friendly", "Modern design", "Cost-effective"],
      size: "100m²",
      popular: true
    },
    {
      id: "4-bed-single",
      category: "single-storey",
      name: "4-Bed Single-Storey Homes", 
      units: 33,
      price: 170000,
      type: "Sale",
      icon: Home,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Spacious homes with premium fixtures and landscaped gardens",
      features: ["4 bedrooms", "Premium fixtures", "Landscaped garden", "Spacious layout"],
      size: "150m²",
      popular: false
    },
    {
      id: "3-bed-double-duplex",
      category: "double-storey",
      name: "3-Bed Double-Storey Duplexes",
      units: 36,
      price: 220000,
      type: "Sale", 
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Elegant duplex units with panoramic views and modern architecture",
      features: ["Panoramic views", "Two storeys", "Modern architecture", "Premium location"],
      size: "140m²",
      popular: true
    },
    {
      id: "4-bed-double",
      category: "double-storey",
      name: "4-Bed Double-Storey Homes",
      units: 26,
      price: 220000,
      type: "Sale",
      icon: Building2,
      color: "text-red-600", 
      bgColor: "bg-red-50",
      description: "Luxurious homes with modern architecture and premium amenities",
      features: ["4 bedrooms", "Two storeys", "Premium amenities", "Luxury finishes"],
      size: "180m²",
      popular: false
    },
    {
      id: "ground-studios",
      category: "apartments",
      name: "Ground-Floor Studios",
      units: 252,
      price: "Rental",
      type: "Rental",
      icon: Home,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50", 
      description: "Compact studios with private garden access and modern amenities",
      features: ["Private garden access", "En-suite bathroom", "Aluminium doors", "Open plan"],
      size: "40m²",
      popular: true
    },
    {
      id: "one-bed-apartments",
      category: "apartments",
      name: "First-Floor 1-Bedrooms", 
      units: 144,
      price: "Rental",
      type: "Rental",
      icon: Building2,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Modern apartments with kitchenette and covered balcony",
      features: ["Modern kitchenette", "Courtyard views", "Covered balcony", "Secure access"],
      size: "55-70m² + 10m² balcony",
      popular: false
    },
    {
      id: "penthouse-units",
      category: "apartments",
      name: "2-3 Bedroom Penthouses",
      units: 72,
      price: 120000,
      type: "Sale",
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Exclusive penthouses with panoramic views and premium finishes",
      features: ["Panoramic views", "Premium finishes", "Rooftop terrace", "Exclusive design"],
      size: "100m² + 33m² terrace",
      popular: true
    }
  ];

  const categories = [
    { id: "all", name: "All Properties", count: propertyTypes.length },
    { id: "single-storey", name: "Single-Storey", count: propertyTypes.filter(p => p.category === "single-storey").length },
    { id: "double-storey", name: "Double-Storey", count: propertyTypes.filter(p => p.category === "double-storey").length },
    { id: "apartments", name: "Apartments", count: propertyTypes.filter(p => p.category === "apartments").length },
    { id: "duplex", name: "Duplexes", count: propertyTypes.filter(p => p.category === "duplex").length }
  ];

  const filteredProperties = activeCategory === "all" 
    ? propertyTypes 
    : propertyTypes.filter(p => p.category === activeCategory);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Filter */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Perfect Home</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="relative"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
              {property.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${property.bgColor} rounded-xl flex items-center justify-center`}>
                    <property.icon className={`w-6 h-6 ${property.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{property.units} units</div>
                    <Badge variant={property.type === "Sale" ? "default" : "secondary"}>
                      {property.type}
                    </Badge>
                  </div>
                </div>

                {/* Title and Price */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {property.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.size}</span>
                  </div>
                  <div className="text-right">
                    {typeof property.price === "number" ? (
                      <div className="text-2xl font-bold text-green-600">
                        ${property.price.toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-blue-600">
                        {property.price}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {property.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {property.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onPropertySelect?.(property)}
                  >
                    <DollarSign className="mr-1 h-4 w-4" />
                    Calculate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Users className="mr-1 h-4 w-4" />
                    Inquire
                  </Button>
                </div>
              </CardContent>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        className="mt-12 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Property Portfolio Summary</h3>
          <p className="text-gray-600">Complete residential options for every lifestyle and budget</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">593</div>
            <div className="text-sm text-gray-600">Total Units</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-1">$120K-$220K</div>
            <div className="text-sm text-gray-600">Price Range</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Property Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-1">15%</div>
            <div className="text-sm text-gray-600">Min Deposit</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyTypesGrid;