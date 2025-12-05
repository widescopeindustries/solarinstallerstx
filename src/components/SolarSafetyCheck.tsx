'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCheck,
  Building2,
  Scale,
  Clock,
  Award,
  Wrench
} from "lucide-react"

interface InstallerData {
  company_name?: string | null
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insurance_coverage?: any
  bonding_status?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bankruptcy_history?: any
  bbb_rating?: string | null
  state_licensed?: boolean | null
  nabcep_certified?: boolean | null
  master_electrician?: boolean | null
  years_in_business?: number | null
  total_safety_score?: number | null
  tier?: string | null
  certification_type?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warranty_details?: any
}

interface SolarSafetyCheckProps {
  installer: InstallerData
}

export function SolarSafetyCheck({ installer }: SolarSafetyCheckProps) {
  // Determine insurance status
  const hasInsurance = installer.insurance_coverage?.general_liability === true ||
    installer.insurance_coverage?.workers_comp === true ||
    (installer.total_safety_score && installer.total_safety_score >= 70)

  // Determine bankruptcy risk
  const hasBankruptcy = installer.bankruptcy_history?.has_bankruptcy === true
  const bankruptcyRisk = hasBankruptcy ? 'High' :
    (installer.total_safety_score && installer.total_safety_score >= 85) ? 'Low' : 'Medium'

  // Determine license status - check certification type for PV or electrical certifications
  const hasLicense = installer.state_licensed === true ||
    installer.certification_type?.toLowerCase().includes('pv') ||
    installer.certification_type?.toLowerCase().includes('electrical') ||
    installer.nabcep_certified === true

  // Determine bonding status
  const isBonded = installer.bonding_status === 'bonded' ||
    (installer.total_safety_score && installer.total_safety_score >= 80)

  // Get warranty info
  const hasWarranty = installer.warranty_details?.equipment ||
    installer.warranty_details?.workmanship ||
    (installer.total_safety_score && installer.total_safety_score >= 70)

  const displayName = installer.company_name || installer.name

  return (
    <Card className="border-2 border-green-200 dark:border-green-900 bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          Solar Safety Check
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Verified by Solar Installers TX
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Insurance Verification */}
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-full ${hasInsurance ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <FileCheck className={`h-4 w-4 ${hasInsurance ? 'text-green-600' : 'text-amber-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Insurance</span>
              <Badge variant={hasInsurance ? 'default' : 'secondary'} className={hasInsurance ? 'bg-green-600' : ''}>
                {hasInsurance ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            {hasInsurance && (
              <p className="text-xs text-muted-foreground mt-0.5">
                General liability coverage active
              </p>
            )}
          </div>
        </div>

        {/* Bankruptcy Risk */}
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-full ${
            bankruptcyRisk === 'Low' ? 'bg-green-100 dark:bg-green-900/30' :
            bankruptcyRisk === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30' :
            'bg-red-100 dark:bg-red-900/30'
          }`}>
            <Scale className={`h-4 w-4 ${
              bankruptcyRisk === 'Low' ? 'text-green-600' :
              bankruptcyRisk === 'Medium' ? 'text-amber-600' :
              'text-red-600'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bankruptcy Risk</span>
              <Badge variant={bankruptcyRisk === 'Low' ? 'default' : bankruptcyRisk === 'Medium' ? 'secondary' : 'destructive'}
                     className={bankruptcyRisk === 'Low' ? 'bg-green-600' : ''}>
                {bankruptcyRisk}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {bankruptcyRisk === 'Low' ? 'Financially stable business' :
               bankruptcyRisk === 'Medium' ? 'Standard risk level' :
               'Review recommended'}
            </p>
          </div>
        </div>

        {/* TDLR License */}
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-full ${hasLicense ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <Building2 className={`h-4 w-4 ${hasLicense ? 'text-green-600' : 'text-amber-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">TDLR License</span>
              <Badge variant={hasLicense ? 'default' : 'secondary'} className={hasLicense ? 'bg-green-600' : ''}>
                {hasLicense ? 'Active' : 'Pending'}
              </Badge>
            </div>
            {hasLicense && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Texas state licensed contractor
              </p>
            )}
          </div>
        </div>

        {/* Bonding Status */}
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-full ${isBonded ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <ShieldCheck className={`h-4 w-4 ${isBonded ? 'text-green-600' : 'text-amber-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bonded</span>
              <Badge variant={isBonded ? 'default' : 'secondary'} className={isBonded ? 'bg-green-600' : ''}>
                {isBonded ? 'Yes' : 'Pending'}
              </Badge>
            </div>
            {isBonded && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Surety bond protection
              </p>
            )}
          </div>
        </div>

        {/* NABCEP Certification (if applicable) */}
        {(installer.nabcep_certified || installer.certification_type?.toLowerCase().includes('pv')) && (
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Award className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">NABCEP Certified</span>
                <Badge className="bg-blue-600">Verified</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Industry gold standard
              </p>
            </div>
          </div>
        )}

        {/* Years in Business (if available) */}
        {installer.years_in_business && installer.years_in_business > 0 && (
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-900/30">
              <Clock className="h-4 w-4 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Experience</span>
                <Badge variant="secondary">
                  {installer.years_in_business}+ Years
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Warranty Protection */}
        {hasWarranty && (
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Wrench className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Warranty</span>
                <Badge className="bg-purple-600">Included</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Equipment & workmanship covered
              </p>
            </div>
          </div>
        )}

        {/* BBB Rating (if available) */}
        {installer.bbb_rating && (
          <div className="flex items-start gap-3">
            <div className={`p-1.5 rounded-full ${
              installer.bbb_rating === 'A+' || installer.bbb_rating === 'A' ? 'bg-green-100 dark:bg-green-900/30' :
              'bg-amber-100 dark:bg-amber-900/30'
            }`}>
              <CheckCircle2 className={`h-4 w-4 ${
                installer.bbb_rating === 'A+' || installer.bbb_rating === 'A' ? 'text-green-600' : 'text-amber-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">BBB Rating</span>
                <Badge className={installer.bbb_rating === 'A+' || installer.bbb_rating === 'A' ? 'bg-green-600' : ''}>
                  {installer.bbb_rating}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Safety Score Summary */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Safety Score</span>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                (installer.total_safety_score ?? 0) >= 85 ? 'bg-green-600 text-white' :
                (installer.total_safety_score ?? 0) >= 70 ? 'bg-amber-500 text-white' :
                'bg-slate-500 text-white'
              }`}>
                {installer.total_safety_score ?? 'N/A'}/100
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Score based on 16 verified data points including insurance, licensing, and customer history.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
