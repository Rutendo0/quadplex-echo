import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Palette, Wrench } from "lucide-react";

interface FinishPackagesProps {
  className?: string;
}

const FinishPackages = ({ className = "" }: FinishPackagesProps) => {
  const packages = [
    {
      name: "Basic",
      price: "TBA",
      description: "Essential finishes for comfortable living",
      icon: Wrench,
      color: "border-gray-300",
      popular: false,
      features: [
        "Standard floor tiles",
        "Basic kitchen counters", 
        "Standard bathroom fixtures",
        "Interior paint (2 colors)",
        "Basic electrical fittings",
        "Standard door handles"
      ]
    },
    {
      name: "Standard",
      price: "TBA", 
      description: "Enhanced finishes with modern touches",
      icon: Star,
      color: "border-blue-500",
      popular: true,
      features: [
        "Premium ceramic tiles",
        "Granite kitchen counters",
        "Modern bathroom suite",
        "Interior & exterior paint",
        "LED lighting fixtures",
        "Chrome door hardware",
        "Built-in wardrobes"
      ]
    },
    {
      name: "Premium",
      price: "TBA",
      description: "Luxury finishes with designer elements", 
      icon: Star,
      color: "border-gold-500",
      popular: false,
      features: [
        "Luxury vinyl plank flooring",
        "Quartz kitchen counters",
        "Designer bathroom suite", 
        "Feature wall treatments",
        "Smart lighting system",
        "Designer door hardware",
        "Custom built-ins",
        "Home automation prep"
      ]
    },
    {
      name: "Custom",
      price: "Cost × 1.40 + Design Fee",
      designFee: "$1,000 - $2,000",
      description: "Bespoke designs tailored to your vision",
      icon: Palette,
      color: "border-purple-500",
      popular: false,
      features: [
        "Personalized design consultation",
        "Custom material selection",
        "Bespoke architectural elements",
        "High-end appliances",
        "Smart home integration",
        "Luxury finishes throughout",
        "Designer lighting scheme",
        "Custom furniture pieces"
      ]
    }
  ];

  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Interior Finish Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Turnkey interior packages by Imbayedu Interior Designers, our exclusive finishing contractor
            </p>
            <div className="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Palette className="w-4 h-4 mr-2" />
              Professional Interior Design Services Included
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card className={`h-full ${pkg.color} border-2 hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-blue-200' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    pkg.name === 'Basic' ? 'bg-gray-100' :
                    pkg.name === 'Standard' ? 'bg-blue-100' :
                    pkg.name === 'Premium' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    <pkg.icon className={`w-8 h-8 ${
                      pkg.name === 'Basic' ? 'text-gray-600' :
                      pkg.name === 'Standard' ? 'text-blue-600' :
                      pkg.name === 'Premium' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </CardTitle>
                  
                  <div className="mb-3">
                    <div className="text-3xl font-bold text-gray-900">{pkg.price}</div>
                    {pkg.designFee && (
                      <div className="text-sm text-gray-600 mt-1">Design Fee: {pkg.designFee}</div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    {pkg.name === 'Custom' ? 'Get Quote' : 'Select Package'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Imbayedu Interior Designers?</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our exclusive partnership ensures seamless coordination, quality control, and design continuity throughout your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Exclusive Partnership</h4>
              <p className="text-gray-600 text-sm">Dedicated design team working exclusively with Ashumi Estates</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Turnkey Solutions</h4>
              <p className="text-gray-600 text-sm">Complete interior packages from concept to completion</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Custom Design</h4>
              <p className="text-gray-600 text-sm">Bespoke solutions tailored to your lifestyle and preferences</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinishPackages;