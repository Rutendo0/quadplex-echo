import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Home, 
  Building, 
  MapPin, 
  Users, 
  TreePine, 
  Car, 
  Dumbbell, 
  ShoppingBag, 
  Calculator, 
  Heart, 
  Phone, 
  Mail, 
  Globe,
  CheckCircle,
  DollarSign,
  Calendar,
  Waves,
  Sun,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { ASHUMI_PROPERTIES } from "@shared/schema";
import PaymentCalculator from "@/components/PaymentCalculator";
import BookingModal from "@/components/BookingModal";

const AshumiIndex = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [calculationData, setCalculationData] = useState<any>(null);

  const handleCalculatorOpen = (property: any) => {
    setSelectedProperty(property);
    setShowCalculator(true);
  };

  const handleBookingClick = (calcData: any) => {
    setCalculationData(calcData);
    setShowCalculator(false);
    setShowBooking(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>Ashumi Estates - Premium Living Above the Clouds | Harare, Zimbabwe</title>
        <meta name="description" content="Discover Ashumi Estates, a master-planned lifestyle precinct offering quality homes, sustainable living, and unmatched amenities with direct Gwebi River frontage in Harare, Zimbabwe." />
        <meta property="og:title" content="Ashumi Estates - Premium Living Above the Clouds" />
        <meta property="og:description" content="Forward-thinking community with 20.6 ha of luxury residential and commercial properties in Harare's fastest-growing node." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Premium Master-Planned Community
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to
                  <span className="text-blue-600 block">Ashumi Estates</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  More than a place to live—it's a forward-thinking community designed to provide quality, 
                  dignity, and independence across all life stages. Situated on 20.6 ha with direct Gwebi River 
                  frontage and panoramic views of the new Parliament.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowCalculator(true)}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Payments
                </Button>
                <Link href="/residential">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Home className="mr-2 h-5 w-5" />
                    View Properties
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">20.6</div>
                  <div className="text-sm text-gray-500">Hectares</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">593</div>
                  <div className="text-sm text-gray-500">Total Units</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15.6</div>
                  <div className="text-sm text-gray-500">Ha Residential</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-lg p-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Sales Team</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">ZB Centre, 4th Floor, Corner 1st Street & Kwame Nkurumah Avenue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Harare, Zimbabwe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">info@griafrica.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">www.ashumiestates.com</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Visit
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Residential Product Lines</h2>
            <p className="text-xl text-gray-600">Homes priced accessibly, built sustainably, and supported by unmatched amenities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(ASHUMI_PROPERTIES.residential).map(([key, property]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {property.type}
                      </Badge>
                      {property.price && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            ${property.price.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                      {property.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-500">{property.units} Units</span>
                      </div>
                      {property.size && (
                        <div className="flex items-center space-x-1">
                          <Home className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">{property.size}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      {property.price && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleCalculatorOpen(property)}
                        >
                          <Calculator className="mr-1 h-4 w-4" />
                          Calculate
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities & Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Amenities</h2>
            <p className="text-xl text-gray-600">Integrated lifestyle with seamless living, working, and leisure</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recreation */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Dumbbell className="h-6 w-6" />
                  <span>Recreation & Sports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ASHUMI_PROPERTIES.amenities.recreation.map((amenity, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Green Spaces */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <TreePine className="h-6 w-6" />
                  <span>Green Spaces</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ASHUMI_PROPERTIES.amenities.green_spaces.map((space, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{space}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Convenience */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Convenience & Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ASHUMI_PROPERTIES.amenities.convenience.map((service, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Ashumi */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Ashumi Estates?</h2>
            <p className="text-xl text-blue-100">Sustainable luxury where modern living meets eco-friendly design</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrated Lifestyle</h3>
              <p className="text-blue-100">Seamless living, working and leisure in one community</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Location</h3>
              <p className="text-blue-100">Near schools, business districts and transport routes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-blue-100">International-standard materials and ISO-compliant processes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-yellow-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community & Value</h3>
              <p className="text-blue-100">Affordable, sustainable homes with unmatched amenities</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live the Life You Deserve</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the perfect blend of luxury, sustainability, and community at Ashumi Estates. 
              Your dream home awaits in Harare's most prestigious development.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowCalculator(true)}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your Investment
              </Button>
              <Link href="/residential">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Home className="mr-2 h-5 w-5" />
                  Explore Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Calculator Modal */}
      {showCalculator && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Payment Calculator</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <PaymentCalculator
                propertyPrice={selectedProperty.price || 170000}
                propertyName={selectedProperty.name}
                onBookingClick={handleBookingClick}
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && selectedProperty && calculationData && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          property={selectedProperty}
          calculationData={calculationData}
        />
      )}
    </main>
  );
};

export default AshumiIndex;