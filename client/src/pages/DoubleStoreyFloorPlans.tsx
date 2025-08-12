import React from 'react';
import { ArrowLeft, Building, Building2, Home, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FloorPlanCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
  planCount: string;
  image: string;
}

const doubleStoreyCategories: FloorPlanCategory[] = [
  {
    id: "3-bedroom-duplex",
    title: "3-Bedroom Duplex",
    subtitle: "Double Level Living",
    description: "Elegant three-bedroom duplex designs with smart space utilization across two levels for modern family living",
    icon: Home,
    href: "/floorplans/double-storey/3-bedroom",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "1 Plan",
    image: "/properties/3-bedroom-double-story/duplex-front-view.png"
  },
  {
    id: "4-bedroom-duplex",
    title: "4-Bedroom Duplex",
    subtitle: "Spacious Multi-Level",
    description: "Expansive four-bedroom duplex plans offering maximum space and privacy across two thoughtfully designed levels",
    icon: Building2,
    href: "/floorplans/double-storey/4-bedroom",
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    planCount: "1 Plan",
    image: "/properties/4-bedroom-double-story/front-view-units.png"
  }
];

const DoubleStoreyFloorPlans: React.FC = () => {
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
                Double Storey Floor Plans
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-stone-900 mb-6 tracking-wide">
            Double Storey Plans
          </h2>
          <p className="text-xl text-stone-600 mb-12 font-light">
            Choose From our 3 and 4 bedroom duplexes
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {doubleStoreyCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link href={category.href} className="group block">
                    <div className={`${category.color} rounded-3xl p-8 sm:p-12 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-stone-400/20 border border-stone-200/50`}>
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/80 rounded-2xl backdrop-blur-sm border border-stone-200/50">
                              <IconComponent className="h-6 w-6 text-stone-700" />
                            </div>
                            <span className="text-sm text-stone-600 font-medium uppercase tracking-wider">
                              {category.planCount}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-light text-stone-900 mb-3 tracking-tight group-hover:text-stone-700 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-stone-600 font-medium mb-2 uppercase tracking-wide text-sm">
                            {category.subtitle}
                          </p>
                          <p className="text-stone-700 leading-relaxed font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Preview Image */}
                      <div className="mb-8">
                        <div className="aspect-[4/3] bg-white/50 rounded-2xl overflow-hidden border border-stone-200/50 backdrop-blur-sm">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-between items-center">
                        <Button
                          variant="ghost"
                          className="group/btn p-0 h-auto text-stone-700 hover:text-stone-900 hover:bg-transparent"
                        >
                          <span className="text-base font-medium tracking-wide">
                            Explore Plans
                          </span>
                          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>

                        <div className="text-right">
                          <div className="text-2xl font-light text-stone-900 mb-1">
                            {category.planCount.split(' ')[0]}
                          </div>
                          <div className="text-xs text-stone-600 uppercase tracking-wider">
                            Available Plans
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoubleStoreyFloorPlans;