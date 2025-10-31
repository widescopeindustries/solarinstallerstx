import { z } from "zod";

// Quote form validation schema
export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
  propertyType: z.enum(["residential", "commercial"], {
    required_error: "Please select a property type",
  }),
  roofType: z.enum(["asphalt", "metal", "tile", "flat", "other"], {
    required_error: "Please select a roof type",
  }),
  monthlyBill: z.string().min(1, "Please enter your monthly electric bill"),
  notes: z.string().optional(),
  tcpaConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive communications",
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number").optional().or(z.literal("")),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter signup validation
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
