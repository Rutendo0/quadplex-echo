import React, { useEffect, useState } from 'react';
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
  const [showInfo, setShowInfo] = useState(false);
  const [showSavePicker, setShowSavePicker] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('saved_properties') || '[]'); } catch { return []; }
  });
  const [allProps, setAllProps] = useState<any[]>([]);
  const [loadingProps, setLoadingProps] = useState(false);

  const saved = savedIds.length > 0;

  useEffect(() => {
    try { localStorage.setItem('saved_properties', JSON.stringify(savedIds)); } catch {}
  }, [savedIds]);

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
      action: async () => {
        setShowSavePicker(true);
        if (allProps.length === 0 && !loadingProps) {
          try {
            setLoadingProps(true);
            const res = await fetch('/api/properties?category=residential');
            const data = await res.json();
            setAllProps(data);
          } catch {
            setAllProps([]);
          } finally {
            setLoadingProps(false);
          }
        }
      },
      color: "hsl(var(--earth-brown))"
    },
    {
      icon: Building,
      label: "Property Info",
      action: () => setShowInfo(true),
      color: "hsl(var(--ashumi-black-70))"
    },
    {
      icon: Phone,
      label: "Call Us",
      action: () => window.location.href = 'tel:+263771234567',
      color: "hsl(var(--earth-gold))"
    },
    {
      icon: Mail,
      label: "Email",
      action: () => window.location.href = 'mailto:info@ashumiestate.com?subject=Inquiry%20from%20Website',
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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCalculator(false)}>
          <div className="bg-white rounded-lg max-w-3xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Payment Calculator</h3>
              <Button variant="outline" size="sm" onClick={() => setShowCalculator(false)}>Close</Button>
            </div>
            <PaymentCalculator
              propertyPrice={selectedProperty.price}
              propertyName={selectedProperty.name}
              onBookingClick={handleBookingClick}
            />
          </div>
        </div>
      )}

      {showBooking && calculationData && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          property={selectedProperty}
          calculationData={calculationData}
        />
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowInfo(false)}>
          <div className="bg-white rounded-lg max-w-xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Property Info</h3>
              <Button variant="outline" size="sm" onClick={() => setShowInfo(false)}>Close</Button>
            </div>
            <div className="space-y-2 text-sm text-[hsl(var(--ashumi-black-90))]">
              <p>Explore residential options at Ashumi Estate. Use the Payment Calculator to estimate your plan, then book.</p>
              <p>Call us: <a href="tel:+263771234567" className="text-blue-600 underline">+263 77 123 4567</a></p>
              <p>Email: <a href="mailto:info@ashumiestate.com" className="text-blue-600 underline">info@ashumiestate.com</a></p>
            </div>
          </div>
        </div>
      )}

      {showSavePicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowSavePicker(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Save Favorites</h3>
              <Button variant="outline" size="sm" onClick={() => setShowSavePicker(false)}>Close</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loadingProps ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">Loading properties...</div>
              ) : (
                allProps.map((p) => {
                  const isSaved = savedIds.includes(p.id);
                  return (
                    <div key={p.id} className="border rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-100">
                        <img src={(p.exteriorImages && p.exteriorImages[0]) || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <div className="font-semibold text-sm mb-1">{p.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">{p.shortDescription || '—'}</div>
                        <Button
                          size="sm"
                          variant={isSaved ? 'default' : 'outline'}
                          onClick={() => setSavedIds((ids) => isSaved ? ids.filter(id => id !== p.id) : [...ids, p.id])}
                          className="w-full"
                        >
                          {isSaved ? 'Saved' : 'Save'}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyCalculator;