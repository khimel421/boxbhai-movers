'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/store/bookingStore';

interface BookingData {
  bookingId: string;
  name: string;
  number: string;
  email: string;
  movingDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  movingType: 'family' | 'office';
  bedroomCount: '1' | '2' | '3' | '4-6';
  floorOut: number;
  floorIn: number;
}

export default function SuccessPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const { resetForm } = useBookingStore();

  useEffect(() => {
    const lastBooking = sessionStorage.getItem('lastBooking');
    if (lastBooking) {
      setBooking(JSON.parse(lastBooking));
      sessionStorage.removeItem('lastBooking');
    }
    resetForm();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Blue success header */}
        <div className="bg-blue-600 px-6 pt-8 pb-6 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-7 h-7">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-white text-lg font-bold leading-snug mb-1">
            আপনার তথ্য জমা দেওয়ার জন্য ধন্যবাদ
          </h1>
          <p className="text-blue-100 text-xs leading-relaxed">
            আমরা আপনার মুভিং ডিটেইলস পেয়েছি আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন
          </p>
          <div className="mt-4 bg-white/20 rounded-lg px-4 py-2 inline-block">
            <span className="text-white font-bold text-sm tracking-wide">
              অর্ডার নং: {booking?.bookingId ?? 'BXM-00006'}
            </span>
          </div>
        </div>

        {/* Call CTA */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-700 font-semibold text-sm mb-2">এখনই কল করুন</p>
            <a
              href="tel:+8801631496748"
              className="flex items-center justify-center gap-2 text-blue-600 font-bold text-2xl hover:text-blue-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
              </svg>
              +880 1631-496-748
            </a>
            <p className="text-gray-400 text-xs mt-2">
              আমাদের মুভিং স্পেশালিস্ট আপনাকে সহায়তা করতে প্রস্তুত রয়েছেন!
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-3 px-6 py-5 border-b border-gray-100">
          {/* Expert Support */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" className="w-6 h-6">
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-5 0-8 2-8 3v1h16v-1c0-1-3-3-8-3z" />
                <path d="M18 8a6 6 0 0 1-1.5 4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-gray-600 text-xs leading-tight">এক্সপার্ট সাপোর্ট</p>
          </div>

          {/* Verified Service */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" className="w-6 h-6">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
                <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-gray-600 text-xs leading-tight">ভেরিফাইড সার্ভিস প্রোভাইডার</p>
          </div>

          {/* 100% Guarantee */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" className="w-6 h-6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="text-gray-600 text-xs leading-tight">১০০% গ্যারান্টি সার্ভিস</p>
          </div>
        </div>

        {/* Home button */}
        <div className="px-6 py-5">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
