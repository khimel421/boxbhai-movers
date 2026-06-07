// components/Step3Confirmation.tsx
'use client';

import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Step3Confirmation() {
  const router = useRouter();
  const { firstStep, secondStep, resetForm, setCurrentStep } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if previous steps not completed
  if (!firstStep || !secondStep) {
    if (!firstStep) router.push('/booking?step=1');
    else if (!secondStep) router.push('/booking?step=2');
    return null;
  }
  
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to create booking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would:
    // 1. Send data to your backend API
    // 2. Process payment
    // 3. Send confirmation email/SMS
    // 4. Create booking record in database
    
    const bookingData = {
      ...firstStep,
      ...secondStep,
      bookingId: `SHIFT-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    console.log('Booking confirmed:', bookingData);
    
    // Store in session for thank you page
    sessionStorage.setItem('lastBooking', JSON.stringify(bookingData));
    
    // Reset form and redirect to success page
    resetForm();
    router.push('/booking/success');
  };
  
  // Calculate estimated price
  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base on bedroom count
    switch (secondStep.bedroomCount) {
      case '1': basePrice = 2000; break;
      case '2': basePrice = 3500; break;
      case '3': basePrice = 5000; break;
      case '4-6': basePrice = 8000; break;
    }
    
    // Add floor charges
    const floorCharge = (secondStep.floorOut + secondStep.floorIn) * 200;
    
    // Add moving type premium
    const typePremium = secondStep.movingType === 'office' ? 1000 : 0;
    
    return basePrice + floorCharge + typePremium;
  };
  
  const price = calculatePrice();
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-green-500 text-xl mr-2">✓</div>
          <p className="text-green-800">
            Please review your details before confirming
          </p>
        </div>
      </div>
      
      {/* Customer Details */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">Customer Details</h3>
        </div>
        <div className="p-4 space-y-2">
          <p><span className="font-medium">Name:</span> {firstStep.name}</p>
          <p><span className="font-medium">Phone:</span> {firstStep.number}</p>
          <p><span className="font-medium">Email:</span> {firstStep.email}</p>
          <p><span className="font-medium">Moving Date:</span> {new Date(firstStep.movingDate).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Location Details */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">Location Details</h3>
        </div>
        <div className="p-4 space-y-2">
          <p><span className="font-medium">Pickup:</span> {firstStep.pickupLocation}</p>
          <p><span className="font-medium">Dropoff:</span> {firstStep.dropoffLocation}</p>
          <p><span className="font-medium">Pickup Floor:</span> {secondStep.floorOut}</p>
          <p><span className="font-medium">Dropoff Floor:</span> {secondStep.floorIn}</p>
        </div>
      </div>
      
      {/* Moving Details */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">Moving Details</h3>
        </div>
        <div className="p-4 space-y-2">
          <p>
            <span className="font-medium">Type:</span>{' '}
            {secondStep.movingType === 'family' ? '🏠 Family' : '🏢 Office'}
          </p>
          <p>
            <span className="font-medium">Bedrooms:</span> {secondStep.bedroomCount}
          </p>
        </div>
      </div>
      
      {/* Price Breakdown */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">Price Breakdown</h3>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between">
            <span>Base price ({secondStep.bedroomCount} BHK):</span>
            <span>₹{price - (secondStep.floorOut + secondStep.floorIn) * 200 - (secondStep.movingType === 'office' ? 1000 : 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Floor charges (₹200/floor):</span>
            <span>₹{(secondStep.floorOut + secondStep.floorIn) * 200}</span>
          </div>
          {secondStep.movingType === 'office' && (
            <div className="flex justify-between">
              <span>Commercial shifting premium:</span>
              <span>₹1000</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total Amount:</span>
              <span className="text-xl text-blue-600">₹{price}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              *GST included. No hidden charges
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ← Back
        </button>
        <div className="space-x-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}