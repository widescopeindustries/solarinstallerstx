import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface SolarCalculatorProps {
  className?: string;
  onGetQuote?: (data: any) => void;
}

export const SolarCalculator = ({ className = "", onGetQuote }: SolarCalculatorProps) => {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [roofSize, setRoofSize] = useState(2000);
  const [city, setCity] = useState("Austin");
  const [systemSize, setSystemSize] = useState(8);
  const [results, setResults] = useState<any>(null);

  // Texas city data with solar potential and utility rates
  const cityData = {
    Austin: { sunHours: 5.2, utilityRate: 0.12, rebate: 2500 },
    Houston: { sunHours: 5.0, utilityRate: 0.11, rebate: 0 },
    Dallas: { sunHours: 5.1, utilityRate: 0.13, rebate: 1000 },
    "San Antonio": { sunHours: 5.3, utilityRate: 0.10, rebate: 2500 },
    "Fort Worth": { sunHours: 5.1, utilityRate: 0.12, rebate: 500 },
    "El Paso": { sunHours: 5.8, utilityRate: 0.09, rebate: 0 }
  };

  const calculateSavings = () => {
    const cityInfo = cityData[city as keyof typeof cityData];
    const annualBill = monthlyBill * 12;
    const systemCost = systemSize * 3000; // $3 per watt average
    const federalCredit = systemCost * 0.26; // 26% federal tax credit
    const localRebate = cityInfo.rebate;
    const netCost = systemCost - federalCredit - localRebate;
    
    const annualProduction = systemSize * cityInfo.sunHours * 365;
    const annualSavings = annualProduction * cityInfo.utilityRate;
    const paybackPeriod = netCost / annualSavings;
    const lifetimeSavings = (annualSavings * 25) - netCost; // 25-year system life
    
    setResults({
      systemCost,
      netCost,
      federalCredit,
      localRebate,
      annualSavings,
      monthlySavings: annualSavings / 12,
      paybackPeriod,
      lifetimeSavings,
      annualProduction,
      cityInfo
    });
  };

  useEffect(() => {
    calculateSavings();
  }, [monthlyBill, roofSize, city, systemSize]);

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Solar Savings Calculator
        </h2>
        <p className="text-muted-foreground text-lg">
          Calculate your potential solar savings and ROI in Texas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Solar Potential</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="monthly-bill">Monthly Electric Bill</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[monthlyBill]}
                  onValueChange={(value) => setMonthlyBill(value[0])}
                  max={500}
                  min={50}
                  step={10}
                  className="flex-1"
                />
                <span className="text-lg font-semibold">${monthlyBill}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="roof-size">Roof Size (sq ft)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[roofSize]}
                  onValueChange={(value) => setRoofSize(value[0])}
                  max={4000}
                  min={1000}
                  step={100}
                  className="flex-1"
                />
                <span className="text-lg font-semibold">{roofSize} sq ft</span>
              </div>
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(cityData).map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="system-size">System Size (kW)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[systemSize]}
                  onValueChange={(value) => setSystemSize(value[0])}
                  max={20}
                  min={3}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-lg font-semibold">{systemSize} kW</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Solar Savings</CardTitle>
          </CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${Math.round(results.monthlySavings)}
                    </div>
                    <div className="text-sm text-green-700">Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${Math.round(results.annualSavings).toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Annual Savings</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(results.paybackPeriod)} years
                    </div>
                    <div className="text-sm text-purple-700">Payback Period</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      ${Math.round(results.lifetimeSavings / 1000)}K
                    </div>
                    <div className="text-sm text-orange-700">Lifetime Savings</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">System Cost:</span>
                    <span className="font-semibold">${results.systemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Federal Tax Credit (26%):</span>
                    <span className="font-semibold text-green-600">-${results.federalCredit.toLocaleString()}</span>
                  </div>
                  {results.localRebate > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{city} Rebate:</span>
                      <span className="font-semibold text-green-600">-${results.localRebate.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium">Net Cost:</span>
                    <span className="font-semibold text-blue-600">${results.netCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Peak Sun Hours: {results.cityInfo.sunHours}/day
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Annual Production: {Math.round(results.annualProduction).toLocaleString()} kWh
                  </Badge>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg" onClick={() => onGetQuote?.(results)}>
                    Get Free Solar Quote
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Find Local Installers
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-3">💡 Calculator Notes</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Calculations based on current Texas utility rates and federal incentives</li>
          <li>• Actual savings may vary based on roof orientation, shading, and energy usage</li>
          <li>• System costs include installation, permits, and equipment</li>
          <li>• 25-year system warranty and performance guarantee included</li>
        </ul>
      </div>
    </div>
  );
};