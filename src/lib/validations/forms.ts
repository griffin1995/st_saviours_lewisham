import { z } from 'zod';

// Base validation schemas
const emailSchema = z.string().email({ message: 'Please enter a valid email address' });

const phoneSchema = z
  .string()
  .min(10, { message: 'Phone number must be at least 10 digits' })
  .max(15, { message: 'Phone number must not exceed 15 digits' })
  .regex(/^[\d+\-\s()]+$/, { message: 'Please enter a valid phone number' });

const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(50, { message: 'Name must not exceed 50 characters' })
  .regex(/^[a-zA-Z\s'-]+$/, { message: 'Name contains invalid characters' });

// Newsletter signup form
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: nameSchema.optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive newsletters',
  }),
});

// Contact form schema
export const contactSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters' })
    .max(100, { message: 'Subject must not exceed 100 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must not exceed 1000 characters' }),
  preferredContact: z.enum(['email', 'phone']).refine(val => val, {
    message: 'Please select a preferred contact method',
  }),
  urgent: z.boolean().optional(),
});

// Prayer request form
export const prayerRequestSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  prayerType: z.enum(['thanksgiving', 'petition', 'intercession', 'healing', 'other']).refine(val => val, {
    message: 'Please select a prayer type',
  }),
  request: z
    .string()
    .min(10, { message: 'Prayer request must be at least 10 characters' })
    .max(500, { message: 'Prayer request must not exceed 500 characters' }),
  anonymous: z.boolean().optional(),
  shareWithCommunity: z.boolean().optional(),
});

// Mass intention form
export const massIntentionSchema = z.object({
  requestedBy: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  intentionFor: z
    .string()
    .min(2, { message: 'Please specify who the intention is for' })
    .max(100, { message: 'Intention name must not exceed 100 characters' }),
  occasionType: z.enum(['deceased', 'living', 'anniversary', 'birthday', 'wedding', 'other']).refine(val => val, {
    message: 'Please select an occasion type',
  }),
  preferredDate: z.date().optional(),
  specialInstructions: z.string().max(200, { 
    message: 'Special instructions must not exceed 200 characters' 
  }).optional(),
  donation: z.number().min(0, { message: 'Donation amount must be positive' }).optional(),
});

// Event registration form
export const eventRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  eventId: z.string().min(1, { message: 'Event ID is required' }),
  numberOfAttendees: z
    .number()
    .min(1, { message: 'Must have at least 1 attendee' })
    .max(10, { message: 'Maximum 10 attendees per registration' }),
  specialRequirements: z.string().max(300, { 
    message: 'Special requirements must not exceed 300 characters' 
  }).optional(),
  emergencyContact: z.object({
    name: nameSchema,
    phone: phoneSchema,
    relationship: z.string().min(2, { message: 'Please specify relationship' }),
  }).optional(),
});

// Volunteer application form
export const volunteerSchema = z.object({
  personalInfo: z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    dateOfBirth: z.date().refine((date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 16;
    }, { message: 'Must be at least 16 years old' }),
    address: z.string().min(10, { message: 'Please provide complete address' }),
  }),
  availability: z.object({
    weekdays: z.array(z.string()).min(1, { message: 'Select at least one day' }),
    timeSlots: z.array(z.string()).min(1, { message: 'Select at least one time slot' }),
    frequency: z.enum(['weekly', 'biweekly', 'monthly', 'occasional']).refine(val => val, {
      message: 'Please select availability frequency',
    }),
  }),
  interests: z.array(z.string()).min(1, { message: 'Select at least one area of interest' }),
  experience: z.string().max(500, { 
    message: 'Experience description must not exceed 500 characters' 
  }).optional(),
  references: z.array(z.object({
    name: nameSchema,
    relationship: z.string().min(2, { message: 'Please specify relationship' }),
    phone: phoneSchema,
  })).min(1, { message: 'At least one reference is required' }),
  backgroundCheck: z.boolean().refine((val) => val === true, {
    message: 'Background check consent is required',
  }),
});

// Search form
export const searchSchema = z.object({
  query: z
    .string()
    .min(2, { message: 'Search query must be at least 2 characters' })
    .max(100, { message: 'Search query must not exceed 100 characters' }),
  category: z.enum(['all', 'events', 'news', 'sacraments', 'groups', 'resources']).optional(),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
});

// Type exports for TypeScript
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>;
export type MassIntentionFormData = z.infer<typeof massIntentionSchema>;
export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;

// Common validation utilities
export const validateEmail = (email: string) => emailSchema.safeParse(email);
export const validatePhone = (phone: string) => phoneSchema.safeParse(phone);
export const validateName = (name: string) => nameSchema.safeParse(name);

// Form error formatter
export const formatFormErrors = (errors: z.ZodError) => {
  return errors.issues.reduce((acc, error) => {
    const field = error.path.join('.');
    acc[field] = error.message;
    return acc;
  }, {} as Record<string, string>);
};

// Custom validation rules
export const customValidations = {
  // Check if date is not in the past
  futureDate: (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  },
  
  // Check if time is during business hours
  businessHours: (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const startTime = 9 * 60; // 9:00 AM
    const endTime = 17 * 60; // 5:00 PM
    return timeInMinutes >= startTime && timeInMinutes <= endTime;
  },
  
  // Check if string contains profanity (basic implementation)
  noProfanity: (text: string) => {
    const profanityWords = ['bad', 'word']; // Add actual profanity words
    return !profanityWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
  },
};