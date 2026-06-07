// components/Step1Form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBookingStore } from '@/store/bookingStore';
import { FirstStepData } from '@/types/booking';

// Validation schema
const step1Schema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  number: z.string()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
  movingDate: z.date()
    .min(new Date(), 'Moving date cannot be in the past')
    .refine((date) => {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);
      return date >= minDate;
    }, 'Please book at least 2 days in advance'),
  email: z.string()
    .email('Enter a valid email address'),
  pickupLocation: z.string()
    .min(5, 'Please enter a valid pickup address'),
  dropoffLocation: z.string()
    .min(5, 'Please enter a valid dropoff address'),
});

type Step1FormData = z.infer<typeof step1Schema>;

export function Step1Form() {
  const { firstStep, updateFirstStep } = useBookingStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: firstStep || {
      movingDate: new Date(),
    },
  });
  
  const onSubmit = async (data: Step1FormData) => {
    // Simulate API call for address validation
    await new Promise(resolve => setTimeout(resolve, 500));
    updateFirstStep(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number *
        </label>
        <input
          type="tel"
          {...register('number')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="9876543210"
        />
        {errors.number && (
          <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
        )}
      </div>
      
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      {/* Moving Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Moving Date *
        </label>
        <input
          type="date"
          {...register('movingDate', { valueAsDate: true })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.movingDate && (
          <p className="mt-1 text-sm text-red-600">{errors.movingDate.message}</p>
        )}
      </div>
      
      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location *
        </label>
        <input
          type="text"
          {...register('pickupLocation')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="123 Main St, City, PIN"
        />
        {errors.pickupLocation && (
          <p className="mt-1 text-sm text-red-600">{errors.pickupLocation.message}</p>
        )}
      </div>
      
      {/* Dropoff Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dropoff Location *
        </label>
        <input
          type="text"
          {...register('dropoffLocation')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="456 Oak Ave, City, PIN"
        />
        {errors.dropoffLocation && (
          <p className="mt-1 text-sm text-red-600">{errors.dropoffLocation.message}</p>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Continue →'}
        </button>
      </div>
    </form>
  );
}