import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface TestimonialsCarouselProps {
  className?: string;
}

const TestimonialsCarousel = ({ className = "" }: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mukamuri",
      role: "Business Owner",
      location: "Harare",
      rating: 5,
      text: "Ashumi Estates exceeded our expectations. The payment plan made homeownership accessible, and the quality of construction is exceptional. Our family loves the riverfront access and community amenities.",
      property: "4-Bed Double-Storey Home",
      image: "https://images.unsplash.com/photo-1494790108755-2616b056b8b4?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "James Chiweshe",
      role: "IT Professional",
      location: "Diaspora (UK)",
      rating: 5,
      text: "The diaspora mortgage arrangement was seamless. Professional management and international standards gave us confidence in our investment. The Innovation Hub is perfect for remote work.",
      property: "3-Bed Single-Storey Home",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Tendai Mazvita",
      role: "Medical Professional",
      location: "Harare",
      rating: 5,
      text: "The on-site clinic and green spaces create a perfect work-life balance. The sustainability features and solar power show genuine commitment to eco-friendly living.",
      property: "Penthouse Apartment",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Michael Dzapasi",
      role: "Young Professional",
      location: "Harare",
      rating: 5,
      text: "The studio apartment with private garden access is perfect for young professionals. The rental flexibility and inclusive maintenance make it hassle-free living.",
      property: "Ground-Floor Studio",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Grace Mujuru",
      role: "Family of Four",
      location: "Harare",
      rating: 5,
      text: "The children's play areas and community football pitch keep our kids active and happy. Professional management ensures everything is well-maintained and secure.",
      property: "3-Bed Duplex",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Auto-rotate every 6 seconds

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Residents Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from families who call Ashumi Estates home
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-white shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-white shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Photo */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Stars */}
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                        "{testimonials[currentIndex].text}"
                      </blockquote>

                      {/* Author Info */}
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600 mb-2">
                          {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                        </div>
                        <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {testimonials[currentIndex].property}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-700">Resident Satisfaction</div>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
            <div className="text-gray-700">Happy Families</div>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">5.0</div>
            <div className="text-gray-700">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;