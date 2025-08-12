import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Calendar, TrendingUp, Home } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentCalculatorProps {
  propertyPrice: number;
  propertyName: string;
  onBookingClick: (calculationData: any) => void;
}

export default function PaymentCalculator({ propertyPrice, propertyName, onBookingClick }: PaymentCalculatorProps) {
  const [depositPercent, setDepositPercent] = useState(10);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);

  const calculations = useMemo(() => {
    const depositAmount = propertyPrice * (depositPercent / 100);
    const loanAmount = propertyPrice - depositAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
    const totalCost = propertyPrice + totalInterest;

    return {
      depositAmount,
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalCost,
      weeklyPayment: monthlyPayment / 4.33
    };
  }, [propertyPrice, depositPercent, loanTerm, interestRate]);

  const handleBookProperty = () => {
    onBookingClick({
      propertyPrice,
      depositAmount: calculations.depositAmount,
      loanAmount: calculations.loanAmount,
      monthlyPayment: calculations.monthlyPayment,
      loanTerm,
      interestRate,
      depositPercent
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-serif">Payment Calculator</CardTitle>
          </div>
          <p className="text-muted-foreground">Calculate your home loan payments for {propertyName}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Price Display */}
          <div className="text-center p-4 bg-primary/5 rounded-lg border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Property Price</span>
            </div>
            <div className="text-3xl font-bold text-primary">
              ${propertyPrice.toLocaleString()}
            </div>
          </div>

          {/* Deposit Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Deposit Amount</Label>
              <Badge variant="secondary">{depositPercent}%</Badge>
            </div>
            <Slider
              value={[depositPercent]}
              onValueChange={(value) => setDepositPercent(value[0])}
              max={30}
              min={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5%</span>
              <span className="font-medium text-primary">
                ${calculations.depositAmount.toLocaleString()}
              </span>
              <span>30%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Loan Term</Label>
              <Badge variant="secondary">{loanTerm} years</Badge>
            </div>
            <Slider
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              max={30}
              min={15}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>15 years</span>
              <span>30 years</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Interest Rate</Label>
              <Badge variant="secondary">{interestRate}% p.a.</Badge>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              max={8}
              min={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3.0%</span>
              <span>8.0%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="property-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="font-medium">Monthly Payment</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${Math.round(calculations.monthlyPayment).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${Math.round(calculations.weeklyPayment).toLocaleString()}/week
            </div>
          </CardContent>
        </Card>

        <Card className="property-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Loan Amount</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${calculations.loanAmount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              After ${calculations.depositAmount.toLocaleString()} deposit
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Cost Breakdown */}
      <Card className="property-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Total Investment Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Initial Deposit ({depositPercent}%)</span>
              <span className="font-bold text-primary">${calculations.depositAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Total Interest ({loanTerm} years)</span>
              <span className="font-bold text-orange-600">${Math.round(calculations.totalInterest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t-2 border-primary/20">
              <span className="text-lg font-bold">Total Investment</span>
              <span className="text-xl font-bold text-primary">${Math.round(calculations.totalCost).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Action */}
      <motion.div 
        className="text-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          onClick={handleBookProperty}
          size="lg"
          className="btn-premium w-full md:w-auto px-12 py-6 text-lg"
          data-testid="button-book-property"
        >
          <Home className="h-5 w-5 mr-2" />
          Book This Property Now
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Secure with ${calculations.depositAmount.toLocaleString()} deposit
        </p>
      </motion.div>
    </div>
  );
}