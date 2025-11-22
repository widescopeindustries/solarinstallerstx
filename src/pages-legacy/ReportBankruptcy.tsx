import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ReportBankruptcy = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    issueType: "bankruptcy",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/report-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to submit report");

      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our community safe. We will review your report within 48 hours."
      });

      setFormData({
        companyName: "",
        contactEmail: "",
        issueType: "bankruptcy",
        description: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Report Installer Issues - SolarInstallersTX"
        description="Report solar company bankruptcy, unfinished installations, or voided warranties in Texas. Help protect homeowners from unreliable installers with verified complaints."
        canonicalUrl="https://solarinstallerstx.com/report-bankruptcy"
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Report an Issue</h1>
              <h2 className="text-lg text-muted-foreground">
                Help us protect Texas homeowners by reporting serious issues with solar installers.
              </h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-4">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-amber-900 mb-1">Before You Report</h2>
                    <p className="text-sm text-amber-800 mb-3">
                      We take reports seriously and investigate all claims. False reports may result in legal action.
                    </p>
                    <p className="text-sm text-amber-800">
                      For general complaints or disputes, please contact the installer directly or the <a href="https://www.atg.texas.gov/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Texas Attorney General</a>.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Name of the solar installer"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="issueType">Type of Issue *</Label>
                    <select
                      id="issueType"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    >
                      <option value="bankruptcy">Bankruptcy</option>
                      <option value="unfinished">Unfinished Installation</option>
                      <option value="warranty_void">Voided Warranty</option>
                      <option value="other">Other Serious Issue</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Your Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description of Issue *</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide detailed information about the issue, including dates, contract details, and any documentation you have."
                      required
                      className="min-h-32"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                    <p className="font-semibold mb-2">Your Privacy</p>
                    <p>
                      We keep all reports confidential. Your contact information will only be used for follow-up regarding your specific report and will not be shared with installers or third parties.
                    </p>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold mb-4">Other Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="https://www.atg.texas.gov/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        Texas Attorney General
                      </a>
                    </li>
                    <li>
                      <a href="https://www.bbb.org/texas" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        Better Business Bureau - Texas
                      </a>
                    </li>
                    <li>
                      <Link to="/contact" className="text-primary underline">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReportBankruptcy;
