'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Book Your Shifting Service</h1>
            <p className="text-blue-100 mt-1">Quick and easy booking process</p>
          </div>
          <div className="px-6 pt-6">
            <ProgressIndicator currentStep={currentStep} />
          </div>
          <div className="px-6 py-8">
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
