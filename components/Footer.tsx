export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                </svg>
              </div>
              <span className="font-bold text-lg">BoxBhai-Movers</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              ঢাকার সবচেয়ে নির্ভরযোগ্য মুভিং সার্ভিস। আপনার প্রতিটি মুভ আমাদের দায়িত্ব।
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-100">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {["বাড়ি", "আমাদের সার্ভিস", "পার্টনার হন", "যোগাযোগ করুন"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-blue-100">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>📍 ঢাকা, বাংলাদেশ</li>
              <li>📞 +880 1700-000000</li>
              <li>✉️ info@boxbhai.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} BoxBhai-Movers. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
