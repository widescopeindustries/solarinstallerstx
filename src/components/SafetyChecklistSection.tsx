
import { CheckCircle, ShieldAlert, FileText, BadgeCheck, Phone, DollarSign, Users, AlertTriangle, HelpCircle, FileCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function SafetyChecklistSection() {
    const checklistItems = [
        {
            icon: BadgeCheck,
            title: "NABCEP Certification",
            question: "Are your lead installers NABCEP certified?",
            tip: "The gold standard for solar expertise. Don't settle for less."
        },
        {
            icon: ShieldAlert,
            title: "Insurance Verification",
            question: "Can you provide a current Certificate of Insurance (COI)?",
            tip: "Ensures you aren't liable for accidents on your roof."
        },
        {
            icon: FileCheck,
            title: "Texas Electrical License",
            question: "What is your TDLR Electrical Contractor License Number?",
            tip: "Required by Texas law to touch your electrical panel."
        },
        {
            icon: DollarSign,
            title: "Financial Health",
            question: "Can you prove financial stability or 5+ years in business?",
            tip: "Protects you from 'fly-by-night' companies going bankrupt."
        },
        {
            icon: Users,
            title: "Labor Type",
            question: "Do you use W-2 employees or 1099 subcontractors?",
            tip: "In-house crews (W-2) generally offer better quality control."
        },
        {
            icon: FileText,
            title: "Contract Clarity",
            question: "Is this a loan, lease, or PPA?",
            tip: "Ownership (loan/cash) yields the best ROI in Texas."
        },
        {
            icon: AlertTriangle,
            title: "Production Guarantee",
            question: "Do you offer a performance guarantee in writing?",
            tip: "Ensures your system produces what they promised."
        },
        {
            icon: Phone,
            title: "Service Department",
            question: "Do you have a dedicated service team based in Texas?",
            tip: "Critical for post-installation support and warranty claims."
        },
    ]

    return (
        <section className="py-24 bg-orange-50/50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-orange-100 border border-orange-200 rounded-full text-orange-700 text-sm font-semibold mb-6">
                        🛡️ Consumer Protection
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                        The Texas Solar Safety Checklist
                    </h2>
                    <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                        Don't sign anything until you've asked these 8 critical questions. Download this checklist or use it during your consultation to avoid fraud.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {checklistItems.map((item, index) => (
                        <Card key={index} className="border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 group">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <item.icon className="h-6 w-6 text-orange-600" />
                                </div>
                                <CardTitle className="text-lg font-bold text-slate-900">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold text-slate-800 mb-2 min-h-[48px]">
                                    "{item.question}"
                                </p>
                                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                                    <span className="font-bold text-orange-600 block mb-1 text-xs uppercase tracking-wide">Why Ask:</span>
                                    {item.tip}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all">
                        <FileText className="mr-2 h-5 w-5" /> Download Printable PDF Checklist
                    </Button>
                    <p className="mt-4 text-sm text-slate-500">
                        *Instant download. No email required.
                    </p>
                </div>
            </div>
        </section>
    )
}
