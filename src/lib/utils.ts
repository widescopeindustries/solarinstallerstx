import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskCertificationNumber(certNumber: string, isAuthenticated: boolean): string {
  if (isAuthenticated || !certNumber) {
    return certNumber;
  }
  
  // Mask the certification number, keeping first 4 chars and format
  // Example: "PVIP-123456-789" -> "PVIP-****-***"
  const parts = certNumber.split('-');
  
  if (parts.length > 1) {
    return parts.map((part, index) => {
      if (index === 0) return part; // Keep prefix (e.g., "PVIP")
      return '*'.repeat(Math.min(part.length, 4)); // Mask other parts
    }).join('-');
  }
  
  // For non-hyphenated numbers, show first 4 chars
  if (certNumber.length > 4) {
    return certNumber.substring(0, 4) + '*'.repeat(Math.min(certNumber.length - 4, 8));
  }
  
  return '****';
}
