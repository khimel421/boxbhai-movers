import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: graphic panel */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/cta-banner.png"
              alt="বাসা পাল্টানোর জন্য নিন - এক্সপার্ট শিফটিং সল্যুশন"
              width={700}
              height={394}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right: content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
              আপনার কমপ্লিট <span className="text-blue-600">মুভিং সল্যুশন</span> এর
              জন্য যোগাযোগ করুন আজই
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              কোটেশনের জন্য সরাসরি আমাদের হটলাইনে কল করুন অথবা সার্ভিস বুক করুন
              বাটনে ক্লিক করে ফর্মটি পূরণ করুন আমাদের প্রতিনিধি খুব শীঘ্রই আপনার
              সাথে যোগাযোগ করবেন
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+8801631496748"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <PhoneIcon />
                +8801631496748
              </a>
              <Link
                href="/booking"
                className="flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                সার্ভিস বুক করুন
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}
