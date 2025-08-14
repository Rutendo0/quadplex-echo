import React, { useState } from 'react';
import { Calculator, Heart, Building, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PaymentCalculator from './PaymentCalculator';
import BookingModal from './BookingModal';

interface StickyCalculatorProps {
  showOnPages?: string[];
}

const StickyCalculator: React.FC<StickyCalculatorProps> = ({ 
  showOnPages = ['/', '/residential'] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [calculationData, setCalculationData] = useState<any>(null);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  // Only show on specified pages
  if (!showOnPages.includes(currentPath)) {
    return null;
  }

  const handleCalculatorOpen = () => {
    setSelectedProperty({
      name: "Ashumi Estates Property",
      price: 45000000,
      type: "residential"
    });
    setShowCalculator(true);
    setIsExpanded(false);
  };

  const handleBookingClick = (calcData: any) => {
    setCalculationData(calcData);
    setShowCalculator(false);
    setShowBooking(true);
  };

  const quickActions = [
    {
      icon: Calculator,
      label: "Payment Calculator",
      action: handleCalculatorOpen,
      color: "hsl(var(--earth-gold))"
    },
    {
      icon: Heart,
      label: "Save Favorites", 
      action: () => {},
      color: "hsl(var(--earth-brown))"
    },
    {
      icon: Building,
      label: "Property Info",
      action: () => {},
      color: "hsl(var(--ashumi-black-70))"
    },
    {
      icon: Phone,
      label: "Call Us",
      action: () => window.open('tel:+250781234567'),
      color: "hsl(var(--earth-gold))"
    },
    {
      icon: Mail,
      label: "Email",
      action: () => window.open('mailto:info@ashumiestate.com'),
      color: "hsl(var(--earth-brown))"
    }
  ];

  return (
    <>
      <div className="ashumi-calculator-sticky">
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-full rounded-full hover:bg-transparent text-[hsl(var(--ashumi-black-90))]"
          >
            <Calculator className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 right-24 transform -translate-y-1/2 z-40"
          >
            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[hsl(var(--earth-warm))] backdrop-blur-20 border border-[hsl(var(--earth-brown))] shadow-2xl">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={action.action}
                    className="flex items-center gap-2 w-full justify-start hover:bg-[hsl(var(--earth-sand))] text-[hsl(var(--ashumi-black-90))]"
                  >
                    <action.icon 
                      className="w-4 h-4" 
                      style={{ color: action.color }} 
                    />
                    <span className="text-sm whitespace-nowrap">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      {showCalculator && selectedProperty && (
        <PaymentCalculator
          propertyPrice={selectedProperty.price}
          propertyName={selectedProperty.name}
          onBookingClick={handleBookingClick}
        />
      )}

      {showBooking && calculationData && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          property={selectedProperty}
          calculationData={calculationData}
        />
      )}
    </>
  );
};

export default StickyCalculator;