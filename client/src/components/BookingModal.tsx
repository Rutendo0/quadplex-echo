import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Home, User, Mail, Phone, FileText, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  bookingType: z.enum(["reservation", "purchase"]),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
  calculationData: any;
}

export default function BookingModal({ isOpen, onClose, property, calculationData }: BookingModalProps) {
  const [bookingType, setBookingType] = useState<"reservation" | "purchase">("reservation");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookingType: "reservation"
    }
  });

  const bookingMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/bookings", data),
    onSuccess: (response) => {
      toast({
        title: "Booking Successful!",
        description: `Your ${bookingType} has been confirmed. We'll contact you shortly with next steps.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    const bookingData = {
      propertyId: property.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      bookingType: bookingType,
      depositAmount: Math.round(calculationData.depositAmount * 100), // Convert to cents
      totalPrice: calculationData.propertyPrice * 100, // Convert to cents
      paymentPlan: {
        loanAmount: calculationData.loanAmount,
        monthlyPayment: calculationData.monthlyPayment,
        loanTerm: calculationData.loanTerm,
        interestRate: calculationData.interestRate,
        depositPercent: calculationData.depositPercent
      },
      specialRequests: data.specialRequests
    };

    bookingMutation.mutate(bookingData);
  };

  const handleBookingTypeChange = (type: "reservation" | "purchase") => {
    setBookingType(type);
    setValue("bookingType", type);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <Home className="h-6 w-6 text-primary" />
            <span>Book Your Property</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Property Summary */}
          <div className="space-y-4">
            <Card className="property-card">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{property.name}</h3>
                <p className="text-muted-foreground mb-4">{property.shortDescription}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Property Price:</span>
                    <span className="font-bold text-primary">${calculationData.propertyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Deposit ({calculationData.depositPercent}%):</span>
                    <span className="font-bold text-green-600">${Math.round(calculationData.depositAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-bold">${Math.round(calculationData.loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-bold text-blue-600">${Math.round(calculationData.monthlyPayment).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Booking Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant={bookingType === "reservation" ? "default" : "outline"}
                    className="w-full h-auto p-4 flex flex-col space-y-2"
                    onClick={() => handleBookingTypeChange("reservation")}
                    data-testid="button-reservation"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Reserve Now</span>
                    <span className="text-xs opacity-75">Secure with deposit</span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant={bookingType === "purchase" ? "default" : "outline"}
                    className="w-full h-auto p-4 flex flex-col space-y-2"
                    onClick={() => handleBookingTypeChange("purchase")}
                    data-testid="button-purchase"
                  >
                    <DollarSign className="h-5 w-5" />
                    <span className="font-medium">Purchase</span>
                    <span className="text-xs opacity-75">Complete transaction</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="customerName"
                  {...register("customerName")}
                  placeholder="Enter your full name"
                  data-testid="input-customer-name"
                />
                {errors.customerName && (
                  <p className="text-sm text-destructive">{errors.customerName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  {...register("customerEmail")}
                  placeholder="Enter your email address"
                  data-testid="input-customer-email"
                />
                {errors.customerEmail && (
                  <p className="text-sm text-destructive">{errors.customerEmail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number *</span>
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  {...register("customerPhone")}
                  placeholder="Enter your phone number"
                  data-testid="input-customer-phone"
                />
                {errors.customerPhone && (
                  <p className="text-sm text-destructive">{errors.customerPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Special Requests (Optional)</span>
                </Label>
                <Textarea
                  id="specialRequests"
                  {...register("specialRequests")}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                  data-testid="textarea-special-requests"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel-booking"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={bookingMutation.isPending}
                className="btn-premium flex-1"
                data-testid="button-confirm-booking"
              >
                {bookingMutation.isPending ? (
                  "Processing..."
                ) : (
                  `Confirm ${bookingType === "reservation" ? "Reservation" : "Purchase"}`
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-4">
              {bookingType === "reservation" ? (
                <>
                  <Badge className="mb-2">Reservation Terms</Badge>
                  <p>A deposit of ${Math.round(calculationData.depositAmount).toLocaleString()} secures your property. Full payment terms will be arranged after confirmation.</p>
                </>
              ) : (
                <>
                  <Badge className="mb-2">Purchase Terms</Badge>
                  <p>Complete your property purchase with our flexible payment plans. Loan pre-approval can be arranged.</p>
                </>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}