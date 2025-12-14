import { Metadata } from 'next';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { STRIPE_CONFIG } from '@/config/constants';

export const metadata: Metadata = {
    title: 'Upgrade to Premium Partner | Solar Installers TX',
    description: 'Grow your solar installation business with premium placement on SolarInstallersTX.com. Get more leads and increase your visibility.',
    keywords: ['solar installer premium listing', 'solar business advertising', 'solar leads texas'],
    openGraph: {
        title: 'Upgrade to Premium Partner | Solar Installers TX',
        description: 'Grow your solar installation business with premium placement. Get more leads and increase your visibility.',
        type: 'website',
        url: 'https://solarinstallerstx.com/upgrade-to-premium',
        images: [
            {
                url: 'https://solarinstallerstx.com/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Upgrade to Premium Partner - Solar Installers TX',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Upgrade to Premium Partner | Solar Installers TX',
        description: 'Grow your solar installation business with premium placement.',
        images: ['https://solarinstallerstx.com/opengraph-image'],
    },
    alternates: {
        canonical: 'https://solarinstallerstx.com/upgrade-to-premium',
    },
};

export default function UpgradeToPremiumPage() {
    const tiers = [
        {
            name: 'Premium Partner',
            price: 99,
            priceId: STRIPE_CONFIG.tiers.BASIC.price_id,
            icon: Star,
            description: 'Perfect for growing solar installers',
            features: [
                'Top 5 placement on city pages',
                'Verified installer badge',
                'Enhanced profile listing',
                'Priority in search results',
                'Featured in "Top Installers" section',
                'Monthly performance report',
            ],
            color: 'from-blue-500 to-blue-600',
            popular: false,
        },
        {
            name: 'Platinum Partner',
            price: 199,
            priceId: STRIPE_CONFIG.tiers.PREMIUM.price_id,
            icon: Zap,
            description: 'Maximum visibility across multiple cities',
            features: [
                'Top 3 placement on ALL city pages',
                'Gold verified badge',
                'Premium profile with photos/videos',
                'Featured in homepage carousel',
                'Priority customer inquiries',
                'Weekly performance analytics',
                'Dedicated account manager',
                'Social media promotion',
            ],
            color: 'from-purple-500 to-purple-600',
            popular: true,
        },
        {
            name: 'Enterprise Partner',
            price: 399,
            priceId: STRIPE_CONFIG.tiers.ENTERPRISE.price_id,
            icon: Crown,
            description: 'Ultimate exposure for market leaders',
            features: [
                'Homepage hero feature placement',
                'Diamond verified badge',
                'Exclusive enterprise profile',
                'Top placement across ALL pages',
                'Priority for all leads statewide',
                'Daily analytics dashboard',
                'Quarterly strategy consultation',
                'Custom marketing campaigns',
                'Press release distribution',
                'Co-branded content opportunities',
            ],
            color: 'from-amber-500 to-amber-600',
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Grow Your Solar Business
                        </h1>
                        <p className="text-xl text-blue-100 mb-6">
                            Join Texas's #1 bankruptcy-proof solar installer directory. Get more leads, build trust, and grow your revenue.
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 inline-block">
                            <p className="text-sm">
                                ⚡ <strong>Limited Time:</strong> Early-bird pricing - Only <strong>16 spots remaining</strong> statewide
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${tier.popular ? 'ring-4 ring-purple-500' : ''
                                    }`}
                            >
                                {/* Popular Badge */}
                                {tier.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Header */}
                                <div className={`bg-gradient-to-r ${tier.color} text-white p-8`}>
                                    <Icon className="w-12 h-12 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                    <p className="text-white/90 text-sm mb-4">{tier.description}</p>
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold">${tier.price}</span>
                                        <span className="text-white/80 ml-2">/month</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="p-8">
                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <form action="/api/create-checkout-session" method="POST">
                                        <input type="hidden" name="priceId" value={tier.priceId} />
                                        <button
                                            type="submit"
                                            className={`w-full bg-gradient-to-r ${tier.color} text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group`}
                                        >
                                            Get Started
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Section */}
                <div className="mt-16 max-w-4xl mx-auto text-center">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Why Partner With SolarInstallersTX.com?</h2>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
                                <div className="text-slate-600 dark:text-slate-400">Monthly Visitors</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                                <div className="text-slate-600 dark:text-slate-400">Leads Generated/Month</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-amber-600 mb-2">95%</div>
                                <div className="text-slate-600 dark:text-slate-400">Customer Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
                            <h3 className="font-bold mb-2">Can I cancel anytime?</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Yes! All plans are month-to-month with no long-term contract. Cancel anytime with 30 days notice.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
                            <h3 className="font-bold mb-2">How quickly will I see results?</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Most partners see increased leads within 48 hours of activation. Premium placement is immediate upon payment confirmation.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
                            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                We accept all major credit cards, debit cards, and ACH bank transfers through our secure Stripe payment system.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                        Have questions? Want a custom enterprise plan?
                    </p>
                    <a
                        href="tel:+16829990953"
                        className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        📞 Call (682) 999-0953
                    </a>
                </div>
            </div>
        </div>
    );
}
