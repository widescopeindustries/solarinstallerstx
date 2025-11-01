import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TCPAConsentProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
}

export function TCPAConsent({ checked, onCheckedChange, required = true }: TCPAConsentProps) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <Checkbox
        id="tcpa-consent"
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={required}
        className="mt-0.5"
      />
      <div className="flex-1">
        <Label 
          htmlFor="tcpa-consent" 
          className="text-sm font-normal cursor-pointer leading-relaxed"
        >
          By checking this box and submitting this form, I consent to receive marketing calls, 
          texts, and emails from SolarInstallersTX.com and its partners at the phone number and 
          email address provided above, including through the use of automated technology. 
          I understand consent is not required to make a purchase and I may opt out at any time.
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <p className="text-xs text-muted-foreground mt-2">
          Message and data rates may apply. Reply STOP to opt out of SMS.
        </p>
      </div>
    </div>
  );
}
