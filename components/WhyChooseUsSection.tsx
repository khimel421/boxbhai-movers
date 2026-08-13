const reasons = [
  {
    id: 1,
    title: "কমপ্লিট মুভিং সল্যুশন",
    description:
      "প্যাকিং, লোডিং, পরিবহন এবং আনপ্যাকিং সবকিছুই আমরা দক্ষতার সাথে সামলাই এছাড়াও, আপনার প্রয়োজন অনুযায়ী আমরা প্রদান করি ইলেকট্রিসিয়ান সাপোর্ট এবং কার্পেন্টার সাপোর্ট",
    icon: <BoxIcon />,
  },
  {
    id: 2,
    title: "ফ্রি এবং দ্রুত কোটেশন",
    description:
      "BoxBhai-Movers-এ আমরা প্রথমে আপনার বাসায় ফ্রি-এসেসমেন্ট (House Visit) করি এরপর আপনার প্রয়োজন অনুযায়ী সঠিক ও যথার্থ কোটেশন প্রদান করি",
    icon: <QuoteIcon />,
  },
  {
    id: 3,
    title: "ভেরিফাইড ট্রান্সপোর্ট",
    description:
      "আমাদের রয়েছে ভেরিফাইড ট্রাক ট্রান্সপোর্টেশন, যা ট্রাক ভাড়া সেবাকে করে আরও নিরাপদ ও নির্ভরযোগ্য অভিজ্ঞ ড্রাইভার এবং নির্ভরযোগ্য যানবাহনের মাধ্যমে আমরা নিশ্চিত করি আপনার মালামাল সঠিক সময়ে এবং নিরাপদে গন্তব্যে পৌঁছাবে",
    icon: <TruckVerifiedIcon />,
  },
  {
    id: 4,
    title: "১০০% নিরাপদ",
    description:
      "১০০% নিরাপদ ও ঝামেলামুক্ত মুভিং সার্ভিস—BoxBhai আপনার প্রতিটি মুভকে করে তোলে সহজ, দ্রুত এবং সম্পূর্ণ নির্ভরযোগ্য আমাদের অভিজ্ঞ টিম প্রতিটি ধাপে পেশাদারিভাবে কাজ করে, যাতে আপনার মূল্যবান জিনিসপত্র সর্বোচ্চ নিরাপত্তায় থাকে",
    icon: <ShieldCheckIcon />,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-[#eaedf9] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 mb-12">
          কেন <span className="text-blue-600">BoxBhai</span> এর সাথে মুভ করবেন?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shrink-0">
                {reason.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function TruckVerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="1" y="6" width="14" height="10" rx="1" />
      <path d="M15 9h4l3 3v4h-7z" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="17.5" cy="18.5" r="1.8" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
