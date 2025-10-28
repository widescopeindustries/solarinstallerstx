import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AffiliateDisclosure({ className = "my-6" }: { className?: string }) {
  return (
    <Alert className={`border-amber-200 bg-amber-50/50 ${className}`}>
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-sm text-amber-900">
        <strong>Affiliate Disclosure:</strong> SolarInstallersTX.com participates in affiliate marketing programs. 
        When you click on certain links and make a purchase, we may receive a commission at no additional cost to you. 
        This helps us maintain our free directory service. We only recommend products and services we believe will 
        provide value to our users. Our editorial content is not influenced by affiliate partnerships.
      </AlertDescription>
    </Alert>
  );
}
