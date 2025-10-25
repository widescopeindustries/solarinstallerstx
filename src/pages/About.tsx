import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <>
      <SEOHead
        title="About Solar Installers TX | NABCEP Certified Directory"
        description="Learn about Solar Installers TX, Texas's premier directory for NABCEP certified solar installers. We connect homeowners with verified professionals."
        canonicalUrl="https://solarinstallerstx.com/about"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About Solar Installers TX</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed mb-6">
                Solar Installers TX is Texas's premier directory for NABCEP certified solar installation professionals. 
                We connect homeowners and businesses with verified, experienced installers across the Lone Star State.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-6">
                To make solar energy accessible to all Texans by providing a trusted platform that connects consumers 
                with qualified, certified solar installation professionals. We believe that clean energy should be 
                simple, reliable, and affordable.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Why Choose NABCEP Certified Installers?</h2>
              <p className="mb-6">
                The North American Board of Certified Energy Practitioners (NABCEP) is the gold standard for solar 
                installation certification. All installers in our directory have passed rigorous testing and 
                demonstrated expertise in solar PV systems, ensuring quality installations and peace of mind.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Our Verification Process</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>NABCEP certification verification</li>
                <li>Texas state licensing confirmation</li>
                <li>Insurance and bonding verification</li>
                <li>Customer review and rating analysis</li>
                <li>Ongoing quality monitoring</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">Coverage Areas</h2>
              <p className="mb-6">
                We serve all major Texas metropolitan areas including Austin, Houston, Dallas, San Antonio, 
                Fort Worth, El Paso, and many more cities across the state. Our network of certified installers 
                ensures quality service no matter where you're located in Texas.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;