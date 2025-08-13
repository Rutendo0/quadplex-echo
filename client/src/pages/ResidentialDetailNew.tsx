import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Home, 
  Car,
  Bed,
  Bath,
  Square,
  CheckCircle,
  Layout,
  Heart,
  Share2,
  Calculator,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Shield,
  Award,
  FileText
} from "lucide-react";
import PaymentCalculator from "@/components/PaymentCalculator";
import BookingModal from "@/components/BookingModal";
import InquiryForm from "@/components/InquiryForm";

const ResidentialDetailNew = () => {
  const [match, params] = useRoute("/residential/:type/:subtype");
  const [matchType] = useRoute("/residential/:type");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [calculationData, setCalculationData] = useState<any>(null);
  
  const propertyType = params?.type;
  const propertySubtype = params?.subtype;

  // Get properties based on the route
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties', { category: 'residential', type: propertyType, subtype: propertySubtype }],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        category: 'residential',
        ...(propertyType && { type: propertyType }),
        ...(propertySubtype && { subtype: propertySubtype })
      });
      const response = await fetch(`/api/properties?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    }
  });

  const property = properties[0]; // Display first property of this type

  const formatPropertyType = (type: string) => {
    return type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatSubtype = (subtype: string) => {
    return subtype.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getPageTitle = () => {
    if (propertySubtype) {
      return `${formatSubtype(propertySubtype)} ${formatPropertyType(propertyType || '')}`;
    }
    return formatPropertyType(propertyType || 'Properties');
  };

  const handleBookingClick = (data: any) => {
    setCalculationData(data);
    setShowBookingModal(true);
  };

  const getPropertyPrice = () => {
    if (!property) return 0;
    
    // Extract numeric price from price string or use salePrice
    if (property.salePrice) {
      return property.salePrice;
    }
    
    // Parse price string like "$170,000"
    const priceMatch = property.price?.match(/\$?([\d,]+)/);
    if (priceMatch) {
      return parseInt(priceMatch[1].replace(/,/g, ''));
    }
    
    return 0;
  };

  const canonical = typeof window !== 'undefined' ? window.location.href : `https://ashumi-estate.com/residential/${propertyType}${propertySubtype ? '/' + propertySubtype : ''}`;

  if (!match && !matchType) {
    return <div>Property not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center world-class-bg">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center world-class-bg">
        <div className="text-center">
          <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Properties Found</h2>
          <p className="text-muted-foreground">This property type is not available yet.</p>
          <Link href="/residential">
            <Button className="btn-premium mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Residential
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen world-class-bg">
      <Helmet>
        <title>{getPageTitle()} | Ashumi Estate</title>
        <meta name="description" content={`Discover premium ${getPageTitle().toLowerCase()} properties at Ashumi Estate. ${property.description}`} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${property.name} | Ashumi Estate`} />
        <meta property="og:description" content={property.shortDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>

      {/* Navigation Header */}
      <div className="world-class-hero">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/residential">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Residential
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Property Images */}
          <div className="lg:col-span-2">
            <div className="premium-card rounded-xl overflow-hidden">
              <div className="relative h-96 lg:h-[500px]">
                <img 
                  src={property.exteriorImages[currentImageIndex] || '/api/placeholder/800/500'} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {property.exteriorImages.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Property Summary */}
          <div className="space-y-6">
            <div className="premium-card p-6 rounded-xl">
              <h1 className="heading-lg hero-text mb-2">{property.name}</h1>
              <p className="text-elegant body-lg mb-4">{property.shortDescription}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-premium">{property.price}</div>
                {property.ownershipType === 'sale' && (
                  <Badge variant="secondary" className="text-premium">For Sale</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="feature-card p-3 rounded-lg text-center">
                  <Bed className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-medium">{property.floorPlanDetails?.bedrooms || 'N/A'} Bedrooms</div>
                </div>
                <div className="feature-card p-3 rounded-lg text-center">
                  <Bath className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-medium">{property.floorPlanDetails?.bathrooms || 'N/A'} Bathrooms</div>
                </div>
                <div className="feature-card p-3 rounded-lg text-center">
                  <Square className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-medium">{property.floorPlanDetails?.totalArea || 'N/A'}</div>
                </div>
                <div className="feature-card p-3 rounded-lg text-center">
                  <Car className="h-5 w-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-medium">{property.floorPlanDetails?.garage || 'N/A'} Car Spaces</div>
                </div>
              </div>

              {/* Availability Stats */}
              {property.totalUnits && (
                <div className="stats-card p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg font-bold text-luxury">
                    {property.availableUnits} of {property.totalUnits} available
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(property.availableUnits / property.totalUnits) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Detailed Information Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="calculator" className="hidden lg:block">Calculator</TabsTrigger>
              <TabsTrigger value="inquiry" className="hidden lg:block">Inquire</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    Property Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="body-lg text-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Property Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="feature-card p-4 rounded-lg">
                      <Award className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Premium Location</h3>
                      <p className="text-sm text-muted-foreground">Above the clouds elevation</p>
                    </div>
                    <div className="feature-card p-4 rounded-lg">
                      <Shield className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-semibold mb-1">Quality Construction</h3>
                      <p className="text-sm text-muted-foreground">Built to last with premium materials</p>
                    </div>
                    <div className="feature-card p-4 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold mb-1">Investment Potential</h3>
                      <p className="text-sm text-muted-foreground">Strong growth prospects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Property Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="feature-card p-4 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="floorplan" className="mt-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layout className="h-5 w-5 mr-2 text-primary" />
                    Floor Plan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={property.floorPlanImages[0] || '/api/placeholder/600/400'} 
                        alt="Floor Plan"
                        className="w-full rounded-lg border"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Layout Features</h3>
                      {property.floorPlanDetails?.features?.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="feature-card p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">General Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Build Year:</span>
                            <span className="font-medium">{property.specifications?.buildYear || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Floor Area:</span>
                            <span className="font-medium">{property.specifications?.floorArea || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lot Size:</span>
                            <span className="font-medium">{property.specifications?.lotSize || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="feature-card p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Property Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Property Type:</span>
                            <span className="font-medium">{formatPropertyType(propertyType || '')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="font-medium">{formatSubtype(propertySubtype || '')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium text-green-600">Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculator" className="mt-8">
              <div className="max-w-4xl">
                <PaymentCalculator 
                  propertyPrice={getPropertyPrice()}
                  propertyName={property.name}
                  onBookingClick={handleBookingClick}
                />
              </div>
            </TabsContent>

            <TabsContent value="inquiry" className="mt-8">
              <Card className="premium-card max-w-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Make an Inquiry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InquiryForm propertyId={property.id} propertyName={property.name} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Mobile Payment Calculator */}
        <div className="lg:hidden mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PaymentCalculator 
              propertyPrice={getPropertyPrice()}
              propertyName={property.name}
              onBookingClick={handleBookingClick}
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center premium-section p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="heading-lg luxury-text mb-4">Ready to Make This Property Yours?</h2>
          <p className="body-lg text-elegant mb-6">
            Contact our expert team today to schedule a viewing or get more information about financing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleBookingClick({ 
                propertyPrice: getPropertyPrice(),
                depositAmount: getPropertyPrice() * 0.1,
                loanAmount: getPropertyPrice() * 0.9,
                monthlyPayment: (getPropertyPrice() * 0.9 * 0.045 / 12) / (1 - Math.pow(1 + 0.045/12, -300)),
                loanTerm: 25,
                interestRate: 4.5,
                depositPercent: 10
              })}
              className="btn-luxury px-8 py-3"
              data-testid="cta-book-property"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Book This Property
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Phone className="h-5 w-5 mr-2" />
              Schedule Viewing
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && property && calculationData && (
        <BookingModal 
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          property={property}
          calculationData={calculationData}
        />
      )}
    </main>
  );
};

export default ResidentialDetailNew;