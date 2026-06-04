"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    email: "",
    pickup: "",
    dropoff: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API
    alert("আপনার রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-blue-200 px-8 py-10">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
        মুভিং সার্ভিস রিকোয়েস্ট করুন
      </h1>
      <p className="text-center text-gray-500 text-sm mb-8">
        সার্ভিস বুক করতে আপনার প্রয়োজনীয় সকল তথ্য জমা দিন আমাদের টিম আপনার সাথে খুব
        দ্রুত যোগাযোগ করবে
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1 — Name + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rahmat Ullah Gazi"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার ফোন নাম্বার <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="01631XXXXXX"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Row 2 — Date + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              কবে মুভ করবেন? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="29/04/2026"
                required
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আপনার ই-মেইল{" "}
              <span className="text-gray-400 font-normal">(অপসনাল)</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="boxbhai.official@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Pickup location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            পিকআপ লোকেশন <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              </svg>
            </span>
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              placeholder="Mohammadpur, Tajmohol Road"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Drop-off location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ড্রপঅফ লোকেশন লোকেশন <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              </svg>
            </span>
            <input
              type="text"
              name="dropoff"
              value={form.dropoff}
              onChange={handleChange}
              placeholder="Uttara, Sector 11"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 text-base"
        >
          পরবর্তী
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
