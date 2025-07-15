import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations/forms';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
  showFirstName?: boolean;
  placeholder?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className,
  variant = 'default',
  showFirstName = true,
  placeholder = 'Enter your email address',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      consent: false,
    },
  });

  const watchedEmail = watch('email');

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API call - replace with actual implementation
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseClasses = cn(
    'relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm',
    className
  );

  const inputClasses = cn(
    'w-full rounded-md border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500',
    'focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20',
    'transition-all duration-200 ease-in-out',
    'disabled:cursor-not-allowed disabled:opacity-50'
  );

  const renderCompactForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <input
          {...register('email')}
          type="email"
          placeholder={placeholder}
          className={cn(inputClasses, errors.email && 'border-red-500')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        className="shrink-0"
      >
        Subscribe
      </Button>
    </form>
  );

  const renderInlineForm = () => (
    <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
      <div className="flex-1 relative">
        <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          {...register('email')}
          type="email"
          placeholder={placeholder}
          className="w-full border-0 bg-transparent py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
          disabled={isSubmitting}
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        className="rounded-none border-0 bg-gold-600 hover:bg-gold-700"
      >
        Subscribe
      </Button>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={baseClasses}>
        <div className="p-4">
          {renderCompactForm()}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInlineForm()}
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Stay Connected</h3>
          <p className="mt-1 text-sm text-gray-600">
            Get weekly updates about parish events, spiritual reflections, and community news.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitStatus === 'success' ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Thank you for subscribing!
              </h4>
              <p className="text-gray-600">
                You'll receive a confirmation email shortly. Welcome to our community!
              </p>
            </m.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {showFirstName && (
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name (Optional)
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      className={cn(inputClasses, 'pl-10')}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder={placeholder}
                    className={cn(
                      inputClasses,
                      'pl-10',
                      errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                    disabled={isSubmitting}
                  />
                  {watchedEmail && !errors.email && (
                    <CheckCircleIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('consent')}
                    id="consent"
                    type="checkbox"
                    className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="text-gray-700">
                    I agree to receive newsletters and updates from St Saviour's Catholic Church.
                    You can unsubscribe at any time.
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                  )}
                </div>
              </div>

              {submitStatus === 'error' && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md bg-red-50 p-4 border border-red-200"
                >
                  <div className="flex">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800">
                        Subscription Failed
                      </h4>
                      <p className="mt-1 text-sm text-red-700">
                        {errorMessage || 'There was an error subscribing to the newsletter. Please try again.'}
                      </p>
                    </div>
                  </div>
                </m.div>
              )}

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};