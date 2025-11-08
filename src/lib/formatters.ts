/**
 * Format a phone number into a standardized format
 * Supports both US (10-digit) and international (11-digit) formats
 * @param phoneNum - The phone number string to format
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (phoneNum: string): string => {
  // Remove all non-numeric characters
  const cleaned = phoneNum.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  // Format as +X (XXX) XXX-XXXX for international
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phoneNum; // Return as-is if format is unexpected
};

/**
 * Format a certification type by extracting the abbreviation
 * @param type - The certification type string
 * @returns Extracted abbreviation or the original type string
 */
export const formatCertificationType = (type: string): string => {
  // Extract the abbreviation if it exists in parentheses
  const match = type.match(/\(([^)]+)\)/);
  return match ? match[1] : type;
};
