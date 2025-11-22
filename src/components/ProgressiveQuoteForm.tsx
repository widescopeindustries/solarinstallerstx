'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { submitQuote, validateZipCode, calculateSavings } from '@/app/actions/quote'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle, ArrowRight, Loader2, MapPin, DollarSign, User } from 'lucide-react'

export function ProgressiveQuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    zipCode: '',
    monthlyBill: 150,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tcpaConsent: false,
  })
  const [estimatedSavings, setEstimatedSavings] = useState({
    monthly: 0,
    annual: 0,
    systemCost: 0,
    payback: 0,
  })
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  // Step 1: ZIP Code - LOW FRICTION
  const handleStep1 = async () => {
    if (!/^\d{5}$/.test(formData.zipCode)) {
      toast({
        title: 'Invalid ZIP Code',
        description: 'Please enter a valid 5-digit ZIP code',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      const result = await validateZipCode(formData.zipCode)
      if (result.valid) {
        setStep(2)
        toast({
          title: result.message,
          description: 'Let\'s calculate your potential savings...',
        })

        // Pre-calculate savings for step 2
        const savings = await calculateSavings(formData.monthlyBill)
        if (savings.success) {
          setEstimatedSavings({
            monthly: savings.estimatedMonthlySavings || 0,
            annual: savings.estimatedAnnualSavings || 0,
            systemCost: savings.estimatedSystemCost || 0,
            payback: savings.estimatedPaybackPeriod || 0,
          })
        }
      } else {
        toast({
          title: 'Invalid ZIP Code',
          description: result.message,
          variant: 'destructive',
        })
      }
    })
  }

  // Step 2: Monthly Bill - VALUE PROP
  const handleStep2 = async () => {
    startTransition(async () => {
      // Recalculate savings with final monthly bill
      const savings = await calculateSavings(formData.monthlyBill)
      if (savings.success) {
        setEstimatedSavings({
          monthly: savings.estimatedMonthlySavings || 0,
          annual: savings.estimatedAnnualSavings || 0,
          systemCost: savings.estimatedSystemCost || 0,
          payback: savings.estimatedPaybackPeriod || 0,
        })
      }
      setStep(3)
    })
  }

  // Step 3: Contact Info & Submit - FINAL CONVERSION
  const handleStep3 = async () => {
    // Validate contact info
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: 'Name Required',
        description: 'Please enter your first and last name',
        variant: 'destructive',
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
      return
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast({
        title: 'Invalid Phone',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      })
      return
    }

    if (!formData.tcpaConsent) {
      toast({
        title: 'Consent Required',
        description: 'You must consent to be contacted to receive your free quote',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, String(value))
      })

      const result = await submitQuote(formDataObj)

      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Your quote request has been submitted. We\'ll contact you within 24 hours!',
        })
        // Redirect to thank you page
        window.location.href = '/quote-thank-you'
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        })

        // Show field-specific errors
        if (result.errors) {
          result.errors.forEach(error => {
            toast({
              title: `Error: ${error.field}`,
              description: error.message,
              variant: 'destructive',
            })
          })
        }
      }
    })
  }

  // Update savings estimate when monthly bill changes
  const handleMonthlyBillChange = async (value: number[]) => {
    const newBill = value[0]
    setFormData({ ...formData, monthlyBill: newBill })

    // Debounced savings calculation
    const savings = await calculateSavings(newBill)
    if (savings.success) {
      setEstimatedSavings({
        monthly: savings.estimatedMonthlySavings || 0,
        annual: savings.estimatedAnnualSavings || 0,
        systemCost: savings.estimatedSystemCost || 0,
        payback: savings.estimatedPaybackPeriod || 0,
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Progress Bar */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 rounded transition-colors duration-300 ${
              s <= step ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: ZIP Code - LOW FRICTION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Check Your Eligibility</h2>
            <p className="text-gray-600 text-lg">
              Enter your ZIP code to see if you qualify for Texas solar incentives
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="zipCode" className="text-lg font-semibold">ZIP Code</Label>
            <Input
              id="zipCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={formData.zipCode}
              onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
              placeholder="78701"
              className="text-2xl text-center h-16"
              onKeyDown={e => {
                if (e.key === 'Enter' && !isPending) {
                  handleStep1()
                }
              }}
            />
          </div>

          <Button
            onClick={handleStep1}
            disabled={isPending || formData.zipCode.length !== 5}
            className="w-full h-14 text-lg"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                Check Eligibility <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-sm text-center text-gray-500">
            Free, no obligation. Get matched with top-rated installers in seconds.
          </p>
        </div>
      )}

      {/* Step 2: Monthly Bill - VALUE PROP */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <DollarSign className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Calculate Your Savings</h2>
            <p className="text-gray-600 text-lg">
              What's your average monthly electric bill?
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">
                ${formData.monthlyBill}
              </div>
              <Slider
                value={[formData.monthlyBill]}
                onValueChange={handleMonthlyBillChange}
                min={50}
                max={500}
                step={10}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$50/mo</span>
                <span>$500+/mo</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-lg mb-4 text-center">Your Estimated Savings</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${estimatedSavings.annual.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Annual Savings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {estimatedSavings.payback} years
                  </p>
                  <p className="text-sm text-gray-600">Payback Period</p>
                </div>
              </div>
              <p className="text-xs text-center text-gray-500 mt-4">
                *Estimates based on average Texas solar installation and current utility rates
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="w-1/3 h-12"
              disabled={isPending}
            >
              Back
            </Button>
            <Button
              onClick={handleStep2}
              disabled={isPending}
              className="w-2/3 h-12 text-lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info - FINAL STEP */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <User className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Get Your Free Quote</h2>
            <p className="text-gray-600 text-lg">
              We'll match you with top-rated installers in {formData.zipCode}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Smith"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.smith@example.com"
                className="h-12"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                maxLength={14}
                value={formData.phone}
                onChange={e => {
                  const cleaned = e.target.value.replace(/\D/g, '')
                  let formatted = cleaned
                  if (cleaned.length >= 6) {
                    formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
                  } else if (cleaned.length >= 3) {
                    formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
                  }
                  setFormData({ ...formData, phone: formatted })
                }}
                placeholder="(555) 123-4567"
                className="h-12"
              />
            </div>

            <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <Checkbox
                id="tcpaConsent"
                checked={formData.tcpaConsent}
                onCheckedChange={checked => setFormData({ ...formData, tcpaConsent: Boolean(checked) })}
                className="mt-1"
              />
              <Label htmlFor="tcpaConsent" className="text-sm leading-relaxed cursor-pointer">
                By providing my phone number, I consent to receive calls and text messages from SolarInstallersTX.com
                and partner installers at the number provided, even if on a Do Not Call list. Consent is not required
                for purchase. Message rates may apply. <a href="/privacy" className="text-primary underline">Privacy Policy</a>
              </Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(2)}
              variant="outline"
              className="w-1/3 h-12"
              disabled={isPending}
            >
              Back
            </Button>
            <Button
              onClick={handleStep3}
              disabled={isPending || !formData.tcpaConsent}
              className="w-2/3 h-12 text-lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get Free Quote <CheckCircle className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Your information is secure and will never be sold to third parties.
          </p>
        </div>
      )}
    </div>
  )
}
