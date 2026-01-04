import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle } from "lucide-react"

export function BuybackComparisonTable() {
  const plans = [
    {
      provider: "Almika Solar",
      planName: "Solar One 36",
      type: "1:1 Net Metering (Capped)",
      importRate: "14.2¢ / kWh",
      exportRate: "14.2¢ / kWh",
      term: "36 Months",
      monthlyFee: "$18.95",
      pros: ["True 1:1 match up to usage", "Rollover credits"],
      cons: ["High base charge", "Credits don't cash out"],
      rating: "Best Value",
    },
    {
      provider: "Gexa Energy",
      planName: "Solar Export Saver 24",
      type: "Real-Time / Avoided Cost",
      importRate: "13.8¢ / kWh",
      exportRate: "Market Rate (~3-5¢)",
      term: "24 Months",
      monthlyFee: "$9.95",
      pros: ["Lower import rate", "Good for batteries"],
      cons: ["Low export value", "Complex billing"],
      rating: "Good with Battery",
    },
    {
      provider: "Octopus Energy",
      planName: "Octopus Solar 12",
      type: "Real-Time Wholesale",
      importRate: "14.5¢ / kWh",
      exportRate: "Wholesale (up to $5.00!)",
      term: "12 Months",
      monthlyFee: "$10.00",
      pros: ["Pass-through wholesale", "No base charge markups"],
      cons: ["Volatile export rates", "Requires market knowledge"],
      rating: "Best for Techies",
    },
    {
      provider: "Chariot Energy",
      planName: "Shine 24",
      type: "1:1 Net Metering (RTW)",
      importRate: "15.1¢ / kWh",
      exportRate: "15.1¢ / kWh",
      term: "24 Months",
      monthlyFee: "$14.95",
      pros: ["Simple structure", "Green energy focus"],
      cons: ["Higher import rate", "Credits expire annually"],
      rating: "Simple Choice",
    },
    {
      provider: "TXU Energy",
      planName: "Solar Buyback Match",
      type: "Capped Credit",
      importRate: "16.5¢ / kWh",
      exportRate: "Matches Import (Capped)",
      term: "12/24 Months",
      monthlyFee: "$9.95",
      pros: ["Trusted brand", "Stable billing"],
      cons: ["Very high import rate", "Strict caps"],
      rating: "Reliable",
    },
  ]

  return (
    <Card className="w-full shadow-lg border-primary/20 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Texas Solar Buyback Plans (2026)</CardTitle>
            <CardDescription className="text-base mt-2">
              Compare the top electricity plans for solar owners. Updated for the 2026 market conditions.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm py-1 px-3 border-primary/50 text-primary">
            Updated: Jan 2026
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[180px] font-bold">Provider & Plan</TableHead>
                <TableHead className="font-bold">Buyback Type</TableHead>
                <TableHead className="font-bold text-right">Import Rate</TableHead>
                <TableHead className="font-bold text-right">Export Credit</TableHead>
                <TableHead className="font-bold">Monthly Fee</TableHead>
                <TableHead className="w-[200px] font-bold">Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.planName} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-primary">{plan.provider}</span>
                      <span className="text-sm text-muted-foreground">{plan.planName}</span>
                      <span className="text-xs text-muted-foreground mt-1">{plan.term}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{plan.type}</span>
                      {plan.type.includes("1:1") ? (
                        <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Best for Solar Only</Badge>
                      ) : (
                        <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Best for Battery</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-base">{plan.importRate}</TableCell>
                  <TableCell className="text-right text-base font-semibold text-green-700">{plan.exportRate}</TableCell>
                  <TableCell>{plan.monthlyFee}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-sm block">{plan.rating}</span>
                      <ul className="text-xs space-y-1">
                        {plan.pros.slice(0, 1).map((pro) => (
                          <li key={pro} className="flex items-center gap-1 text-green-700">
                            <Check className="h-3 w-3" /> {pro}
                          </li>
                        ))}
                        {plan.cons.slice(0, 1).map((con) => (
                          <li key={con} className="flex items-center gap-1 text-red-600">
                            <X className="h-3 w-3" /> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
