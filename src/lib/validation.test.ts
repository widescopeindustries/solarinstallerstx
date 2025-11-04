import { describe, it, expect } from 'vitest';
import {
  quoteFormSchema,
  contactFormSchema,
  newsletterSchema,
} from './validation';

describe('validation schemas', () => {
  describe('quoteFormSchema', () => {
    it('should validate a valid quote form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject name that is too short', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        phone: '1234567890',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 2 characters');
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '1234567890',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email');
      }
    });

    it('should reject invalid phone number', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('10-digit phone');
      }
    });

    it('should reject invalid ZIP code', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        zipCode: '123',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('5-digit ZIP');
      }
    });

    it('should reject when TCPA consent is false', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        tcpaConsent: false,
      };

      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('consent');
      }
    });

    it('should accept commercial property type', () => {
      const validData = {
        name: 'Jane Business',
        email: 'jane@company.com',
        phone: '9876543210',
        zipCode: '54321',
        propertyType: 'commercial' as const,
        roofType: 'flat' as const,
        monthlyBill: '500',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept optional notes field', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        zipCode: '12345',
        propertyType: 'residential' as const,
        roofType: 'asphalt' as const,
        monthlyBill: '150',
        notes: 'I have a large roof',
        tcpaConsent: true,
      };

      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('contactFormSchema', () => {
    it('should validate a valid contact form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        subject: 'Question about services',
        message: 'I would like to know more about your solar installation services.',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept empty phone number', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        subject: 'Question about services',
        message: 'I would like to know more.',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject subject that is too short', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hi',
        message: 'This is my message.',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 5 characters');
      }
    });

    it('should reject message that is too short', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Valid subject',
        message: 'Short',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 characters');
      }
    });
  });

  describe('newsletterSchema', () => {
    it('should validate a valid email', () => {
      const validData = {
        email: 'subscriber@example.com',
      };

      const result = newsletterSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
      };

      const result = newsletterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email');
      }
    });

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
      };

      const result = newsletterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
