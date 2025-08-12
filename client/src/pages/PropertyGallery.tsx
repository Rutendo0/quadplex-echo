import { Helmet } from "react-helmet-async";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, Eye, FileText, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InquiryForm from "@/components/InquiryForm";

const PropertyGallery = () => {
  const [match, params] = useRoute("/residential/:type/:subtype");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInteriorModal, setShowInteriorModal] = useState(false);
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  
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

  const property = properties[0]; // Take the first property for this type

  const formatPropertyType = (type: string) => {
    return type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatSubtype = (subtype: string) => {
    return subtype.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getPageTitle = () => {
    if (propertySubtype) {
      return `${formatSubtype(propertySubtype)} ${formatPropertyType(propertyType)}`;
    }
    return formatPropertyType(propertyType || 'Properties');
  };

  const nextImage = () => {
    if (property?.exteriorImages) {
      setCurrentImageIndex((prev) => (prev + 1) % property.exteriorImages.length);
    }
  };

  const prevImage = () => {
    if (property?.exteriorImages) {
      setCurrentImageIndex((prev) => (prev - 1 + property.exteriorImages.length) % property.exteriorImages.length);
    }
  };

  if (!match) {
    return <div>Property not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium mb-2">Property Not Available</h2>
          <p className="text-muted-foreground mb-4">
            We're currently preparing {getPageTitle().toLowerCase()} properties for you.
          </p>
          <Link href="/residential">
            <Button>Back to Residential</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const canonical = typeof window !== 'undefined' ? window.location.href : `https://quadplex80.com/residential/${propertyType}/${propertySubtype}`;

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>{property.name} | Quadplex 80</title>
        <meta name="description" content={`${property.shortDescription} - Premium properties above the clouds at Quadplex 80.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <section className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/residential">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Residential
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                <p className="text-gray-600">{property.shortDescription}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{property.price}</div>
              <Badge variant="secondary">{property.status}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Exterior Designs</h2>
            
            {/* Main Image */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {property.exteriorImages && property.exteriorImages.length > 0 ? (
                <img 
                  src={property.exteriorImages[currentImageIndex]} 
                  alt={`${property.name} exterior view ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                  data-testid={`img-exterior-${currentImageIndex}`}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  No exterior images available
                </div>
              )}
              
              {property.exteriorImages && property.exteriorImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                    onClick={prevImage}
                    data-testid="button-prev-exterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                    onClick={nextImage}
                    data-testid="button-next-exterior"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} of {property.exteriorImages?.length || 0}
                </div>
              </div>
            </div>

            {/* Image Thumbnails */}
            {property.exteriorImages && property.exteriorImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.exteriorImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setShowFloorPlanModal(true)}
                variant="outline"
                className="h-12"
                data-testid="button-view-floorplans"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Floor Plans
              </Button>
              <Button 
                onClick={() => setShowInteriorModal(true)}
                variant="outline"
                className="h-12"
                data-testid="button-view-interior"
              >
                <Eye className="h-5 w-5 mr-2" />
                Interior Views
              </Button>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Key Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            {property.floorPlanDetails && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Area</span>
                    <span className="font-medium">{property.floorPlanDetails.totalArea}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-medium">{property.floorPlanDetails.bedrooms}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-medium">{property.floorPlanDetails.bathrooms}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Garage</span>
                    <span className="font-medium">{property.floorPlanDetails.garage} car</span>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiry Form */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Interested in this property?</CardTitle>
                <CardDescription className="text-green-700">
                  Get in touch with our team to schedule a viewing or learn more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 hover:bg-green-700" data-testid="button-inquire">
                      Make an Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Inquire About {property.name}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and our team will get back to you within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <InquiryForm propertyId={property.id} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Floor Plan Modal */}
      <Dialog open={showFloorPlanModal} onOpenChange={setShowFloorPlanModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{property.name} - Floor Plans</DialogTitle>
            <DialogDescription>
              Detailed floor plans and layout specifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {property.floorPlanImages && property.floorPlanImages.length > 0 ? (
              property.floorPlanImages.map((image, index) => (
                <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Floor plan ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Floor plans will be available soon</p>
              </div>
            )}
            {property.floorPlanDetails?.features && (
              <div>
                <h4 className="font-medium mb-2">Layout Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {property.floorPlanDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Interior Views Modal */}
      <Dialog open={showInteriorModal} onOpenChange={setShowInteriorModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{property.name} - Interior Views</DialogTitle>
            <DialogDescription>
              Interior design and living spaces
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {property.interiorImages && property.interiorImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {property.interiorImages.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Interior view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interior images will be available soon</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default PropertyGallery;