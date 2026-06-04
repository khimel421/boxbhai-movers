export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left content */}
          <div className="flex-1 max-w-xl z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              ঢাকায় বাসা অথবা অফিস মুভিং
              <br />
              করুন সবচেয়ে কম খরচে
            </h1>
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
              ঢাকার সবচেয়ে নির্ভরযোগ্য মুভিং সার্ভিস বাসা বদল থেকে ট্রাক ভাড়া প্রতিটি
              মুভে সহজ, দ্রুত ও ঝামেলামুক্ত অভিজ্ঞতা।
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-7">
              <button className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md">
                মুভিং সার্ভিস বুক করুন
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors">
                ট্রাক বুক করুন
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="font-semibold text-white">4.8 Star Review</span>
            </div>
          </div>

          {/* Right - Truck illustration placeholder */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-sm md:max-w-md">
              {/* Three truck cards stacked */}
              <div className="relative h-64 md:h-80">
                {/* Back truck */}
                <div className="absolute top-0 right-0 w-56 md:w-72 h-36 md:h-44 bg-blue-500 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-blue-400 opacity-70 rotate-3">
                  <TruckIllustration size="lg" />
                </div>
                {/* Middle truck */}
                <div className="absolute top-8 right-6 w-56 md:w-72 h-36 md:h-44 bg-blue-400 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-blue-300 opacity-85 rotate-1">
                  <TruckIllustration size="lg" />
                </div>
                {/* Front truck */}
                <div className="absolute top-16 right-12 w-56 md:w-72 h-36 md:h-44 bg-blue-300 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white">
                  <TruckIllustration size="lg" />
                  <span className="absolute bottom-3 right-3 text-blue-800 font-bold text-sm">BoxBhai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-blue-900/60 backdrop-blur-sm border-t border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <StatItem icon={<PeopleIcon />} value="২০০+" label="সকল মুভিং সার্ভিস" />
            <StatItem icon={<LocationIcon />} value="ঢাকা সিটি" label="সার্ভিস এরিয়া" />
            <StatItem icon={<CheckIcon />} value="১০০%" label="নিরাপদ ও নিশ্চিতযোগ্য" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-white font-bold text-lg md:text-xl leading-tight">{value}</div>
        <div className="text-blue-200 text-xs md:text-sm">{label}</div>
      </div>
    </div>
  );
}

function TruckIllustration({ size }: { size: "sm" | "lg" }) {
  const s = size === "lg" ? "w-28 h-20" : "w-20 h-14";
  return (
    <svg viewBox="0 0 120 80" className={s} fill="none">
      {/* Truck body */}
      <rect x="5" y="20" width="75" height="45" rx="4" fill="#1e40af" />
      {/* Cab */}
      <rect x="78" y="32" width="32" height="33" rx="4" fill="#1e3a8a" />
      {/* Windshield */}
      <rect x="82" y="35" width="22" height="15" rx="2" fill="#93c5fd" opacity="0.8" />
      {/* Wheels */}
      <circle cx="25" cy="67" r="9" fill="#1e3a8a" />
      <circle cx="25" cy="67" r="5" fill="#60a5fa" />
      <circle cx="90" cy="67" r="9" fill="#1e3a8a" />
      <circle cx="90" cy="67" r="5" fill="#60a5fa" />
      {/* Logo text on body */}
      <text x="20" y="46" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">BoxBhai</text>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
