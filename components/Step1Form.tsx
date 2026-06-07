'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBookingStore } from '@/store/bookingStore';
import { FirstStepData } from '@/types/booking';

const step1Schema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর হতে হবে').max(50, 'নাম অনেক বড়'),
  number: z.string().regex(/^[0-9]{10,11}$/, 'সঠিক মোবাইল নম্বর দিন'),
  movingDate: z.date()
    .min(new Date(), 'তারিখ অতীতে হতে পারবে না')
    .refine((date) => {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);
      return date >= minDate;
    }, 'কমপক্ষে ২ দিন আগে বুকিং করুন'),
  email: z.string().email('সঠিক ইমেইল দিন').or(z.literal('')).optional(),
  pickupLocation: z.string().min(5, 'সঠিক পিকআপ ঠিকানা দিন'),
  dropoffLocation: z.string().min(5, 'সঠিক ড্রপঅফ ঠিকানা দিন'),
});

type Step1FormData = z.infer<typeof step1Schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export function Step1Form() {
  const { firstStep, updateFirstStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: firstStep || { movingDate: new Date() },
  });

  const onSubmit = async (data: Step1FormData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    updateFirstStep(data);
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

  return (
    <div className="bg-white rounded-2xl shadow-md px-6 py-8 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">মুভিং সার্ভিস রিকোয়েস্ট করুন</h2>
        <p className="text-gray-500 text-sm">
          সার্ভিস বুক করতে আপনার প্রয়োজনীয় সকল তথ্য জমা দিন আমাদের টিম আপনার সাথে খুব দ্রুত যোগাযোগ করবে
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className={inputClass}
              placeholder="Rahmat Ullah Gazi"
            />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার ফোন নাম্বার <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('number')}
              className={inputClass}
              placeholder="01XXXXXXXXX"
            />
            <FieldError message={errors.number?.message} />
          </div>
        </div>

        {/* Row 2: Date + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              কবে মুভ করবেন? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                type="date"
                {...register('movingDate', { valueAsDate: true })}
                min={new Date().toISOString().split('T')[0]}
                className={`${inputClass} pl-9`}
              />
            </div>
            <FieldError message={errors.movingDate?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার ই-মেইল <span className="text-gray-400 text-xs">(অপশনাল)</span>
            </label>
            <input
              type="email"
              {...register('email')}
              className={inputClass}
              placeholder="boxbhai.official@gmail.com"
            />
            <FieldError message={errors.email?.message} />
          </div>
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            পিকআপ লোকেশন <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </span>
            <input
              type="text"
              {...register('pickupLocation')}
              className={`${inputClass} pl-9`}
              placeholder="Mohammadpur, Tajmohol Road"
            />
          </div>
          <FieldError message={errors.pickupLocation?.message} />
        </div>

        {/* Dropoff Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ড্রপ লোকেশন <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </span>
            <input
              type="text"
              {...register('dropoffLocation')}
              className={`${inputClass} pl-9`}
              placeholder="Uttara, Sector 11"
            />
          </div>
          <FieldError message={errors.dropoffLocation?.message} />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'অপেক্ষা করুন...' : 'পরবর্তী →'}
          </button>
        </div>
      </form>
    </div>
  );
}
