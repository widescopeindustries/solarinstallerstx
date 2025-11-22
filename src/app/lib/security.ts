/**
 * Security utilities for input sanitization and validation
 * Used to protect against XSS, injection attacks, and data integrity issues
 */

// Sanitize user input - remove any potentially dangerous characters
export function sanitizeInput(input: string): string {
  // Remove HTML tags and special characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '') // Remove dangerous characters
    .trim()
}

// Validate and sanitize phone number
export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters and limit to 10 digits
  return phone.replace(/\D/g, '').slice(0, 10)
}

// Format phone number for display
export function formatPhone(phone: string): string {
  const cleaned = sanitizePhone(phone)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate ZIP code (US 5-digit)
export function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode)
}

// Check if ZIP code is in Texas
export function isTexasZipCode(zipCode: string): boolean {
  if (!isValidZipCode(zipCode)) return false

  // Texas ZIP code prefixes
  const texasZipPrefixes = ['75', '76', '77', '78', '79', '73', '88']
  const prefix = zipCode.substring(0, 2)

  return texasZipPrefixes.includes(prefix)
}

// Rate limiting helper (placeholder - implement with Redis/Upstash in production)
export function checkRateLimit(identifier: string, action: string): boolean {
  // TODO: Implement actual rate limiting with Redis/Upstash
  // For now, return true (allow all requests)
  // In production, this should:
  // 1. Track requests per IP/user
  // 2. Implement sliding window or token bucket algorithm
  // 3. Return false if rate limit exceeded
  return true
}

// Sanitize text input (for names, addresses, etc.)
export function sanitizeTextInput(input: string, maxLength: number = 100): string {
  return sanitizeInput(input).slice(0, maxLength)
}

// Validate and sanitize numeric input
export function sanitizeNumericInput(input: string | number, min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  const num = typeof input === 'string' ? parseInt(input, 10) : input

  if (isNaN(num)) return min

  return Math.max(min, Math.min(max, num))
}
