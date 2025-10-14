import { Header } from "@/components/Header";
import { Shield, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              About SolarInstallersTX
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting Texas homeowners with verified, trusted solar installation professionals.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                SolarInstallersTX was founded with a simple yet powerful mission: to make finding qualified solar installers 
                as easy and transparent as possible for Texas homeowners. We believe that the transition to solar energy 
                should be straightforward, trustworthy, and accessible to everyone.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
                <p className="text-muted-foreground">
                  Every installer in our directory holds valid NABCEP certifications, ensuring you work with 
                  qualified professionals who meet the highest industry standards.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparency First</h3>
                <p className="text-muted-foreground">
                  We provide clear, unbiased information about installers, their certifications, and service areas, 
                  helping you make informed decisions.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Focused</h3>
                <p className="text-muted-foreground">
                  We're dedicated to supporting Texas communities in their transition to clean, renewable energy 
                  by connecting them with local solar experts.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Standards</h3>
                <p className="text-muted-foreground">
                  We maintain strict quality standards, featuring only NABCEP-certified installers with proven 
                  track records of excellence.
                </p>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Choose SolarInstallersTX?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Texas has unique solar opportunities and challenges. Our platform is specifically designed to help 
                Texas homeowners navigate the solar installation process with confidence. We understand local 
                regulations, incentives, and the importance of working with professionals who know Texas solar inside out.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're in Houston, Dallas, Austin, San Antonio, or anywhere across the Lone Star State, 
                we help you find certified installers who can deliver quality solar solutions tailored to your needs.
              </p>
            </section>

            <section className="bg-primary/5 border border-primary/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Go Solar?</h2>
              <p className="text-muted-foreground mb-6">
                Browse our directory of verified solar installers and take the first step toward energy independence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Find Installers
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
