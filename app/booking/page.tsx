'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/store/bookingStore';
import { Step1Form } from '@/components/Step1Form';
import { Step2Form } from '@/components/Step2Form';
import { Step3Confirmation } from '@/components/Step3Confirmation';
import { ProgressIndicator } from '@/components/ProgressIndicator';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentStep, setCurrentStep } = useBookingStore();

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (!stepParam) return;
    const step = parseInt(stepParam);
    if (step === 1 || step === 2 || step === 3) {
      setCurrentStep(step);
    }
  }, [searchParams, setCurrentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('step', currentStep.toString());
    router.push(`/booking?${params.toString()}`, { scroll: false });
  }, [currentStep, router, searchParams]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Form />;
      case 2: return <Step2Form />;
      case 3: return <Step3Confirmation />;
      default: return <Step1Form />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 mb-4 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          হোম পেজে ফিরে যান
        </Link>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-4 sm:px-6 bg-blue-600">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Book Your Shifting Service</h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">Quick and easy booking process</p>
          </div>
          <div className="px-4 pt-5 sm:px-6 sm:pt-6">
            <ProgressIndicator currentStep={currentStep} />
          </div>
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">লোড হচ্ছে...</div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
