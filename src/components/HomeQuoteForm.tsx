'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function HomeQuoteForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        zipCode: '',
        monthlyBill: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Store form data in sessionStorage for the calculator to use
            sessionStorage.setItem('quoteFormData', JSON.stringify(formData))

            // Redirect to the quote/calculator page
            router.push('/quote')
        } catch (error) {
            console.error('Error submitting form:', error)
            setIsSubmitting(false)
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <Input
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        maxLength={5}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Monthly Electric Bill</label>
                    <Input
                        placeholder="$1000"
                        type="number"
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                        placeholder="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input
                        placeholder="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg"
            >
                {isSubmitting ? 'Processing...' : 'Get Free Quote'}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </form>
    )
}
