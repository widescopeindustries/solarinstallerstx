import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Shield, Star, Zap, Crown, ArrowRight, Phone } from 'lucide-react';
import { STRIPE_CONFIG } from '@/config/constants';
import CheckoutButton from './CheckoutButton';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const hasParams = Object.keys(params).length > 0;
    return {
        title: 'Get More Solar Leads in Texas | SolarInstallersTX.com',
        description: 'Your business is already listed on SolarInstallersTX.com. Claim your free Verified Badge or upgrade for priority placement and direct leads.',
        keywords: ['solar installer leads texas', 'solar business directory', 'verified solar badge', 'texas solar leads'],
        openGraph: {
            title: 'Get More Solar Leads in Texas | SolarInstallersTX.com',
            description: 'Claim your free Verified Badge or upgrade for priority placement and direct leads.',
            type: 'website',
            url: 'https://solarinstallerstx.com/upgrade-to-premium',
        },
        alternates: { canonical: 'https://solarinstallerstx.com/upgrade-to-premium' },
        robots: hasParams ? { index: false, follow: true } : { index: true, follow: true },
    };
}

const tiers = [
    {
        id: 'free',
        name: 'Verified',
        badge: '🛡️ Verified Badge',
        price: 0,
        priceLabel: 'Free forever',
        priceId: null,
        icon: Shield,
        tagline: 'Get on the map',
        description: 'Claim your listing, get the badge, start showing up.',
        color: 'border-slate-200 dark:border-slate-700',
        headerColor: 'bg-slate-50 dark:bg-slate-800',
        iconColor: 'text-slate-500',
        ctaStyle: 'outline' as const,
        ctaLabel: 'Claim Free Badge',
        ctaHref: '/claim-your-listing',
        popular: false,
        features: [
            'Verified badge widget for your website',
            'Your listing shown to homeowners',
            'City directory placement',
            'Basic contact info displayed',
            'Backlink to your website',
        ],
    },
    {
        id: 'featured',
        name: 'Featured',
        badge: '⭐ Featured Badge',
        price: 99,
        priceLabel: '/month',
        priceId: STRIPE_CONFIG.tiers.BASIC.price_id,
        icon: Star,
        tagline: 'Get found first',
        description: 'Priority placement in your city. Leads contact you directly.',
        color: 'border-blue-300 dark:border-blue-700',
        headerColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
        iconColor: 'text-white',
        ctaStyle: 'blue' as const,
        ctaLabel: 'Get Started',
        ctaHref: null,
        popular: false,
        features: [
            'Top 5 placement on your city page',
            'Featured badge on your listing',
            'Lead contact form (homeowners reach you)',
            'Full profile: bio, services, photos',
            'Monthly performance report',
            'Priority in search results',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        badge: '🥇 Gold Badge',
        price: 199,
        priceLabel: '/month',
        priceId: STRIPE_CONFIG.tiers.PREMIUM.price_id,
        icon: Zap,
        tagline: 'Dominate your market',
        description: 'Top 3 in all city pages. Direct quote requests sent to you.',
        color: 'border-purple-400 dark:border-purple-600',
        headerColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
        iconColor: 'text-white',
        ctaStyle: 'purple' as const,
        ctaLabel: 'Get Started',
        ctaHref: null,
        popular: true,
        features: [
            'Top 3 placement on ALL city pages',
            'Gold verified badge',
            'Direct quote requests routed to you',
            'Premium profile with photos & video',
            'Featured in homepage carousel',
            'Weekly performance analytics',
            'Dedicated account manager',
        ],
    },
    {
        id: 'exclusive',
        name: 'Exclusive',
        badge: '💎 Diamond Badge',
        price: 399,
        priceLabel: '/month',
        priceId: STRIPE_CONFIG.tiers.ENTERPRISE.price_id,
        icon: Crown,
        tagline: 'Own your territory',
        description: 'All leads in your service area. Guaranteed #1 placement.',
        color: 'border-amber-400 dark:border-amber-600',
        headerColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
        iconColor: 'text-white',
        ctaStyle: 'amber' as const,
        ctaLabel: 'Get Started',
        ctaHref: null,
        popular: false,
        features: [
            '#1 placement across ALL pages',
            'Diamond verified badge',
            'ALL leads in your service area',
            'Homepage hero feature',
            'Daily analytics dashboard',
            'Quarterly strategy consultation',
            'Custom co-branded content',
            'Press release distribution',
        ],
    },
];

export default function UpgradeToPremiumPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* Hero */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-sm font-medium rounded-full px-4 py-1.5 mb-6">
                        ☀️ 536 Texas solar installers listed · Growing daily
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Your business is already<br />on Texas&apos;s #1 solar directory.
                    </h1>
                    <p className="text-lg text-slate-300 mb-8">
                        Claim your free Verified Badge — or upgrade to start getting direct leads from Texas homeowners ready to go solar.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                        <span>✓ No long-term contracts</span>
                        <span>✓ Cancel anytime</span>
                        <span>✓ Free tier available forever</span>
                    </div>
                </div>
            </div>

            {/* Tier flow visual */}
            <div className="bg-slate-100 dark:bg-slate-900 border-b border-border py-4">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap text-sm font-medium">
                        <span className="text-slate-500 dark:text-slate-400">🛡️ Free Badge</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
                        <span className="text-blue-600">⭐ Featured $99</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
                        <span className="text-purple-600">🥇 Premium $199</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
                        <span className="text-amber-600">💎 Exclusive $399</span>
                    </div>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        const isPaid = tier.price > 0;

                        return (
                            <div
                                key={tier.id}
                                className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:shadow-xl ${tier.color} ${tier.popular ? 'shadow-lg scale-[1.02]' : 'bg-card'}`}
                            >
                                {/* Popular badge */}
                                {tier.popular && (
                                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Header */}
                                <div className={`${tier.headerColor} p-6`}>
                                    <Icon className={`h-8 w-8 mb-3 ${tier.iconColor}`} />
                                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isPaid ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {tier.badge}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-1 ${isPaid ? 'text-white' : 'text-foreground'}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-sm mb-4 ${isPaid ? 'text-white/80' : 'text-muted-foreground'}`}>
                                        {tier.tagline}
                                    </p>
                                    <div className={`flex items-baseline gap-1 ${isPaid ? 'text-white' : 'text-foreground'}`}>
                                        {isPaid ? (
                                            <>
                                                <span className="text-4xl font-bold">${tier.price}</span>
                                                <span className={`text-sm ${isPaid ? 'text-white/70' : 'text-muted-foreground'}`}>/mo</span>
                                            </>
                                        ) : (
                                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">Free forever</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex flex-col flex-1 p-6">
                                    <p className="text-sm text-muted-foreground mb-5">{tier.description}</p>
                                    <ul className="space-y-3 flex-1 mb-6">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2.5 text-sm">
                                                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    {tier.ctaHref ? (
                                        <Link
                                            href={tier.ctaHref}
                                            className="block w-full text-center py-2.5 px-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 font-semibold text-sm hover:border-slate-500 transition-colors"
                                        >
                                            {tier.ctaLabel} →
                                        </Link>
                                    ) : (
                                        <CheckoutButton priceId={tier.priceId!} color={
                                            tier.id === 'featured' ? 'from-blue-500 to-blue-600' :
                                            tier.id === 'premium' ? 'from-purple-500 to-purple-600' :
                                            'from-amber-500 to-amber-600'
                                        } />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Social proof */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="text-4xl font-bold text-blue-600 mb-1">536</div>
                            <div className="text-sm text-muted-foreground">Texas installers listed</div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="text-4xl font-bold text-purple-600 mb-1">15K+</div>
                            <div className="text-sm text-muted-foreground">Monthly homeowner visits</div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="text-4xl font-bold text-amber-600 mb-1">100%</div>
                            <div className="text-sm text-muted-foreground">Texas-focused traffic</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'What does the free badge actually do?',
                                a: 'The Verified Badge is a widget you embed on your own website. It links back to your listing on SolarInstallersTX.com — which helps your SEO and builds trust with homeowners who look you up.',
                            },
                            {
                                q: 'Do I need a credit card for the free tier?',
                                a: 'No. The free Verified Badge is genuinely free — no credit card, no trial, no catch. Claim it in 2 minutes.',
                            },
                            {
                                q: 'Can I cancel a paid plan anytime?',
                                a: 'Yes. All paid plans are month-to-month. Cancel with 30 days notice, no questions asked.',
                            },
                            {
                                q: 'How fast do leads come in?',
                                a: 'Featured and above partners typically see their first lead inquiries within 48 hours of activation.',
                            },
                        ].map(({ q, a }) => (
                            <div key={q} className="bg-card border border-border rounded-xl p-5">
                                <h3 className="font-semibold mb-2">{q}</h3>
                                <p className="text-sm text-muted-foreground">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mb-4">Questions? Talk to a real person.</p>
                    <a
                        href="tel:+16829990953"
                        className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Phone className="h-4 w-4" />
                        Call (682) 999-0953
                    </a>
                </div>
            </div>
        </div>
    );
}
