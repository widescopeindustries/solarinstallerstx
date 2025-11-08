import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  DollarSign,
  Home,
  Sun,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logEvent } from "@/lib/analytics";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    zipCode: '',
    monthlyBill: 150,
    homeSize: '',
    roofType: '',
    roofAge: '',
    shading: '',
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    preferences: {
      budget: '',
      timeline: '',
      financing: '',
      batteryStorage: false,
      monitoring: false
    },
    additionalInfo: ''
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Location & Usage", icon: MapPin },
    { id: 2, title: "Property Details", icon: Home },
    { id: 3, title: "Contact Information", icon: Phone },
    { id: 4, title: "Preferences", icon: Sun },
    { id: 5, title: "Review & Submit", icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.zipCode || !formData.contactInfo.firstName ||
          !formData.contactInfo.lastName || !formData.contactInfo.email ||
          !formData.contactInfo.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Calculate savings for storage
      const savings = calculateSavings();

      // Prepare data for submission
      const quoteData = {
        zip_code: formData.zipCode,
        monthly_bill: formData.monthlyBill,
        home_size: formData.homeSize,
        roof_type: formData.roofType,
        roof_age: formData.roofAge,
        shading: formData.shading,
        first_name: formData.contactInfo.firstName,
        last_name: formData.contactInfo.lastName,
        email: formData.contactInfo.email,
        phone: formData.contactInfo.phone,
        address: formData.contactInfo.address,
        budget: formData.preferences.budget,
        timeline: formData.preferences.timeline,
        financing: formData.preferences.financing,
        battery_storage: formData.preferences.batteryStorage,
        monitoring: formData.preferences.monitoring,
        additional_info: formData.additionalInfo,
        estimated_monthly_savings: savings.monthlySavings,
        estimated_annual_savings: savings.annualSavings,
        estimated_system_cost: savings.systemCost,
        estimated_payback_period: savings.paybackPeriod,
        source: 'website',
        user_agent: navigator.userAgent
      };

      // Submit to Supabase
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([quoteData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting quote:', error);
        throw error;
      }

      // Log successful quote submission
      logEvent('quote_submitted', {
        quote_id: data.id,
        zip_code: formData.zipCode,
        monthly_bill: formData.monthlyBill,
        estimated_savings: savings.annualSavings
      });

      // Log TCPA consent for legal compliance
      const { logTCPAConsent } = await import('@/lib/analytics');
      await logTCPAConsent({
        name: `${formData.contactInfo.firstName} ${formData.contactInfo.lastName}`,
        phone: formData.contactInfo.phone,
        email: formData.contactInfo.email,
        timestamp: new Date().toISOString(),
        ip: '', // IP will be captured on server side
        version: '1.0',
        userAgent: navigator.userAgent
      }, data.id);

      // Show success message
      toast({
        title: "Quote Request Submitted!",
        description: "We'll connect you with certified solar installers in your area within 24 hours.",
      });

      // Reset form
      setCurrentStep(1);
      setFormData({
        zipCode: '',
        monthlyBill: 150,
        homeSize: '',
        roofType: '',
        roofAge: '',
        shading: '',
        contactInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: ''
        },
        preferences: {
          budget: '',
          timeline: '',
          financing: '',
          batteryStorage: false,
          monitoring: false
        },
        additionalInfo: ''
      });

    } catch (error) {
      console.error('Failed to submit quote:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote. Please try again or call us at (682) 999-0953.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateSavings = () => {
    const monthlySavings = formData.monthlyBill * 0.8; // Assume 80% savings
    const annualSavings = monthlySavings * 12;
    const systemCost = formData.monthlyBill * 150; // Rough estimate
    const paybackPeriod = Math.round(systemCost / annualSavings);
    
    return {
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      paybackPeriod
    };
  };

  const savings = calculateSavings();

  // Package 3: Minimal Header Component (Logo + Phone Only)
  const MinimalHeader = () => (
    <header className="bg-card border-b border-border sticky top-0 z-30 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              SolarInstallersTX
            </div>
          </Link>
          <a
            href="tel:6829990953"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <Phone className="h-4 w-4" />
            (682) 999-0953
          </a>
        </div>
      </div>
    </header>
  );

  // Package 3: Minimal Footer Component (Copyright + Legal Only)
  const MinimalFooter = () => (
    <footer className="bg-card border-t border-border mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 SolarInstallersTX.com. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <SEOHead
        title="Free Solar Quotes in Texas"
        description="Get free quotes from certified solar installers in Texas. Compare pricing and financing options."
        canonicalUrl="https://solarinstallerstx.com/quote"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free Solar Quote Texas",
          "description": "Get free solar installation quotes from certified Texas installers",
          "url": "https://solarinstallerstx.com/quote",
          "mainEntity": {
            "@type": "Service",
            "name": "Solar Installation Quote Service",
            "provider": {
              "@type": "Organization",
              "name": "SolarInstallersTX"
            },
            "areaServed": "Texas",
            "serviceType": "Solar Installation Quotes"
          }
        }}
      />

      <div className="min-h-screen bg-background">
        <MinimalHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Get Quote</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Get Your Free Solar Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare quotes from certified solar installers in Texas. Get custom estimates based on your home and energy usage.
            </p>
          </div>

          {/* Package 3: Value Proposition Checklist */}
          <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Why Get Your Free Quote?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <p className="font-semibold text-sm">100% Free, No Obligation</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <p className="font-semibold text-sm">Only NABCEP-Certified Installers</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <p className="font-semibold text-sm">Compare Multiple Quotes & Save</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    {step.id < 5 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={(currentStep / 5) * 100} className="h-2" />
            </div>

            {/* Form Steps */}
            <Card className="mb-8">
              <CardContent className="p-8">
                {/* Step 1: Location & Usage */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Location & Energy Usage</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="75001"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Monthly Electric Bill: ${formData.monthlyBill}</Label>
                        <Slider
                          value={[formData.monthlyBill]}
                          onValueChange={(value) => handleInputChange('monthlyBill', value[0])}
                          min={50}
                          max={500}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>$50</span>
                          <span>$500</span>
                        </div>
                      </div>
                    </div>

                    {/* Savings Estimate */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          Estimated Savings
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">${savings.monthlySavings}</div>
                            <div className="text-sm text-muted-foreground">Monthly Savings</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">${savings.annualSavings}</div>
                            <div className="text-sm text-muted-foreground">Annual Savings</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">${savings.systemCost}</div>
                            <div className="text-sm text-muted-foreground">System Cost</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">{savings.paybackPeriod}y</div>
                            <div className="text-sm text-muted-foreground">Payback Period</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Property Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="homeSize">Home Size (sq ft)</Label>
                        <Input
                          id="homeSize"
                          placeholder="2,500"
                          value={formData.homeSize}
                          onChange={(e) => handleInputChange('homeSize', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="roofType">Roof Type</Label>
                        <select
                          id="roofType"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.roofType}
                          onChange={(e) => handleInputChange('roofType', e.target.value)}
                        >
                          <option value="">Select roof type</option>
                          <option value="asphalt">Asphalt Shingles</option>
                          <option value="tile">Tile</option>
                          <option value="metal">Metal</option>
                          <option value="flat">Flat</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="roofAge">Roof Age</Label>
                        <select
                          id="roofAge"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.roofAge}
                          onChange={(e) => handleInputChange('roofAge', e.target.value)}
                        >
                          <option value="">Select roof age</option>
                          <option value="new">Less than 5 years</option>
                          <option value="good">5-15 years</option>
                          <option value="fair">15-25 years</option>
                          <option value="old">More than 25 years</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="shading">Roof Shading</Label>
                        <select
                          id="shading"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.shading}
                          onChange={(e) => handleInputChange('shading', e.target.value)}
                        >
                          <option value="">Select shading level</option>
                          <option value="none">No shading</option>
                          <option value="light">Light shading</option>
                          <option value="moderate">Moderate shading</option>
                          <option value="heavy">Heavy shading</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.contactInfo.firstName}
                          onChange={(e) => handleInputChange('contactInfo.firstName', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.contactInfo.lastName}
                          onChange={(e) => handleInputChange('contactInfo.lastName', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.contactInfo.email}
                          onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.contactInfo.phone}
                          onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          placeholder="123 Main St, Austin, TX 78701"
                          value={formData.contactInfo.address}
                          onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Preferences */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Installation Preferences</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <select
                          id="budget"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.preferences.budget}
                          onChange={(e) => handleInputChange('preferences.budget', e.target.value)}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-15k">Under $15,000</option>
                          <option value="15k-25k">$15,000 - $25,000</option>
                          <option value="25k-35k">$25,000 - $35,000</option>
                          <option value="35k-plus">$35,000+</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Installation Timeline</Label>
                        <select
                          id="timeline"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.preferences.timeline}
                          onChange={(e) => handleInputChange('preferences.timeline', e.target.value)}
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months-plus">6+ months</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="financing">Financing Preference</Label>
                        <select
                          id="financing"
                          className="w-full px-3 py-2 border border-input rounded-md"
                          value={formData.preferences.financing}
                          onChange={(e) => handleInputChange('preferences.financing', e.target.value)}
                        >
                          <option value="">Select financing</option>
                          <option value="cash">Cash purchase</option>
                          <option value="loan">Solar loan</option>
                          <option value="lease">Solar lease/PPA</option>
                          <option value="mixed">Mixed options</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Additional Options</h3>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="batteryStorage"
                          checked={formData.preferences.batteryStorage}
                          onCheckedChange={(checked) => handleInputChange('preferences.batteryStorage', checked)}
                        />
                        <Label htmlFor="batteryStorage">Interested in battery storage</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="monitoring"
                          checked={formData.preferences.monitoring}
                          onCheckedChange={(checked) => handleInputChange('preferences.monitoring', checked)}
                        />
                        <Label htmlFor="monitoring">Want monitoring system</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any specific requirements or questions..."
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Property Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><strong>ZIP Code:</strong> {formData.zipCode}</p>
                          <p><strong>Monthly Bill:</strong> ${formData.monthlyBill}</p>
                          <p><strong>Home Size:</strong> {formData.homeSize} sq ft</p>
                          <p><strong>Roof Type:</strong> {formData.roofType}</p>
                          <p><strong>Roof Age:</strong> {formData.roofAge}</p>
                          <p><strong>Shading:</strong> {formData.shading}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><strong>Name:</strong> {formData.contactInfo.firstName} {formData.contactInfo.lastName}</p>
                          <p><strong>Email:</strong> {formData.contactInfo.email}</p>
                          <p><strong>Phone:</strong> {formData.contactInfo.phone}</p>
                          <p><strong>Address:</strong> {formData.contactInfo.address}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><strong>Budget:</strong> {formData.preferences.budget}</p>
                          <p><strong>Timeline:</strong> {formData.preferences.timeline}</p>
                          <p><strong>Financing:</strong> {formData.preferences.financing}</p>
                          <p><strong>Battery Storage:</strong> {formData.preferences.batteryStorage ? 'Yes' : 'No'}</p>
                          <p><strong>Monitoring:</strong> {formData.preferences.monitoring ? 'Yes' : 'No'}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Estimated Savings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><strong>Monthly Savings:</strong> ${savings.monthlySavings}</p>
                          <p><strong>Annual Savings:</strong> ${savings.annualSavings}</p>
                          <p><strong>System Cost:</strong> ${savings.systemCost}</p>
                          <p><strong>Payback Period:</strong> {savings.paybackPeriod} years</p>
                        </CardContent>
                      </Card>
                    </div>

                    {formData.additionalInfo && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{formData.additionalInfo}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  {currentStep < 5 ? (
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">✓ Free quotes from certified installers</p>
              <p className="mb-2">✓ No obligation to purchase</p>
              <p className="mb-2">✓ Compare multiple options</p>
              <p>✓ Get quotes within 24 hours</p>
            </div>
          </div>
        </main>

        <MinimalFooter />
      </div>
    </>
  );
};

export default Quote;
