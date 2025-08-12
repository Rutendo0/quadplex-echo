import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronUp,
  Calendar,
  Download
} from "lucide-react";

interface FloatingActionBarProps {
  onCalculatorClick?: () => void;
  className?: string;
}

const FloatingActionBar = ({ onCalculatorClick, className = "" }: FloatingActionBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const actions = [
    {
      icon: Calculator,
      label: "Payment Calculator",
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
      onClick: onCalculatorClick
    },
    {
      icon: Phone,
      label: "Call Sales",
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-white",
      onClick: () => window.open('tel:+263-4-xxx-xxxx')
    },
    {
      icon: Mail,
      label: "Email Us",
      color: "bg-purple-600 hover:bg-purple-700", 
      textColor: "text-white",
      onClick: () => window.open('mailto:info@griafrica.com')
    },
    {
      icon: Calendar,
      label: "Schedule Visit",
      color: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-white",
      onClick: () => {}
    },
    {
      icon: Download,
      label: "Download Brochure",
      color: "bg-gray-600 hover:bg-gray-700",
      textColor: "text-white", 
      onClick: () => {}
    },
    {
      icon: MapPin,
      label: "Get Directions",
      color: "bg-red-600 hover:bg-red-700",
      textColor: "text-white",
      onClick: () => window.open('https://maps.google.com/?q=ZB+Centre+Harare')
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
          {/* Expanded Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="mb-4 space-y-3"
              >
                {actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={action.onClick}
                      className={`${action.color} ${action.textColor} shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px] justify-start`}
                      size="lg"
                    >
                      <action.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary Calculator Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onCalculatorClick}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-14 h-14 rounded-full"
                size="icon"
              >
                <Calculator className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Menu Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                className="bg-white border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 w-14 h-14 rounded-full"
                size="icon"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Scroll to Top */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="bg-white border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 w-14 h-14 rounded-full"
                size="icon"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Tooltip for first-time visitors */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-16 top-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Calculate your payment plan
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionBar;