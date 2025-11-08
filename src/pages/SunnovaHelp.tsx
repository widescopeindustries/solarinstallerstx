import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText, Phone, Mail, Scale } from "lucide-react";

const SunnovaHelp = () => {
  return (
    <>
      <SEOHead
        title="Sunnova Bankruptcy Help & Resources"
        description="Help for Texas homeowners affected by Sunnova and Titan Solar bankruptcies and legal options."
        canonicalUrl="https://solarinstallerstx.com/sunnova-help"
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
              <li className="text-foreground font-medium">Sunnova & Titan Solar Help</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto">
            <Alert className="mb-8 border-destructive bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertDescription className="ml-2">
                <strong>Crisis Alert:</strong> If you're a Sunnova or Titan Solar customer, you may have limited time to take action. Read this entire page carefully and act quickly.
              </AlertDescription>
            </Alert>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sunnova & Titan Solar Bankruptcy Help
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Resources and actionable steps for Texas homeowners affected by solar company bankruptcies
            </p>

            {/* Sunnova Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Sunnova Energy (Chapter 11 - June 2025)</h2>

              <Card className="mb-6">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">What Happened</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Filing Date:</strong> June 2025</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Type:</strong> Chapter 11 bankruptcy (restructuring)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Debt:</strong> $8.5 billion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Customers Affected:</strong> Thousands nationwide, significant Texas presence (Houston HQ)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <FileText className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-2">Pending Installations</h3>
                    <p className="text-sm text-muted-foreground">If your installation hasn't started or is incomplete, contracts may be canceled or delayed indefinitely.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Phone className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-2">Active Systems</h3>
                    <p className="text-sm text-muted-foreground">If your system is operational, loans may be sold to another lender. Warranty service may be limited or discontinued.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Mail className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-2">Deposits Paid</h3>
                    <p className="text-sm text-muted-foreground">If you paid deposits for unstarted work, you may be able to file a claim in bankruptcy court (limited recovery expected).</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mb-4">Immediate Actions for Sunnova Customers</h3>
              <Card className="bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-6">
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <div>
                        <strong>Document Everything</strong>
                        <p className="text-sm text-muted-foreground">Save all contracts, emails, payment receipts, and photos of your system (if installed).</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <div>
                        <strong>Contact Equipment Manufacturers</strong>
                        <p className="text-sm text-muted-foreground">Panel and inverter warranties are usually separate from Sunnova. Contact manufacturers directly.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <div>
                        <strong>If You Have a Solar Loan</strong>
                        <p className="text-sm text-muted-foreground">Your loan obligation continues even if Sunnova is bankrupt. Your loan may be sold to another servicer. Keep making payments to avoid credit damage.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <div>
                        <strong>File a Claim in Bankruptcy Court</strong>
                        <p className="text-sm text-muted-foreground">If you're owed money (deposits, incomplete work), file a claim. Deadline: Check bankruptcy court notice (typically 60-90 days).</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary">5.</span>
                      <div>
                        <strong>Find Alternative Service Providers</strong>
                        <p className="text-sm text-muted-foreground">For maintenance and warranty work, find a replacement installer. <Link to="/installers" className="text-primary hover:underline">Browse our verified installers →</Link></p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Titan Solar Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Titan Solar Power (Bankruptcy - June 2024)</h2>

              <Card className="mb-6">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">What Happened</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Closure Date:</strong> June 2024 (abrupt shutdown)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Impact:</strong> Thousands of customers left with unfinished installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Deposits Lost:</strong> Estimated $10+ million in customer deposits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Current Status:</strong> Company dissolved, no refunds available for most customers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <h3 className="text-2xl font-bold mb-4">Options for Titan Solar Customers</h3>
              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-500">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <strong className="text-lg">Unfortunate Reality:</strong>
                    <p className="text-muted-foreground">Most Titan Solar customers will not recover their deposits. The company shut down with minimal assets.</p>
                  </div>
                  <h4 className="font-bold mb-3">Possible Actions:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span><strong>Check for surety bond:</strong> If Titan had a contractor's bond, you may be able to claim against it (unlikely but worth checking).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span><strong>Credit card chargeback:</strong> If you paid by credit card within the last 60-120 days, dispute the charge immediately.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span><strong>Homeowner's insurance:</strong> Some policies may cover contractor fraud. File a claim.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span><strong>Join class-action lawsuit:</strong> Several are underway. Consult a consumer protection attorney.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span><strong>File complaint with Texas Attorney General:</strong> Won't recover funds but helps build case for regulatory action.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* General Resources */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">General Resources for All Affected Homeowners</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <Scale className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-3">Legal Resources</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="https://www.texasattorneygeneral.gov/consumer-protection" target="_blank" rel="noopener" className="text-primary hover:underline">Texas Attorney General - Consumer Protection</a></li>
                      <li><a href="https://www.texasbar.com/findalawyer" target="_blank" rel="noopener" className="text-primary hover:underline">State Bar of Texas - Find a Lawyer</a></li>
                      <li><Link to="/report-bankruptcy" className="text-primary hover:underline">Report Your Issue to Us</Link></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <FileText className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-3">Equipment Warranty Contacts</h3>
                    <p className="text-sm text-muted-foreground mb-3">Contact these manufacturers directly for equipment warranties:</p>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Solar Panels:</strong> Check panel label for manufacturer</li>
                      <li><strong>Inverters:</strong> Enphase, SolarEdge, SMA</li>
                      <li><strong>Batteries:</strong> Tesla, Enphase, Generac</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Find Replacement Installer */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Need to Complete or Service Your System?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Find financially stable, NABCEP-certified installers who can complete unfinished installations or take over warranty service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/installers">Browse Verified Installers</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/safety-score-explained">Learn About Safety Scores</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Issues */}
            <div className="mt-12">
              <Card className="border-2 border-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Report Your Experience</h3>
                  <p className="text-muted-foreground mb-4">
                    Help protect other homeowners. If you've been affected by a solar company bankruptcy, <Link to="/report-bankruptcy" className="text-primary hover:underline font-semibold">report your experience here</Link>. We'll investigate and update our Safety Scores accordingly.
                  </p>
                  <Button asChild>
                    <Link to="/report-bankruptcy">Report Bankruptcy Issue</Link>
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

export default SunnovaHelp;
