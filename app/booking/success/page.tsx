'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    const lastBooking = sessionStorage.getItem('lastBooking');
    if (lastBooking) {
      setBooking(JSON.parse(lastBooking));
      sessionStorage.removeItem('lastBooking');
    }
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const calculatePrice = (b: BookingData) => {
    const basePrices: Record<string, number> = { '1': 2000, '2': 3500, '3': 5000, '4-6': 8000 };
    const base = basePrices[b.bedroomCount] ?? 0;
    const floorCharge = (b.floorOut + b.floorIn) * 200;
    const officePremium = b.movingType === 'office' ? 1000 : 0;
    return base + floorCharge + officePremium;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-blue-600 py-4 px-4 flex items-center gap-2 justify-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="#2563EB" className="w-5 h-5">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg">BoxBhai-Movers</span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Green success header */}
          <div className="bg-green-50 px-6 py-8 text-center border-b border-green-100">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-10 h-10">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h1>
            <p className="text-gray-500 text-sm">
              Our team will contact you shortly to confirm the details.
            </p>
            {booking && (
              <div className="mt-4 inline-block bg-blue-600 text-white text-xs font-mono font-semibold px-4 py-1.5 rounded-full tracking-wider">
                {booking.bookingId}
              </div>
            )}
          </div>

          {booking ? (
            <div className="p-6 space-y-5">
              {/* Customer Info */}
              <Section title="Customer Details">
                <Row label="Name" value={booking.name} />
                <Row label="Phone" value={booking.number} />
                {booking.email && <Row label="Email" value={booking.email} />}
                <Row label="Moving Date" value={formatDate(booking.movingDate)} highlight />
              </Section>

              {/* Locations */}
              <Section title="Locations">
                <div className="space-y-3">
                  <LocationRow
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" className="w-4 h-4">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      </svg>
                    }
                    label="Pickup"
                    value={booking.pickupLocation}
                    sub={`Floor ${booking.floorOut}`}
                  />
                  <div className="flex justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                  <LocationRow
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" className="w-4 h-4">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      </svg>
                    }
                    label="Dropoff"
                    value={booking.dropoffLocation}
                    sub={`Floor ${booking.floorIn}`}
                  />
                </div>
              </Section>

              {/* Moving Details */}
              <Section title="Moving Details">
                <Row
                  label="Type"
                  value={booking.movingType === 'family' ? '🏠 Family Shifting' : '🏢 Office Shifting'}
                />
                <Row label="Bedrooms" value={`${booking.bedroomCount} BHK`} />
              </Section>

              {/* Price */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Estimated Total</p>
                  <p className="text-xs text-blue-500">GST included · No hidden charges</p>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  ₹{calculatePrice(booking).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400 text-sm py-10">
              No booking details found.
            </div>
          )}

          {/* Actions */}
          <div className="px-6 pb-6 space-y-3">
            <Link
              href="/booking"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Book Another Move
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-3 rounded-xl text-center transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need help? Call us at{' '}
          <a href="tel:+8801700000000" className="text-blue-600 hover:underline">
            +880 1700 000000
          </a>
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className={`text-sm font-medium text-right ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}

function LocationRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}
