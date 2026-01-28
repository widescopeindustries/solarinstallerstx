'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function CheckoutButton({ priceId, color }: { priceId: string; color: string }) {
    const [loading, setLoading] = useState(false);

    async function handleCheckout() {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('priceId', priceId);

            const resp = await fetch('/api/create-checkout-session', {
                method: 'POST',
                body: formData,
            });

            const data = await resp.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
                setLoading(false);
            }
        } catch (err) {
            alert('Something went wrong. Please try again.');
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full bg-gradient-to-r ${color} text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-70`}
        >
            {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to checkout...
                </>
            ) : (
                <>
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    );
}
