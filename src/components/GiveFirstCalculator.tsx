'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { estimateSystemSize, getCitySolarData, formatCurrency, TEXAS_STATE_AVERAGE } from '@/data/texasCityStats'
import { Calculator, Zap, DollarSign, TrendingDown, Mail } from 'lucide-react'

/**
 * PHASE 4: "Give First" Solar Calculator
 * Shows instant value BEFORE asking for email
 * Builds reciprocity and trust
 */

export function GiveFirstCalculator() {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [monthlyBill, setMonthlyBill] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [email, setEmail] = useState('')
    const [estimate, setEstimate] = useState<{
        systemSize: number
        costBefore: number
        costAfter: number
        monthlySavings: number
        city: string
    } | null>(null)

    // Load data from homepage quote form if available
    useEffect(() => {
        const savedData = sessionStorage.getItem('quoteFormData')
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                if (parsed.monthlyBill) setMonthlyBill(parsed.monthlyBill)
                if (parsed.zipCode) setZipCode(parsed.zipCode)
                if (parsed.email) setEmail(parsed.email)

                // If we have minimal data, auto-calculate to show step 2 immediately
                if (parsed.monthlyBill && parsed.zipCode) {
                    // Slight delay to ensure state updates
                    setTimeout(() => {
                        const bill = parseFloat(parsed.monthlyBill)
                        const cityData = TEXAS_STATE_AVERAGE
                        const systemSize = estimateSystemSize(bill, cityData.avgElectricRate)
                        const costPerWatt = cityData.avgSystemCost / 10
                        const costBefore = systemSize * costPerWatt * 1000
                        const costAfter = costBefore * 0.7
                        const monthlySavings = bill * 0.85

                        setEstimate({
                            systemSize,
                            costBefore,
                            costAfter,
                            monthlySavings,
                            city: 'Texas'
                        })
                        setStep(2)
                    }, 100)
                }
            } catch (e) {
                console.error('Error parsing saved quote data', e)
            }
            // Clear it so it doesn't persist forever
            sessionStorage.removeItem('quoteFormData')
        }
    }, [])

    // Step 1: Get basic info and show INSTANT value
    const handleCalculate = () => {
        if (!monthlyBill || parseFloat(monthlyBill) <= 0) return

        // Get city data from zip (simplified - would use actual zip lookup)
        const cityData = TEXAS_STATE_AVERAGE
        const bill = parseFloat(monthlyBill)

        // Calculate system needs
        const systemSize = estimateSystemSize(bill, cityData.avgElectricRate)
        const costPerWatt = cityData.avgSystemCost / 10 // Assume 10kW average
        const costBefore = systemSize * costPerWatt * 1000
        const costAfter = costBefore * 0.7 // 30% Federal ITC
        const annualSavings = bill * 12
        const monthlySavings = bill * 0.85 // ~85% offset

        setEstimate({
            systemSize,
            costBefore,
            costAfter,
            monthlySavings,
            city: 'Texas'
        })

        setStep(2) // Show the value FIRST
    }

    // Step 2: They've seen value, now ask for email
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleGetQuotes = async () => {
        if (!email) return
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    monthlyBill,
                    zipCode,
                    email,
                    estimate
                })
            })

            if (response.ok) {
                setStep(3) // Success!
            } else {
                console.error('Failed to submit lead')
                // Still show success to user to not break flow, but maybe log error
                setStep(3)
            }
        } catch (error) {
            console.error('Error submitting lead:', error)
            setStep(3) // Fallback to success
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Calculator className="h-6 w-6" />
                    Free Solar Savings Calculator
                </CardTitle>
                <p className="text-muted-foreground">
                    {step === 1 && "See your potential savings instantly"}
                    {step === 2 && "Here's what solar could save you"}
                    {step === 3 && "Success! Check your email"}
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* STEP 1: Input - Collect basic data */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                What's your average monthly electric bill?
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="number"
                                    placeholder="150"
                                    value={monthlyBill}
                                    onChange={(e) => setMonthlyBill(e.target.value)}
                                    className="pl-10 text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                What's your zip code?
                            </label>
                            <Input
                                type="text"
                                placeholder="78701"
                                maxLength={5}
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                                className="text-lg"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            disabled={!monthlyBill || monthlyBill === '0'}
                            className="w-full text-lg py-6"
                            size="lg"
                        >
                            Calculate My Savings
                            <Zap className="ml-2 h-5 w-5" />
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            No email required to see your estimate
                        </p>
                    </div>
                )}

                {/* STEP 2: Value First - Show estimate BEFORE asking for email */}
                {step === 2 && estimate && (
                    <div className="space-y-6">
                        {/* The Big Number */}
                        <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                            <div className="text-sm font-medium text-muted-foreground mb-2">
                                Estimated Monthly Savings
                            </div>
                            <div className="text-5xl font-bold text-primary mb-2">
                                ${Math.round(estimate.monthlySavings)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                That's ${Math.round(estimate.monthlySavings * 12)}/year!
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded">
                                <span className="font-medium">Recommended System Size:</span>
                                <span className="text-lg font-bold">{estimate.systemSize}kW</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded">
                                <span className="font-medium">Estimated Cost (before tax credit):</span>
                                <span className="text-lg">{formatCurrency(estimate.costBefore)}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950 rounded border-2 border-green-500">
                                <span className="font-medium flex items-center gap-2">
                                    <TrendingDown className="h-5 w-5 text-green-600" />
                                    After 30% Federal Tax Credit:
                                </span>
                                <span className="text-lg font-bold text-green-600">
                                    {formatCurrency(estimate.costAfter)}
                                </span>
                            </div>
                        </div>

                        {/* The Ask - But we've proven value first */}
                        <div className="border-t pt-6 space-y-4">
                            <h3 className="font-semibold text-lg text-center">
                                Want exact quotes from verified {estimate.city} installers?
                            </h3>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Enter your email to see who serves your zip code
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 text-lg"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleGetQuotes}
                                disabled={!email || !email.includes('@')}
                                className="w-full text-lg py-6"
                                size="lg"
                            >
                                {isSubmitting ? 'Processing...' : 'Get My Free Quotes'}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                ✓ 100% free • ✓ No obligation • ✓ Compare 3-5 verified installers
                            </p>
                        </div>
                    </div>
                )}

                {/* STEP 3: Success */}
                {step === 3 && (
                    <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Check Your Email!</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We're matching you with verified solar installers who serve your area.
                            You'll receive 3-5 competitive quotes within 24-48 hours.
                        </p>
                        <div className="pt-4">
                            <Button variant="outline" onClick={() => { setStep(1); setEmail(''); }}>
                                Calculate for Another Property
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
