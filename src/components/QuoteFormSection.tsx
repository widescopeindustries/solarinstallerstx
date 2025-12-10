'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight } from "lucide-react"

export function QuoteFormSection() {
  const [submitting, setSubmitting] = useState(false)
  const [quoteForm, setQuoteForm] = useState({
    zipCode: '',
    monthlyBill: 150,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const { toast } = useToast()

  const handleQuoteSubmit = async () => {
    if (submitting) return

    setSubmitting(true)
    try {
      // Dynamically import Supabase client to maintain code splitting
      const { supabase } = await import("@/app/lib/supabase/client")

      // Validate required fields
      if (!quoteForm.zipCode || !quoteForm.firstName || !quoteForm.lastName || !quoteForm.email || !quoteForm.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return
      }

      // Get user agent and attempt to get IP (will be null in browser for security)
      const userAgent = navigator.userAgent

      // TCPA Consent text - required for legal compliance
      const tcpaConsentText = `By providing my phone number and clicking "Get Free Quote", I consent to receive calls, text messages, and prerecorded messages from SolarInstallersTX.com and its partner solar installers at the number provided, even if my number is on a Do Not Call list. I understand that consent is not a condition of purchase and I may revoke consent at any time. Message and data rates may apply.`

      // Insert quote request
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .insert({
          zip_code: quoteForm.zipCode,
          monthly_bill: quoteForm.monthlyBill,
          first_name: quoteForm.firstName,
          last_name: quoteForm.lastName,
          email: quoteForm.email,
          phone: quoteForm.phone,
          status: 'new',
          source: 'homepage_form',
          user_agent: userAgent,
        })
        .select()
        .single()

      if (quoteError) throw quoteError

      // Log TCPA consent for legal compliance
      const { error: tcpaError } = await supabase
        .from('tcpa_consent_logs')
        .insert({
          name: `${quoteForm.firstName} ${quoteForm.lastName}`,
          phone: quoteForm.phone,
          email: quoteForm.email,
          consent_version: '1.0',
          consent_text: tcpaConsentText,
          consent_granted: true,
          consent_type: 'opt-in',
          user_agent: userAgent,
          page_url: window.location.href,
          referrer: document.referrer || null,
          lead_source: 'quote_form_homepage',
          quote_request_id: quoteData?.id,
          form_data: {
            zipCode: quoteForm.zipCode,
            monthlyBill: quoteForm.monthlyBill
          }
        })

      if (tcpaError) {
        console.error('TCPA consent logging failed:', tcpaError)
        // Don't fail the submission if TCPA logging fails, but log it
      }

      toast({
        title: "Quote Request Submitted!",
        description: "We'll connect you with certified solar installers in your area within 24 hours.",
      })

      // Reset form
      setQuoteForm({
        zipCode: '',
        monthlyBill: 150,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      })

    } catch (error: any) {
      console.error('Error submitting quote request:', error)
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your quote request. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get Your Free Solar Quote</h2>
              <p className="text-muted-foreground">
                Compare quotes from certified solar installers in your area. No obligation, instant results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="75001"
                    value={quoteForm.zipCode}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Monthly Electric Bill: ${quoteForm.monthlyBill}</Label>
                  <Slider
                    value={[quoteForm.monthlyBill]}
                    onValueChange={(value) => setQuoteForm(prev => ({ ...prev, monthlyBill: value[0] }))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={quoteForm.firstName}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={quoteForm.lastName}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-xs text-muted-foreground">
                <p>
                  <strong>TCPA Consent:</strong> By providing your phone number and clicking "Get Free Quote", you consent to receive calls, text messages, and prerecorded messages from SolarInstallersTX.com and its partner solar installers, even if your number is on a Do Not Call list. Consent is not required for purchase and you may revoke it at any time.
                </p>
              </div>

              <Button
                onClick={handleQuoteSubmit}
                size="lg"
                className="w-full"
                disabled={!quoteForm.zipCode || !quoteForm.firstName || !quoteForm.lastName || !quoteForm.email || !quoteForm.phone || submitting}
              >
                {submitting ? "Submitting..." : "Get Free Quote"}
                {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>✓ Free quotes from certified installers</p>
                <p>✓ No obligation to purchase</p>
                <p>✓ Compare multiple options</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
