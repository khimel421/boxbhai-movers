// components/Step2Form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBookingStore } from '@/store/bookingStore';
import { SecondStepData } from '@/types/booking';
import { useRouter } from 'next/navigation';

const step2Schema = z.object({
  movingType: z.enum(['family', 'office'], {
    required_error: 'Please select moving type',
  }),
  bedroomCount: z.enum(['1', '2', '3', '4-6'], {
    required_error: 'Please select bedroom count',
  }),
  floorOut: z.number()
    .min(1, 'Floor must be between 1-10')
    .max(10, 'Floor must be between 1-10'),
  floorIn: z.number()
    .min(1, 'Floor must be between 1-10')
    .max(10, 'Floor must be between 1-10'),
});

type Step2FormData = z.infer<typeof step2Schema>;

export function Step2Form() {
  const router = useRouter();
  const { secondStep, updateSecondStep, setCurrentStep, firstStep } = useBookingStore();
  
  // Redirect if step 1 not completed
  if (!firstStep) {
    router.push('/booking?step=1');
    return null;
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: secondStep || {
      movingType: 'family',
      bedroomCount: '2',
      floorOut: 1,
      floorIn: 1,
    },
  });
  
  const movingType = watch('movingType');
  
  const onSubmit = async (data: Step2FormData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    updateSecondStep(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Moving Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Moving Type *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`
            relative flex cursor-pointer rounded-lg border p-4
            ${movingType === 'family' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          `}>
            <input
              type="radio"
              value="family"
              {...register('movingType')}
              className="sr-only"
            />
            <div className="flex items-center">
              <div className="text-2xl mr-3">🏠</div>
              <div>
                <div className="font-medium">Family</div>
                <div className="text-sm text-gray-500">Household shifting</div>
              </div>
            </div>
          </label>
          
          <label className={`
            relative flex cursor-pointer rounded-lg border p-4
            ${movingType === 'office' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          `}>
            <input
              type="radio"
              value="office"
              {...register('movingType')}
              className="sr-only"
            />
            <div className="flex items-center">
              <div className="text-2xl mr-3">🏢</div>
              <div>
                <div className="font-medium">Office</div>
                <div className="text-sm text-gray-500">Commercial shifting</div>
              </div>
            </div>
          </label>
        </div>
        {errors.movingType && (
          <p className="mt-1 text-sm text-red-600">{errors.movingType.message}</p>
        )}
      </div>
      
      {/* Bedroom Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bedroom Count *
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['1', '2', '3', '4-6'] as const).map((count) => (
            <label key={count} className="relative flex cursor-pointer">
              <input
                type="radio"
                value={count}
                {...register('bedroomCount')}
                className="sr-only"
              />
              <div className={`
                w-full text-center py-2 rounded-md border
                ${watch('bedroomCount') === count 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50'}
              `}>
                {count}
                {count !== '4-6' && (
                  <span className="text-xs block">
                    {count} BHK
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
        {errors.bedroomCount && (
          <p className="mt-1 text-sm text-red-600">{errors.bedroomCount.message}</p>
        )}
      </div>
      
      {/* Floor Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Floor (Out) *
          </label>
          <select
            {...register('floorOut', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Floor {i + 1} {i === 0 ? '(Ground)' : ''}
              </option>
            ))}
          </select>
          {errors.floorOut && (
            <p className="mt-1 text-sm text-red-600">{errors.floorOut.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dropoff Floor (In) *
          </label>
          <select
            {...register('floorIn', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Floor {i + 1} {i === 0 ? '(Ground)' : ''}
              </option>
            ))}
          </select>
          {errors.floorIn && (
            <p className="mt-1 text-sm text-red-600">{errors.floorIn.message}</p>
          )}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Review Booking →'}
        </button>
      </div>
    </form>
  );
}