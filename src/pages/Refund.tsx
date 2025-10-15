import { Header } from "@/components/Header";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Service Overview</h2>
            <p>
              SolarInstallersTX.com is a free directory service connecting homeowners with verified solar installers in Texas. 
              We do not charge consumers for using our directory, requesting quotes, or contacting installers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">For Homeowners</h2>
            <p className="mb-2">
              Our directory service is completely free for homeowners. There are no fees to:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Search and browse installer listings</li>
              <li>Request quotes from installers</li>
              <li>Contact installers directly</li>
              <li>Access educational resources and guides</li>
            </ul>
            <p className="mt-3">
              Since we do not charge homeowners, there are no refunds applicable to directory usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">For Solar Installers (Premium Listings)</h2>
            <p className="mb-3">
              Solar installation companies may purchase premium listing packages to enhance their visibility on our platform. 
              The following refund policy applies to premium listings:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Cancellation Period</h3>
            <p className="mb-3">
              You may cancel your premium listing within 7 days of purchase for a full refund, provided you have not received 
              more than 3 qualified leads during that period.
            </p>

            <h3 className="text-xl font-semibold mb-2">Partial Refunds</h3>
            <p className="mb-3">
              For cancellations after the 7-day period but within 30 days of purchase, you may be eligible for a prorated refund 
              based on the unused portion of your listing period, minus any leads received.
            </p>

            <h3 className="text-xl font-semibold mb-2">No Refund Circumstances</h3>
            <p className="mb-2">Refunds are not available in the following situations:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Cancellations requested more than 30 days after purchase</li>
              <li>Violations of our Terms of Service</li>
              <li>Fraudulent or misleading business information</li>
              <li>Premium listings active for more than 60 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Installation Service Refunds</h2>
            <p>
              SolarInstallersTX.com does not perform installation services. Any refund requests related to solar installation 
              work, equipment, or warranties must be directed to the specific installer you contracted with. Each installer 
              maintains their own refund and warranty policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Disputes and Complaints</h2>
            <p className="mb-3">
              If you have a dispute with an installer regarding service quality, pricing, or refunds, we recommend:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>First, contact the installer directly to resolve the issue</li>
              <li>Review the installer's contract and warranty documentation</li>
              <li>Contact the Better Business Bureau if needed</li>
              <li>File a complaint with the Texas Department of Licensing and Regulation</li>
            </ul>
            <p className="mt-3">
              While we cannot intervene in contractual disputes, we may remove installers from our directory if we receive 
              documented evidence of fraudulent or illegal business practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Processing Refund Requests</h2>
            <p className="mb-3">
              To request a refund for a premium listing, please contact us with:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Your business name and listing ID</li>
              <li>Purchase date and transaction details</li>
              <li>Reason for refund request</li>
              <li>Supporting documentation (if applicable)</li>
            </ul>
            <p className="mt-3">
              Approved refunds will be processed within 5-10 business days to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p>For refund inquiries or questions about this policy:</p>
            <div className="mt-2 space-y-1">
              <p>Email: <a href="mailto:billing@solarinstallerstx.com" className="text-primary hover:underline">billing@solarinstallerstx.com</a></p>
              <p>Phone: <a href="tel:+15125551234" className="text-primary hover:underline">(512) 555-1234</a></p>
              <p>Business Hours: Monday-Friday, 9:00 AM - 5:00 PM CST</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Refund;
