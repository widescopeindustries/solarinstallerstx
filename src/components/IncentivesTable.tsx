
import { Check, X, Minus } from "lucide-react"

export function IncentivesTable() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="py-5 px-6 font-bold text-lg min-w-[200px]">Incentive Type</th>
                            <th className="py-5 px-6 font-bold text-lg text-center">Amount / Value</th>
                            <th className="py-5 px-6 font-bold text-lg text-center min-w-[140px]">Availability</th>
                            <th className="py-5 px-6 font-bold text-lg min-w-[250px] hidden md:table-cell">Key Benefit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-5 px-6">
                                <span className="font-bold text-slate-900 block text-lg">Federal Tax Credit (ITC)</span>
                                <span className="text-sm text-orange-600 font-semibold">⚠️ Changed in 2026 — OBBBA</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-lg">
                                    Verify
                                </span>
                                <span className="block text-xs text-slate-500 mt-1">Depends on financing</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold border border-orange-100">
                                    <Minus className="h-3.5 w-3.5" /> Ask Installer
                                </span>
                            </td>
                            <td className="py-5 px-6 text-slate-600 hidden md:table-cell">
                                The residential Section 25D credit was eliminated in 2026 for direct purchases. Lease/PPA financing may still access commercial credits. Verify with your installer.
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-5 px-6">
                                <span className="font-bold text-slate-900 block text-lg">Property Tax Exemption</span>
                                <span className="text-sm text-slate-500">Texas Property Tax Code</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-lg">
                                    100%
                                </span>
                                <span className="block text-xs text-slate-500 mt-1">Exempt</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
                                    <Check className="h-3.5 w-3.5" /> Texas Wide
                                </span>
                            </td>
                            <td className="py-5 px-6 text-slate-600 hidden md:table-cell">
                                Your home value goes up (avg 4.1%), but your property taxes do NOT.
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-5 px-6">
                                <span className="font-bold text-slate-900 block text-lg">Local Utility Rebates</span>
                                <span className="text-sm text-slate-500">Oncor, AEP, Austin Energy</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                                    $2.5k - $5k+
                                </span>
                                <span className="block text-xs text-slate-500 mt-1">Varies by Provider</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-100">
                                    <Minus className="h-3.5 w-3.5" /> Specific Utilities
                                </span>
                            </td>
                            <td className="py-5 px-6 text-slate-600 hidden md:table-cell">
                                Direct cash incentives or bill credits. Ask installer to check your eligibility.
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-5 px-6">
                                <span className="font-bold text-slate-900 block text-lg">Solar Buyback Plans</span>
                                <span className="text-sm text-slate-500">Texas REPs</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                                    Bill Credits
                                </span>
                                <span className="block text-xs text-slate-500 mt-1">1:1 or RTW</span>
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
                                    <Check className="h-3.5 w-3.5" /> Deregulated Areas
                                </span>
                            </td>
                            <td className="py-5 px-6 text-slate-600 hidden md:table-cell">
                                Sell your excess energy back to the grid to offset night-time usage.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
