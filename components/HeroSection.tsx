import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#01207C]  to-[#023BE2] text-white overflow-hidden relative">
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

          {/* Right - Truck images */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-md h-80 md:h-[26rem]">
              {/* Top-left truck */}
              <div className="absolute top-0 left-0 w-52 md:w-64 drop-shadow-xl">
                <Image
                  src="/truck.png"
                  alt="BoxBhai Truck"
                  width={280}
                  height={180}
                  className="object-contain"
                />
              </div>
              {/* Top-right truck */}
              <div className="absolute top-4 right-12 w-52 md:w-64 drop-shadow-xl">
                <Image
                  src="/truck.png"
                  alt="BoxBhai Truck"
                  width={280}
                  height={180}
                  className="object-contain"
                />
              </div>
              {/* Front-center truck (larger) */}
              <div className="absolute bottom-3 left-[60%] -translate-x-1/2 w-60 md:w-72 drop-shadow-2xl">
                <Image
                  src="/truck.png"
                  alt="BoxBhai Truck"
                  width={320}
                  height={200}
                  className="object-contain"
                  priority
                />
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
