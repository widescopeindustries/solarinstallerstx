import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";

const TexasSolarIncentives2025 = () => (
  <>
    <SEOHead
      title="2025 Texas Solar Incentives & Rebates Guide"
      description="Explore federal and Texas solar incentives, tax credits, and utility rebates you can save."
      canonicalUrl="https://solarinstallerstx.com/texas-solar-incentives-2025"
      schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "2025 Texas Solar Incentives & Rebates Guide",
        "author": { "@type": "Organization", "name": "SolarInstallersTX" },
        "datePublished": "2025-01-10",
        "image": "https://solarinstallerstx.com/images/texas-incentives-hero.jpg"
      }}
    />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article className="prose lg:prose-xl max-w-none">
          <h1>2025 Texas Solar Incentives &amp; Rebates Guide</h1>
          <OptimizedImage
            src="/images/texas-incentives-hero.webp"
            alt="Homeowner reviewing 2025 Texas solar incentive savings"
            width={1280}
            height={720}
            priority
          />

          <p><strong>Updated January 2025:</strong> Texas homeowners can still claim a <em>26 % Federal Investment Tax Credit</em> (ITC) plus a stack of local utility rebates worth up to $2,500. This guide covers every statewide and city-specific incentive so you can maximise ROI on a NABCEP-certified installation.</p>

          <h2>Quick-Reference Table – 2025 Incentives</h2>
          <table>
            <thead>
              <tr><th>Program</th><th>Value</th><th>Expires</th><th>Requirements</th></tr>
            </thead>
            <tbody>
              <tr><td>Federal ITC</td><td>26 % of system cost</td><td>Dec 31 2025</td><td>Tax liability, new system</td></tr>
              <tr><td>Austin Energy Rebate</td><td>$0.50 / Watt (max $2,500)</td><td>When funds depleted</td><td>NABCEP installer</td></tr>
              <tr><td>CPS Energy (San Antonio)</td><td>$2,500 flat</td><td>2025 fund</td><td>Eligible zip codes</td></tr>
              <tr><td>Oncor Performance - Based</td><td>$0.037 / kWh for 10 yrs</td><td>Ongoing</td><td>Interconnect approval</td></tr>
            </tbody>
          </table>

          <h2>Federal Solar Investment Tax Credit (ITC)</h2>
          <p>The ITC remains the single largest incentive, reducing your income-tax bill by 26 % of the total solar project cost. On a $18,000 system that’s <strong>$4,680</strong> back the next tax season.</p>

          {/* Incentives Calculator CTA */}
          <div className="my-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-2">Ready to Maximize Your Solar Savings?</h3>
              <p className="text-sm text-gray-700 mb-4">Get free quotes from certified Texas solar installers who can help you claim all available federal, state, and utility incentives.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Get Free Solar Quotes
                </a>
                <a href="/learn/texas-incentives" className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 font-semibold border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  Complete Incentives Guide
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-3">✓ Compare multiple installers &nbsp; ✓ No obligation &nbsp; ✓ Save up to 20%</p>
          </div>

          <h2>Utility-Specific Rebates</h2>
          <h3>Austin Energy</h3>
          <p>Cash rebate of $0.50 per installed watt, capped at $2,500. Must use a NABCEP-certified contractor and take a short solar education course.</p>

          <h3>CPS Energy (San Antonio)</h3>
          <p>Flat $2,500 incentive applied as bill credit. Bonus $500 for income-qualified customers.</p>

          <h2>Property-Tax Exemption</h2>
          <p>Texas exempts 100 % of the added home value created by solar PV, so your appraisal won’t jump even though resale value increases by ≈ 4 %.</p>

          <h2>Net-Metering &amp; Buyback Plans</h2>
          <p>While not mandated statewide, most competitive Retail Electric Providers offer solar buyback programs. Compare plans from Green Mountain, Octopus and TXU to ensure exported kWh are credited at retail rates.</p>

          <h2>Interactive Map – Find Incentives Near You</h2>
          <iframe
            title="Texas solar incentives map"
            loading="lazy"
            className="w-full h-96 border rounded-lg"
            src="https://www.google.com/maps/d/embed?mid=1J5kL-TX-INCENTIVES-MAP" ></iframe>

          <h2>How to Claim Your Incentives</h2>
          <ol>
            <li>Get <a href="/contact">3 free quotes</a> from NABCEP installers.</li>
            <li>Choose a contractor that completes rebate paperwork for you.</li>
            <li>File IRS Form 5695 for the federal credit at tax time.</li>
          </ol>

          <h2>FAQ</h2>
          <details><summary>Can I stack the ITC with local rebates?</summary><p>Yes – rebates lower your net cost, after which the 26 % credit is calculated.</p></details>
          <details><summary>Will incentives run out in 2026?</summary><p>The ITC steps down to 22 % in 2026 and expires for residential in 2027.</p></details>
        </article>
      </main>
      <Footer />
    </div>
  </>
);

export default TexasSolarIncentives2025;
