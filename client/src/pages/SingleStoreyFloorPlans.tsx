import React from 'react';
import { ArrowLeft, Home, Building2 } from 'lucide-react';
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

const singleStoreyCategories: FloorPlanCategory[] = [
  {
    id: "4-bedroom",
    title: "4-Bedroom Stand Alone",
    subtitle: "Spacious Family Living",
    description: "Luxurious single-storey homes with four bedrooms, perfect for large families seeking comfort and style",
    icon: Home,
    href: "/floorplans/single-storey/4-bedroom",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "1 Plan"
  },
  {
    id: "3-bedroom",
    title: "3-Bedroom Single Storey",
    subtitle: "Comfortable Living",
    description: "Modern single-storey designs offering comfort and functionality with three well-appointed bedrooms",
    icon: Building2,
    href: "/floorplans/single-storey/3-bedroom",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "Coming Soon"
  }
];

const SingleStoreyFloorPlans: React.FC = () => {
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
                Single Storey Floor Plans
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-stone-900 mb-6 tracking-wide">
            Single Storey Plans
          </h2>
          <p className="text-xl text-stone-600 mb-12 font-light">
            Ground Floor Living Excellence
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {singleStoreyCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} href={category.href}>
                  <div className={`${category.color} rounded-3xl p-8 lg:p-10 h-full border border-stone-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105`}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-4 bg-white/80 rounded-2xl shadow-sm">
                        <IconComponent className="h-8 w-8 text-stone-700" />
                      </div>
                      <div className="text-sm text-stone-600 font-medium bg-white/60 px-3 py-1 rounded-full">
                        {category.planCount}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-light text-stone-900 mb-3 tracking-wide group-hover:text-stone-700 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-stone-700 mb-4 font-medium">
                        {category.subtitle}
                      </p>
                      <p className="text-stone-600 leading-relaxed text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleStoreyFloorPlans;