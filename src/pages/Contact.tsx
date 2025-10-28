import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { sendGAEvent } from "@/lib/analytics";

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact Solar Installers TX | Get Free Quotes"
        description="Contact our team for free solar quotes from NABCEP certified installers in Texas. Get expert guidance on your solar installation project."
        canonicalUrl="https://solarinstallerstx.com/contact"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Get Your Free Solar Quote</h2>
                <p className="text-muted-foreground mb-6">
                  Ready to go solar? Contact us to get connected with NABCEP certified installers in your area.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">
                      <a 
                        href="mailto:solar@solarinstallerstx.com"
                        onClick={() => sendGAEvent("email_click", { button_text: "solar@solarinstallerstx.com" })}
                        className="text-primary hover:underline"
                      >
                        solar@solarinstallerstx.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1-800-SOLAR-TX</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quick Contact Form</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input type="text" className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input type="text" className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea rows={4} className="w-full p-3 border rounded-lg"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold">
                    Get Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;