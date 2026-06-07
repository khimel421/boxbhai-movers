// components/ProgressIndicator.tsx
'use client';

import { useBookingStore } from '@/store/bookingStore';

const steps = [
  { number: 1, label: 'Basic Info', icon: '📝' },
  { number: 2, label: 'Moving Details', icon: '📦' },
  { number: 3, label: 'Confirmation', icon: '✓' },
];

export function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const { firstStep, secondStep } = useBookingStore();
  
  const isStepCompleted = (step: number) => {
    if (step === 1) return firstStep !== null;
    if (step === 2) return secondStep !== null;
    return false;
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = isStepCompleted(step.number);
          const isActive = currentStep === step.number;
          const isPast = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex-1 relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className={`
                  absolute top-5 left-1/2 w-full h-0.5
                  ${isPast || isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                `} />
              )}
              
              {/* Step circle */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                `}>
                  {isCompleted ? '✓' : step.icon}
                </div>
                
                {/* Label */}
                <div className="mt-2 text-center">
                  <div className={`
                    text-sm font-medium
                    ${isActive ? 'text-blue-600' : ''}
                    ${isCompleted ? 'text-green-600' : 'text-gray-500'}
                  `}>
                    Step {step.number}
                  </div>
                  <div className="text-xs text-gray-400 hidden sm:block">
                    {step.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}