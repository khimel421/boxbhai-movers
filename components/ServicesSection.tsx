"use client";

import Link from "next/link";

const services = [
  {
    id: 1,
    tag: "কমপ্লিট মুভিং সার্ভিস",
    title: "বাসা শিফটিং",
    description:
      "প্রফেশনাল প্যাকার, মুভার ও লোডারসহ সম্পূর্ণ হোম মুভিং সার্ভিস। ডোর-টু-ডোর সার্ভিস প্রতিটি ধাপে আমি আপনার পাশে।",
    features: ["প্রফেশনাল প্যাকিং", "লোডিং ও আনলোডিং", "নিরাপদ পরিবহন", "সাশ্রয়ী মূল্য"],
    icon: <HomeIcon />,
    imageSlot: "shifting_service.jpg",
    bookingHref: "/booking",
  },
  // {
  //   id: 2,
  //   tag: "নিরাপদ ট্রান্সপোর্ট সার্ভিস",
  //   title: "ট্রাক ভাড়া",
  //   description:
  //     "শুধু ট্রাকই কি প্রয়োজন? আমাদের স্মার্ট প্ল্যাটফর্ম থেকে সঠিক ট্রাক নির্বাচন করুন সহজ, নির্ভরযোগ্য ও সাশ্রয়ী ট্রান্সপোর্ট।",
  //   features: ["বিভিন্ন আকারের ট্রাক", "ভেরিফাইড ট্রাক", "নিরাপদ পরিবহন", "সাশ্রয়ী মূল্য"],
  //   icon: <TruckIcon />,
  //   imageSlot: "truck.png",
  //   bookingHref: "/book-truck",
  // },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-12">
          আমাদের{" "}
          <span className="text-blue-600 underline decoration-wavy decoration-blue-300">
            সার্ভিস
          </span>{" "}
          সমূহ
        </h2>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Card header */}
      <div className="bg-[#023BE2] text-white px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          {service.icon}
        </div>
        <div>
          <p className="text-blue-200 text-xs">{service.tag}</p>
          <h3 className="font-bold text-xl">{service.title}</h3>
        </div>
      </div>

      {/* Illustration area */}
      <div className="bg-gray-100 h-52 flex items-center justify-center overflow-hidden">
        {service.imageSlot.endsWith(".jpg") || service.imageSlot.endsWith(".png") ? (
          <img
            src={`/${service.imageSlot}`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : service.imageSlot === "moving" ? (
          <MovingIllustration />
        ) : (
          <TruckCardIllustration />
        )}
      </div>

      {/* Card body */}
      <div className="px-6 py-5">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {f}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            বিস্তারিত জানুন
          </button> */}
          <Link
            href={service.bookingHref}
            className="flex-1 bg-[#023BE2] hover:bg-[#0230c0] text-white font-medium py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 w-[40%]"
          >
            সার্ভিস বুক করুন
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MovingIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      {/* Background */}
      <rect width="300" height="200" fill="#e5e7eb" />
      {/* Box */}
      <rect x="120" y="70" width="70" height="60" rx="4" fill="#d97706" />
      <rect x="120" y="70" width="70" height="15" rx="2" fill="#b45309" />
      <text x="155" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">FRAGILE</text>
      {/* Person 1 */}
      <circle cx="90" cy="65" r="14" fill="#1d4ed8" />
      <rect x="78" y="80" width="24" height="40" rx="6" fill="#1d4ed8" />
      <rect x="72" y="82" width="10" height="28" rx="5" fill="#1d4ed8" />
      <rect x="96" y="82" width="10" height="28" rx="5" fill="#1d4ed8" />
      <rect x="80" y="118" width="10" height="25" rx="5" fill="#1d4ed8" />
      <rect x="92" y="118" width="10" height="25" rx="5" fill="#1d4ed8" />
      {/* Person 2 */}
      <circle cx="210" cy="65" r="14" fill="#1d4ed8" />
      <rect x="198" y="80" width="24" height="40" rx="6" fill="#1d4ed8" />
      <rect x="218" y="82" width="10" height="28" rx="5" fill="#1d4ed8" />
      <rect x="194" y="82" width="10" height="28" rx="5" fill="#1d4ed8" />
      <rect x="200" y="118" width="10" height="25" rx="5" fill="#1d4ed8" />
      <rect x="212" y="118" width="10" height="25" rx="5" fill="#1d4ed8" />
      {/* BoxBhai text on shirts */}
      <text x="90" y="103" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">boxbhai</text>
      <text x="210" y="103" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">boxbhai</text>
    </svg>
  );
}

function TruckCardIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      <rect width="300" height="200" fill="#e5e7eb" />
      {/* Truck body */}
      <rect x="40" y="70" width="140" height="80" rx="6" fill="#1e40af" />
      {/* Cab */}
      <rect x="178" y="88" width="70" height="62" rx="6" fill="#1e3a8a" />
      {/* Windshield */}
      <rect x="184" y="93" width="48" height="30" rx="3" fill="#93c5fd" opacity="0.8" />
      {/* Wheels */}
      <circle cx="85" cy="155" r="18" fill="#374151" />
      <circle cx="85" cy="155" r="10" fill="#6b7280" />
      <circle cx="210" cy="155" r="18" fill="#374151" />
      <circle cx="210" cy="155" r="10" fill="#6b7280" />
      {/* Logo on truck */}
      <text x="110" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">BoxBhai</text>
      {/* Road */}
      <rect x="0" y="168" width="300" height="32" fill="#d1d5db" />
      <rect x="0" y="180" width="300" height="5" fill="#9ca3af" opacity="0.5" />
      {[0,60,120,180,240].map(x => (
        <rect key={x} x={x + 10} y="181" width="35" height="3" fill="white" opacity="0.7" />
      ))}
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
