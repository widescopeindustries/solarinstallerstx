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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    city: '',
    issueType: '',
    depositAmount: '',
    dateOfContract: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to backend
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this issue. We'll investigate and update our records.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      city: '',
      issueType: '',
      depositAmount: '',
      dateOfContract: '',
      description: ''
    });
  };

  return (
    <>
      <SEOHead
        title="Report Solar Installer Bankruptcy or Issues | SolarInstallersTX"
        description="Report problems with solar installers including bankruptcies, unfinished installations, or voided warranties. Help protect other Texas homeowners."
        canonicalUrl="https://solarinstallerstx.com/report-bankruptcy"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Report Installer Issue</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Report Solar Installer Issues
              </h1>
              <p className="text-xl text-muted-foreground">
                Help protect other Texas homeowners by reporting installer bankruptcies, failed projects, or warranty issues
              </p>
            </div>

            {/* Why Report Section */}
            <Card className="mb-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Why Your Report Matters</h3>
                    <p className="text-sm text-muted-foreground">
                      By reporting issues with solar installers, you help us:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Update Safety Scores to reflect current installer status</li>
                      <li>• Remove or downgrade listings for problematic companies</li>
                      <li>• Alert other homeowners before they sign contracts</li>
                      <li>• Build industry accountability and transparency</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Form */}
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Installer Information */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Installer Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          placeholder="e.g., Sunnova, Titan Solar, etc."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issueType">Type of Issue *</Label>
                        <select
                          id="issueType"
                          className="w-full border border-input rounded-md px-3 py-2 bg-background"
                          value={formData.issueType}
                          onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                          required
                        >
                          <option value="">Select issue type...</option>
                          <option value="bankruptcy">Company Filed Bankruptcy</option>
                          <option value="closed">Company Shut Down</option>
                          <option value="unfinished">Unfinished Installation</option>
                          <option value="warranty">Warranty Not Honored</option>
                          <option value="deposit">Lost Deposit</option>
                          <option value="fraud">Suspected Fraud</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="depositAmount">Deposit/Amount Paid (if applicable)</Label>
                          <Input
                            id="depositAmount"
                            value={formData.depositAmount}
                            onChange={(e) => setFormData({...formData, depositAmount: e.target.value})}
                            placeholder="e.g., $5,000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfContract">Contract Date (if applicable)</Label>
                          <Input
                            id="dateOfContract"
                            type="date"
                            value={formData.dateOfContract}
                            onChange={(e) => setFormData({...formData, dateOfContract: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description of Issue *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Please provide details about what happened, including timeline, attempts to resolve, and current status..."
                      rows={8}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Include as much detail as possible: timeline of events, attempts to contact the company, status of your installation, etc.
                    </p>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy:</strong> Your information will be kept confidential. We may use this report to update our Safety Scores and warn other homeowners, but your personal details will not be published without your consent.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    Submit Report
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    This is not legal advice. For legal issues, consult an attorney. For consumer protection complaints, also file with the{" "}
                    <a href="https://www.texasattorneygeneral.gov/consumer-protection" target="_blank" rel="noopener" className="text-primary hover:underline">
                      Texas Attorney General
                    </a>.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Affected by Sunnova or Titan Solar?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We have dedicated resources for customers affected by these specific bankruptcies.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/sunnova-help">View Sunnova/Titan Help Page</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Find a Replacement Installer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need to complete an unfinished installation or find warranty service?
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/installers">Browse Verified Installers</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReportBankruptcy;
