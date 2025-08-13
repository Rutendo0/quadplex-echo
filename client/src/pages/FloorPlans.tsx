import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Building, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface FloorPlanCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
  planCount: string;
}

const categories: FloorPlanCategory[] = [
  {
    id: "single-storey",
    title: "Single Storey",
    subtitle: "Ground Floor Living",
    description: "Elegant single level homes with open layouts and seamless indoor-outdoor flow",
    icon: Home,
    href: "/floorplans/single-storey",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "2 Plans"
  },
  {
    id: "double-storey", 
    title: "Double Storey",
    subtitle: "Two Level Living",
    description: "Multi-level designs maximizing space, privacy, and architectural sophistication",
    icon: Building,
    href: "/floorplans/double-storey",
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    planCount: "2 Plans"
  },
  {
    id: "apartments",
    title: "Apartments",
    subtitle: "Modern Living Spaces", 
    description: "Contemporary apartment designs featuring luxury amenities and urban convenience",
    icon: Building2,
    href: "/floorplans/apartments",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "Coming Soon"
  }
];

const FloorPlans: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
      {/* Navigation Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-stone-200/50 px-6 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-light text-stone-900 tracking-[0.2em]">
              <Link href="/" className="hover:text-amber-600 transition-all duration-300">
                ASHUMI ESTATE
              </Link>
            </h1>
            <p className="text-xs text-stone-500 tracking-[0.3em] uppercase mt-1 font-light">
              Floor Plans
            </p>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/properties" className="text-stone-600 hover:text-amber-600 transition-colors text-sm uppercase tracking-wider font-medium">
              Properties
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl lg:text-6xl font-light text-stone-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Floor Plans
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our expertly designed floor plans crafted for modern living
          </motion.p>
        </div>
      </section>

      {/* Floor Plan Categories */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={category.href}>
                    <div className={`${category.color} rounded-3xl p-8 lg:p-10 h-full border border-stone-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                      hoveredCard === category.id ? 'scale-105' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-4 bg-white/80 rounded-2xl shadow-sm">
                          <IconComponent className="h-8 w-8 text-stone-700" />
                        </div>
                        <div className="text-sm text-stone-600 font-medium bg-white/60 px-3 py-1 rounded-full">
                          {category.planCount}
                        </div>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-light text-stone-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-stone-600 text-sm uppercase tracking-wider mb-6 font-light">
                        {category.subtitle}
                      </p>
                      <p className="text-stone-700 leading-relaxed mb-8 font-light">
                        {category.description}
                      </p>

                      <div className="flex items-center text-amber-600 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm uppercase tracking-wider font-medium mr-2">Explore Plans</span>
                        <ArrowRight className="h-4 w-4" />
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

export default FloorPlans;