import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Complete Solar Buying Guide for Texas Homeowners 2025',
  description: 'Step-by-step guide to buying solar panels in Texas. Learn how to evaluate installers, compare quotes, understand financing, and avoid common mistakes.',
  keywords: ['solar buying guide texas', 'how to buy solar panels', 'solar installer selection', 'solar quotes comparison', 'texas solar guide'],
  openGraph: {
    title: 'Complete Solar Buying Guide for Texas Homeowners 2025',
    description: 'Step-by-step guide to buying solar panels in Texas',
    type: 'article',
  },
}

export const revalidate = 86400 // Revalidate once per day

export default function SolarBuyingGuidePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/learn">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Hub
        </Link>
      </Button>

      <article className="prose prose-lg max-w-none">
        <h1>Complete Solar Buying Guide for Texas Homeowners</h1>
        <p className="lead">
          Buying solar panels is a significant investment that can save you thousands of dollars over decades. This comprehensive guide walks you through every step of the solar buying process in Texas, from initial assessment to system activation.
        </p>

        <h2>Step 1: Evaluate Your Home&apos;s Solar Potential</h2>

        <h3>Roof Assessment</h3>
        <p>Before going solar, evaluate your roof:</p>
        <ul>
          <li><strong>Age & Condition:</strong> Roofs should have at least 15-20 years of life remaining</li>
          <li><strong>Material:</strong> Asphalt shingles, metal, and tile work well. Wood shake may require special mounting</li>
          <li><strong>Orientation:</strong> South-facing roofs are ideal in Texas, but east/west can work too</li>
          <li><strong>Pitch:</strong> 15-40 degree pitch is optimal for Texas latitude</li>
          <li><strong>Available Space:</strong> Need 100-400 sq ft depending on system size</li>
        </ul>

        <h3>Shading Analysis</h3>
        <p>Shading significantly impacts solar production:</p>
        <ul>
          <li>Ideally, your roof should be shade-free from 9am-3pm</li>
          <li>Even partial shading can reduce system output by 25-40%</li>
          <li>Consider tree trimming or removal if necessary</li>
          <li>Microinverters can help minimize shading impact</li>
        </ul>

        <h3>Energy Usage Review</h3>
        <p>Analyze your electricity consumption:</p>
        <ul>
          <li>Review 12 months of utility bills</li>
          <li>Calculate average monthly kWh usage</li>
          <li>Note seasonal variations (AC usage in summer)</li>
          <li>Consider future changes (EV, pool, home additions)</li>
        </ul>

        <h2>Step 2: Calculate System Size and Cost</h2>

        <h3>Sizing Your System</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
          <p className="font-semibold">Quick Sizing Formula:</p>
          <p>Annual kWh ÷ 1,400 (Texas sun hours) = System size in kW</p>
          <p className="text-sm text-gray-600 mt-2">Example: 12,000 kWh/year ÷ 1,400 = 8.6 kW system</p>
        </div>

        <h3>Cost Expectations</h3>
        <ul>
          <li><strong>5 kW system:</strong> $12,500-$17,500 ($8,750-$12,250 after tax credit)</li>
          <li><strong>7 kW system:</strong> $17,500-$24,500 ($12,250-$17,150 after tax credit)</li>
          <li><strong>10 kW system:</strong> $25,000-$35,000 ($17,500-$24,500 after tax credit)</li>
        </ul>

        <h2>Step 3: Research and Vet Installers</h2>

        <h3>Installer Qualifications Checklist</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <span><strong>NABCEP Certification:</strong> Industry gold standard for installer quality</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <span><strong>License & Insurance:</strong> Valid Texas electrical contractor license and liability insurance</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <span><strong>Local Experience:</strong> At least 3-5 years installing in Texas</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <span><strong>Customer Reviews:</strong> 4.5+ stars with substantial reviews (50+)</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <span><strong>Warranty Offerings:</strong> Comprehensive workmanship warranty (10-25 years)</span>
          </div>
        </div>

        <h3>Red Flags to Avoid</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <span>High-pressure sales tactics or &quot;sign today&quot; demands</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <span>Unrealistic promises (&quot;eliminate your electric bill&quot;)</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <span>Requests for full payment upfront</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <span>No physical business address or phone number</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <span>Lack of transparency about equipment or costs</span>
          </div>
        </div>

        <h2>Step 4: Get Multiple Quotes</h2>

        <h3>How Many Quotes?</h3>
        <p>Get at least <strong>3-5 quotes</strong> from different installers. This helps you:</p>
        <ul>
          <li>Understand fair market pricing</li>
          <li>Compare equipment options</li>
          <li>Evaluate different installer approaches</li>
          <li>Negotiate better terms</li>
        </ul>

        <h3>What Should Be Included in a Quote?</h3>
        <p>A comprehensive solar quote should include:</p>
        <ul>
          <li><strong>System Specifications:</strong> Panel brand/model, quantity, wattage, inverter type</li>
          <li><strong>Production Estimate:</strong> Expected annual kWh production</li>
          <li><strong>Cost Breakdown:</strong> Equipment, labor, permits, interconnection fees</li>
          <li><strong>Incentive Calculations:</strong> Federal tax credit, utility rebates, net metering value</li>
          <li><strong>Savings Projection:</strong> Monthly and 25-year savings estimates</li>
          <li><strong>Warranty Details:</strong> Panel, inverter, and workmanship warranties</li>
          <li><strong>Timeline:</strong> Expected installation schedule</li>
          <li><strong>Payment Terms:</strong> Deposit, milestone payments, final payment</li>
        </ul>

        <h2>Step 5: Review Financing Options</h2>

        <h3>Cash Purchase (Best ROI)</h3>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>Lowest total cost (no interest)</li>
          <li>Fastest payback period (7-10 years)</li>
          <li>Maximum 25-year savings ($30,000-50,000)</li>
          <li>Qualify for all incentives</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Requires significant upfront capital</li>
          <li>Ties up money that could be invested elsewhere</li>
        </ul>

        <h3>Solar Loan</h3>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>$0-1,000 down payment</li>
          <li>Own the system and keep all incentives</li>
          <li>Monthly payment often less than current electric bill</li>
          <li>Various term lengths (10-25 years)</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Interest increases total cost</li>
          <li>Longer payback period (12-15 years)</li>
        </ul>

        <h3>Solar Lease</h3>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>$0 upfront cost</li>
          <li>No maintenance responsibility</li>
          <li>Predictable monthly payments</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Don&apos;t own the system</li>
          <li>Leasing company keeps incentives</li>
          <li>Complicates home sale</li>
          <li>Lower long-term savings</li>
        </ul>

        <h3>Power Purchase Agreement (PPA)</h3>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>$0 upfront cost</li>
          <li>Pay only for power produced</li>
          <li>Locked-in rate (usually lower than utility)</li>
        </ul>
        <p><strong>Cons:</strong></p>
        <ul>
          <li>Don&apos;t own system</li>
          <li>PPA company keeps incentives</li>
          <li>Annual escalator clause increases rate</li>
          <li>Can complicate home sale</li>
        </ul>

        <h2>Step 6: Review and Sign the Contract</h2>

        <h3>Contract Terms to Review Carefully</h3>
        <ul>
          <li><strong>System specifications:</strong> Panel model, quantity, inverter type must match quote</li>
          <li><strong>Total price:</strong> Ensure all costs are clearly stated</li>
          <li><strong>Payment schedule:</strong> Typical: 10% deposit, 50% at installation start, 40% at completion</li>
          <li><strong>Production guarantee:</strong> System should produce within 10% of estimate</li>
          <li><strong>Warranty coverage:</strong> Equipment and workmanship warranties clearly defined</li>
          <li><strong>Timeline:</strong> Installation start/completion dates with penalty clauses</li>
          <li><strong>Permitting responsibility:</strong> Installer should handle all permits</li>
          <li><strong>Cancellation terms:</strong> Your rights to cancel and any penalties</li>
          <li><strong>What happens if you sell:</strong> Transferability and requirements</li>
        </ul>

        <h3>Questions to Ask Before Signing</h3>
        <ol>
          <li>Who handles permitting and utility interconnection?</li>
          <li>What happens if production is lower than estimated?</li>
          <li>Who do I contact if there&apos;s an issue post-installation?</li>
          <li>What maintenance is required and who performs it?</li>
          <li>How is warranty service handled?</li>
          <li>What if I need roof repairs after installation?</li>
          <li>Can I add more panels later?</li>
          <li>What monitoring system is included?</li>
        </ol>

        <h2>Step 7: Installation Process</h2>

        <h3>Typical Installation Timeline</h3>
        <div className="bg-gray-50 border rounded-lg p-4 my-4">
          <p><strong>Week 1-2:</strong> Permit applications submitted</p>
          <p><strong>Week 3-4:</strong> Permit approval (varies by jurisdiction)</p>
          <p><strong>Week 5:</strong> Equipment delivery and installation scheduling</p>
          <p><strong>Week 6:</strong> Installation (1-3 days)</p>
          <p><strong>Week 7:</strong> Electrical inspection</p>
          <p><strong>Week 8:</strong> Utility interconnection and permission to operate</p>
        </div>

        <h3>What to Expect During Installation</h3>
        <ul>
          <li><strong>Day 1:</strong> Mounting system installation and electrical work</li>
          <li><strong>Day 2:</strong> Panel installation and inverter setup</li>
          <li><strong>Day 3:</strong> Electrical connections, testing, and cleanup</li>
        </ul>

        <h2>Common Mistakes to Avoid</h2>

        <div className="space-y-4 my-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold">Mistake 1: Not Getting Multiple Quotes</p>
            <p className="text-sm">Prices can vary 20-30% between installers. Always compare.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold">Mistake 2: Focusing Only on Price</p>
            <p className="text-sm">Cheapest option may use inferior equipment or cut corners on installation quality.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold">Mistake 3: Ignoring Roof Condition</p>
            <p className="text-sm">Replacing roof after solar installation is expensive. Handle roofing first if needed.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold">Mistake 4: Not Verifying Installer Credentials</p>
            <p className="text-sm">Always verify NABCEP certification, license, and insurance before signing.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold">Mistake 5: Signing Without Reading Contract</p>
            <p className="text-sm">Read every page. Don&apos;t let sales pressure rush you into signing.</p>
          </div>
        </div>

        <h2>Texas-Specific Considerations</h2>

        <h3>ERCOT Grid</h3>
        <p>Texas operates its own electrical grid (ERCOT), which affects:</p>
        <ul>
          <li>Net metering policies (varies by retail provider)</li>
          <li>Interconnection procedures</li>
          <li>Battery storage benefits during grid events</li>
        </ul>

        <h3>Texas Solar Rights Law</h3>
        <p>Texas law protects your right to install solar:</p>
        <ul>
          <li>HOAs cannot prohibit solar installations</li>
          <li>HOAs can regulate placement and appearance within reason</li>
          <li>Municipal regulations cannot prevent solar adoption</li>
        </ul>

        <h3>Utility-Specific Programs</h3>
        <ul>
          <li><strong>Austin Energy:</strong> Value of Solar tariff program</li>
          <li><strong>CPS Energy:</strong> $0.60/watt rebate program</li>
          <li><strong>El Paso Electric:</strong> Renewable energy credits</li>
          <li><strong>Oncor:</strong> Streamlined interconnection process</li>
        </ul>

        <h2>Ready to Get Solar Quotes?</h2>
        <p>Now that you understand the solar buying process, take the next step by getting custom quotes from NABCEP certified installers in your area.</p>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <Button asChild size="lg">
            <Link href="/quote">Get Free Solar Quotes</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/installers">Browse TX Installers</Link>
          </Button>
        </div>
      </article>
    </main>
  )
}
