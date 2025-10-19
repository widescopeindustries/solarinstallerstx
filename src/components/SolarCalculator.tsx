import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Zap, DollarSign, Leaf, TrendingUp } from "lucide-react";

interface SolarCalculatorProps {
  onGetQuote: (data: CalculatorData) => void;
}

interface CalculatorData {
  monthlyBill: number;
  zipCode: string;
  roofSize: number;
  annualSavings: number;
  systemSize: number;
  paybackPeriod: number;
}

export const SolarCalculator = ({ onGetQuote }: SolarCalculatorProps) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(150);
  const [zipCode, setZipCode] = useState<string>("");
  const [roofSize, setRoofSize] = useState<number>(2000);
  const [calculations, setCalculations] = useState<CalculatorData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Texas-specific solar calculations
  const calculateSolarSavings = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      // Texas average: 5.2 peak sun hours, $0.12/kWh average rate
      const peakSunHours = 5.2;
      const electricityRate = 0.12;
      const systemEfficiency = 0.85;
      
      // Calculate system size needed (kW)
      const annualUsage = monthlyBill * 12 / electricityRate; // kWh
      const systemSize = Math.round((annualUsage / (peakSunHours * 365 * systemEfficiency)) * 10) / 10;
      
      // Calculate annual savings
      const annualSavings = Math.round(annualUsage * electricityRate * 0.9); // 90% offset
      
      // Calculate payback period (assuming $3/watt average cost)
      const systemCost = systemSize * 1000 * 3; // $3/watt
      const federalCredit = systemCost * 0.26; // 26% federal tax credit
      const netCost = systemCost - federalCredit;
      const paybackPeriod = Math.round((netCost / annualSavings) * 10) / 10;
      
      const result: CalculatorData = {
        monthlyBill,
        zipCode,
        roofSize,
        annualSavings,
        systemSize,
        paybackPeriod
      };
      
      setCalculations(result);
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (monthlyBill > 0) {
      calculateSolarSavings();
    }
  }, [monthlyBill, zipCode, roofSize]);

  const handleGetQuote = () => {
    if (calculations) {
      onGetQuote(calculations);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Calculator className="h-6 w-6 text-primary" />
          Solar Savings Calculator
        </CardTitle>
        <p className="text-muted-foreground">
          Get your personalized solar savings estimate in seconds
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-bill">Monthly Electric Bill</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="monthly-bill"
                type="number"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="pl-10"
                placeholder="150"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zip-code">ZIP Code</Label>
            <Input
              id="zip-code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="78701"
              maxLength={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roof-size">Roof Size (sq ft)</Label>
            <Input
              id="roof-size"
              type="number"
              value={roofSize}
              onChange={(e) => setRoofSize(Number(e.target.value))}
              placeholder="2000"
            />
          </div>
        </div>

        {/* Results */}
        {calculations && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-semibold">System Size</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {calculations.systemSize} kW
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Annual Savings</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ${calculations.annualSavings.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Payback Period</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {calculations.paybackPeriod} years
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Environmental Impact</span>
              </div>
              <div className="text-lg text-green-600">
                Prevents {Math.round(calculations.annualSavings * 0.7)} lbs of CO₂ annually
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">NABCEP Certified Installers</Badge>
              <Badge variant="secondary">26% Federal Tax Credit</Badge>
              <Badge variant="secondary">25-Year Warranty</Badge>
              <Badge variant="secondary">Free Consultation</Badge>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto px-8"
                onClick={handleGetQuote}
              >
                Get Your Free Solar Quote
              </Button>
              <p className="text-sm text-muted-foreground">
                No obligation • Free consultation • NABCEP certified installers
              </p>
            </div>
          </div>
        )}

        {isCalculating && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Calculating your solar savings...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
