import React from 'react';
import { ArrowLeft, Home, Bath, Bed, Car, Square, MapPin } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';

interface FloorPlanDetails {
  id: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: string;
  description: string;
  features: string[];
  images: string[];
  floorPlanImages: string[];
  price: string;
  specifications: {
    [key: string]: string;
  };
}

// Floor plan data organized by property type
const floorPlanData: { [key: string]: FloorPlanDetails } = {
  '4-bedroom-single': {
    id: '4-bedroom-single',
    title: '4-Bedroom Single Storey',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    area: '280m²',
    price: 'From $185,000',
    description: 'A luxurious single-storey home featuring four spacious bedrooms, modern design elements, and seamless indoor-outdoor living. Perfect for families seeking comfort and elegance.',
    features: [
      'Open-plan living and dining area',
      'Modern kitchen with island bench',
      'Master bedroom with ensuite',
      'Built-in wardrobes throughout',
      'Covered outdoor entertaining area',
      'Double garage with internal access',
      'Landscaped gardens',
      'Energy-efficient design'
    ],
    images: [
      '/properties/4-bedroom-single-story/exterior-view-1.png',
      '/properties/4-bedroom-single-story/exterior-view-2.png',
      '/properties/4-bedroom-single-story/exterior-view-3.png',
      '/properties/4-bedroom-single-story/luxury-exterior-a01.png'
    ],
    floorPlanImages: [],
    specifications: {
      'Plot Size': '450m²',
      'Built Area': '280m²',
      'Ceiling Height': '2.7m',
      'Construction': 'Brick and tile',
      'Parking': '2 cars',
      'Energy Rating': '6 Star'
    }
  },
  '3-bedroom-double': {
    id: '3-bedroom-double',
    title: '3-Bedroom Double Storey Duplex',
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    area: '165m²',
    price: 'From $145,000',
    description: 'Modern duplex living with three bedrooms across two levels. Smart design maximizes space while providing privacy and contemporary amenities.',
    features: [
      'Two-storey design',
      'Open-plan ground floor',
      'Private outdoor courtyard',
      'Modern kitchen with stone benchtops',
      'Master bedroom with ensuite',
      'Built-in wardrobes',
      'Single lock-up garage',
      'Low maintenance design'
    ],
    images: [
      '/properties/3-bedroom-double-story/duplex-front-view.png',
      '/properties/3-bedroom-double-story/exterior-view-1.png',
      '/properties/3-bedroom-double-story/street-view-1.png',
      '/properties/3-bedroom-double-story/aerial-view.png'
    ],
    floorPlanImages: [],
    specifications: {
      'Plot Size': '250m²',
      'Built Area': '165m²',
      'Ceiling Height': '2.4m',
      'Construction': 'Modern materials',
      'Parking': '1 car',
      'Energy Rating': '5 Star'
    }
  },
  '4-bedroom-double': {
    id: '4-bedroom-double',
    title: '4-Bedroom Double Storey Duplex',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    area: '220m²',
    price: 'From $165,000',
    description: 'Spacious four-bedroom duplex with intelligent two-level design. Ideal for growing families seeking space, privacy, and modern convenience.',
    features: [
      'Spacious two-storey layout',
      'Multiple living areas',
      'Private outdoor entertaining',
      'Gourmet kitchen',
      'Master suite with walk-in robe',
      'Additional bedrooms with built-ins',
      'Double garage',
      'Contemporary finishes throughout'
    ],
    images: [
      '/properties/4-bedroom-double-story/exterior-view-1.png',
      '/properties/4-bedroom-double-story/front-view-units.png',
      '/properties/4-bedroom-double-story/outdoor-living.png',
      '/properties/4-bedroom-double-story/aerial-view.png'
    ],
    floorPlanImages: [],
    specifications: {
      'Plot Size': '320m²',
      'Built Area': '220m²',
      'Ceiling Height': '2.7m',
      'Construction': 'Premium materials',
      'Parking': '2 cars',
      'Energy Rating': '6 Star'
    }
  }
};

const FloorPlanDetail: React.FC = () => {
  const params = useParams();
  
  // Map URL parameters to floor plan data keys
  let planType = '';
  if (params?.bedrooms === '4-bedroom' && window.location.pathname.includes('single-storey')) {
    planType = '4-bedroom-single';
  } else if (params?.bedrooms === '3-bedroom' && window.location.pathname.includes('double-storey')) {
    planType = '3-bedroom-double';
  } else if (params?.bedrooms === '4-bedroom' && window.location.pathname.includes('double-storey')) {
    planType = '4-bedroom-double';
  }
  
  const floorPlan = floorPlanData[planType];
  
  if (!floorPlan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-stone-900 mb-4">Floor Plan Not Found</h2>
          <Link href="/floorplans" className="text-amber-600 hover:text-amber-700">
            Back to Floor Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-300/30 px-4 sm:px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/floorplans" className="flex items-center space-x-2 sm:space-x-3">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-stone-800 tracking-wide">
                QUADPLEX 80
              </h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider hidden sm:block">
                {floorPlan.title}
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-6">
                {floorPlan.title}
              </h2>
              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-stone-600" />
                  <span className="text-stone-800">{floorPlan.bedrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-stone-600" />
                  <span className="text-stone-800">{floorPlan.bathrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-stone-600" />
                  <span className="text-stone-800">{floorPlan.garage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-stone-600" />
                  <span className="text-stone-800">{floorPlan.area}</span>
                </div>
              </div>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                {floorPlan.description}
              </p>
              <div className="text-3xl font-light text-amber-600">
                {floorPlan.price}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={floorPlan.images[0]}
                  alt={floorPlan.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-light text-stone-900 mb-12 text-center">
            Property Views
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floorPlan.images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={image}
                  alt={`${floorPlan.title} view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features and Specifications */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Features */}
            <div>
              <h3 className="text-3xl font-light text-stone-900 mb-8">
                Features & Inclusions
              </h3>
              <div className="space-y-4">
                {floorPlan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-stone-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-3xl font-light text-stone-900 mb-8">
                Specifications
              </h3>
              <div className="space-y-6">
                {Object.entries(floorPlan.specifications).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-between items-center py-3 border-b border-stone-200"
                  >
                    <span className="text-stone-600 font-medium">{key}</span>
                    <span className="text-stone-900">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light text-white mb-6">
            Interested in This Floor Plan?
          </h3>
          <p className="text-xl text-stone-300 mb-8">
            Contact our team to discuss customization options and availability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg transition-colors duration-300">
              Get in Touch
            </Link>
            <Link href="/properties" className="border border-white text-white hover:bg-white hover:text-stone-900 px-8 py-3 rounded-lg transition-colors duration-300">
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloorPlanDetail;