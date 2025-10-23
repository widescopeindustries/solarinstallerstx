import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";

const TexasSolarIncentives2025 = () => (
  <>
    <SEOHead
      title="2025 Texas Solar Incentives & Rebates Guide | Save on NABCEP Installations"
      description="Explore every 2025 federal and Texas-specific solar incentive, tax credit and utility rebate. Instantly see how much you can save on NABCEP-certified installations across TX."
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

          {/* Placeholder for Affiliate Widget */}
          <div className="my-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-bold text-amber-800">Shop Solar Products</h3>
              <p className="text-sm text-amber-700">Check out recommended solar chargers and equipment on <a href="https://www.amazon.com/s?k=solar+panels" target="_blank" rel="sponsored" className="underline">Amazon</a>.</p>
              {/* AdSense placeholder */}
              <div className="mt-4 h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                  Ad Placeholder (e.g., Google AdSense)
              </div>
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
