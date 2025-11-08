import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ForInstallers() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase
        .from("installer_applications")
        .insert({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          status: "new",
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your information and contact you within 24 hours.",
      });

      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="For Solar Installers | SolarInstallersTX"
        description="Interested in becoming a verified installer? Contact us to learn about our partnership program."
        canonicalUrl="https://solarinstallerstx.com/for-installers"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Simple Hero */}
          <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <Badge className="mb-6" variant="outline">
                  For Solar Companies
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Become a Verified Installer
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                  Interested in joining our network of vetted solar installers? Tell us about your company and we'll be in touch.
                </p>
              </div>
            </div>
          </section>

          {/* Simple Contact Form */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">
                <Card className="p-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">Contact Us</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            placeholder="Your Company Name"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                companyName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactName">Your Name *</Label>
                          <Input
                            id="contactName"
                            placeholder="John Smith"
                            value={formData.contactName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                contactName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Primary Service Area *</Label>
                        <Input
                          id="city"
                          placeholder="Dallas, Houston, Austin, etc."
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Back to Homeowners */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-muted-foreground mb-6">
                  Looking for a solar installer?
                </p>
                <Button asChild size="lg" variant="outline">
                  <Link to="/">Find a Verified Installer</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
