import { Helmet } from "react-helmet-async";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, MapPin, Bed, Bath, Car, Eye, FileText } from "lucide-react";
import heroImage from "@/assets/clouds-hero.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InquiryForm from "@/components/InquiryForm";

const ResidentialDetail = () => {
  const [match, params] = useRoute("/residential/:type/:subtype");
  const [matchType] = useRoute("/residential/:type");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  
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

  const canonical = typeof window !== 'undefined' ? window.location.href : `https://quadplex80.com/residential/${propertyType}${propertySubtype ? '/' + propertySubtype : ''}`;

  if (!match && !matchType) {
    return <div>Property not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{getPageTitle()} | Quadplex 80</title>
        <meta name="description" content={`Discover premium ${getPageTitle().toLowerCase()} properties above the clouds at Quadplex 80.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${getPageTitle()} view`} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
        </div>
        
        <div className="relative container h-full flex items-end pb-16">
          <div className="max-w-3xl animate-enter">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/residential" className="hover:text-foreground">Residential</Link>
              {propertyType && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{formatPropertyType(propertyType)}</span>
                </>
              )}
              {propertySubtype && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{formatSubtype(propertySubtype)}</span>
                </>
              )}
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-serif font-semibold">{getPageTitle()}</h1>
            <p className="mt-4 text-muted-foreground">
              Premium properties offering exceptional living spaces above the clouds with panoramic views and luxury amenities.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="hero" onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}>
                View Properties
              </Button>
              <Link href="/residential">
                <Button variant="outline">Back to Residential</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="container py-24">
        <h2 className="text-3xl font-serif font-semibold mb-8">Available Properties</h2>
        
        {properties.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Properties Available</h3>
              <p className="text-muted-foreground mb-4">
                We're currently preparing exceptional {getPageTitle().toLowerCase()} properties for you.
              </p>
              <Button variant="outline">
                <Link href="/residential">Explore Other Properties</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index}
                onViewFloorPlan={() => {
                  setCurrentImageIndex(index);
                  setShowFloorPlan(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Floor Plan Modal */}
      <FloorPlanModal 
        property={properties[currentImageIndex]}
        isOpen={showFloorPlan}
        onClose={() => setShowFloorPlan(false)}
      />
    </main>
  );
};

// Property Card Component
const PropertyCard = ({ property, index, onViewFloorPlan }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const nextImage = () => {
    const totalImages = property.exteriorImages.length + property.interiorImages.length;
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = property.exteriorImages.length + property.interiorImages.length;
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const allImages = [...property.exteriorImages, ...property.interiorImages];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="property-card overflow-hidden group" data-testid={`card-property-${property.id}`}>
        {/* Image Gallery */}
        <div className="image-container relative aspect-video overflow-hidden">
          <img 
            src={allImages[currentImageIndex]} 
            alt={property.name}
            className="image-hover h-full w-full object-cover"
          />
          
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={prevImage}
                data-testid={`button-prev-image-${property.id}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={nextImage}
                data-testid={`button-next-image-${property.id}`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {allImages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          <Badge className="absolute top-4 left-4" data-testid={`badge-status-${property.id}`}>
            {property.status}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span data-testid={`text-property-name-${property.id}`}>{property.name}</span>
            <span className="text-lg font-bold text-primary" data-testid={`text-price-${property.id}`}>
              {property.price}
            </span>
          </CardTitle>
          <CardDescription data-testid={`text-description-${property.id}`}>
            {property.shortDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Property Details */}
          {property.floorPlanDetails && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.floorPlanDetails.bedrooms > 0 && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.floorPlanDetails.bedrooms} bed</span>
                </div>
              )}
              {property.floorPlanDetails.bathrooms > 0 && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.floorPlanDetails.bathrooms} bath</span>
                </div>
              )}
              {property.floorPlanDetails.garage > 0 && (
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  <span>{property.floorPlanDetails.garage} car</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{property.floorPlanDetails.totalArea}</span>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 3).map((feature, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => setShowGallery(true)} 
              variant="outline" 
              size="sm" 
              className="flex-1"
              data-testid={`button-view-gallery-${property.id}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Gallery
            </Button>
            <Button 
              onClick={onViewFloorPlan} 
              variant="outline" 
              size="sm" 
              className="flex-1"
              data-testid={`button-view-floorplan-${property.id}`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Floor Plan
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-1" data-testid={`button-inquire-${property.id}`}>
                  Inquire
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inquire About {property.name}</DialogTitle>
                  <DialogDescription>
                    Get in touch with our team to learn more about this property or schedule a viewing.
                  </DialogDescription>
                </DialogHeader>
                <InquiryForm propertyId={property.id} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>

        {/* Image Gallery Modal */}
        <ImageGalleryModal 
          property={property}
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
        />
      </Card>
    </motion.div>
  );
};

// Image Gallery Modal Component
const ImageGalleryModal = ({ property, isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState("exterior");

  const exteriorImages = property.exteriorImages;
  const interiorImages = property.interiorImages;
  const interiorVideos = property.interiorVideos || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{property.name} - Media Gallery</DialogTitle>
          <DialogDescription>
            Explore exterior views, interior design, and videos of this property
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="exterior">Exterior ({exteriorImages.length})</TabsTrigger>
            <TabsTrigger value="interior">Interior ({interiorImages.length})</TabsTrigger>
            {interiorVideos.length > 0 && (
              <TabsTrigger value="videos">Videos ({interiorVideos.length})</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="exterior" className="space-y-4">
            <MediaCarousel images={exteriorImages} />
          </TabsContent>
          
          <TabsContent value="interior" className="space-y-4">
            <MediaCarousel images={interiorImages} />
          </TabsContent>
          
          {interiorVideos.length > 0 && (
            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interiorVideos.map((video, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Interior Video {index + 1}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Floor Plan Modal Component
const FloorPlanModal = ({ property, isOpen, onClose }) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{property.name} - Floor Plans</DialogTitle>
          <DialogDescription>
            Detailed floor plans and specifications
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Floor Plan Images */}
          <div className="space-y-4">
            {property.floorPlanImages.map((image, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`Floor plan ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Floor Plan Details */}
          {property.floorPlanDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Area</div>
                  <div className="font-medium">{property.floorPlanDetails.totalArea}</div>
                </div>
                {property.floorPlanDetails.bedrooms > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                    <div className="font-medium">{property.floorPlanDetails.bedrooms}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                  <div className="font-medium">{property.floorPlanDetails.bathrooms}</div>
                </div>
                {property.floorPlanDetails.garage > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground">Garage</div>
                    <div className="font-medium">{property.floorPlanDetails.garage} car</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Property Features */}
          {property.floorPlanDetails?.features && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {property.floorPlanDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Media Carousel Component
const MediaCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                index === currentIndex ? 'border-primary' : 'border-transparent'
              }`}
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
    </div>
  );
};

export default ResidentialDetail;
