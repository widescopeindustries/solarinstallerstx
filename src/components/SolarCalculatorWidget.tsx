import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Sun, DollarSign, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export const SolarCalculatorWidget = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>("150");
  const [zipCode, setZipCode] = useState<string>("");
  const [systemSize, setSystemSize] = useState<string>("6");
  const [showResults, setShowResults] = useState(false);

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill) || 0;
    const size = parseFloat(systemSize) || 0;

    // Calculate annual savings (approximate)
    const annualBill = bill * 12;
    const solarOffsetPercent = Math.min(size * 15, 100); // ~15% offset per kW
    const annualSavings = (annualBill * solarOffsetPercent) / 100;
    const savings25Years = annualSavings * 25;

    // Calculate system cost
    const systemCost = size * 3000; // $3/watt average
    const systemCostAfterTaxCredit = systemCost * 0.7; // 30% federal tax credit

    // Calculate payback period
    const paybackYears = systemCostAfterTaxCredit / annualSavings;

    return {
      annualSavings: Math.round(annualSavings),
      savings25Years: Math.round(savings25Years),
      systemCost: Math.round(systemCost),
      systemCostAfterTaxCredit: Math.round(systemCostAfterTaxCredit),
      paybackYears: paybackYears.toFixed(1),
      monthlyEquivalent: Math.round(annualSavings / 12)
    };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const results = showResults ? calculateSavings() : null;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">Solar Savings Calculator</CardTitle>
            <CardDescription>
              Estimate your potential solar savings in seconds
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyBill" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Monthly Electric Bill
              </Label>
              <Input
                id="monthlyBill"
                type="number"
                placeholder="150"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                required
                min="0"
                step="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="78701"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                maxLength={5}
                pattern="[0-9]{5}"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemSize" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                System Size (kW)
              </Label>
              <Input
                id="systemSize"
                type="number"
                placeholder="6"
                value={systemSize}
                onChange={(e) => setSystemSize(e.target.value)}
                required
                min="3"
                max="15"
                step="0.5"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Calculator className="h-5 w-5 mr-2" />
            Calculate My Savings
          </Button>
        </form>

        {results && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Your Potential Savings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Annual Savings</div>
                    <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                      ${results.annualSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ~${results.monthlyEquivalent}/month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">25-Year Savings</div>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                      ${results.savings25Years.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Over panel lifetime
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">System Cost (After Tax Credit)</div>
                    <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                      ${results.systemCostAfterTaxCredit.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-through">
                      Before: ${results.systemCost.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                    <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                      {results.paybackYears} years
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Time to break even
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Note:</strong> These are estimates based on average Texas solar conditions,
                  electricity rates, and system performance. Actual savings vary by location, usage,
                  and installer pricing.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/quote">
                    Get Accurate Quote from NABCEP Certified Installers
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Get a precise quote from{" "}
              <Link href="/installers" className="text-primary hover:underline">
                certified installers
              </Link>
              {" "}in your area
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
