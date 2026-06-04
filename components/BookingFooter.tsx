export default function BookingFooter() {
  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand + address */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                </svg>
              </div>
              <span className="font-bold text-lg">BoxBhai-Movers</span>
            </div>
            <p className="text-blue-300 text-sm font-semibold mb-1">অফিস এড্রেস</p>
            <p className="text-blue-200 text-sm leading-relaxed">
              রোড: ১, হাউস: ১১, বিপণটান হারিসা, কাটাসুর, মোহাম্মদপুর,
              <br />
              ঢাকা-১২০৭
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-4">সার্ভিস</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {["মুভিং সার্ভিস", "ট্রাক বুকিং", "কর্পোরেট"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base mb-4">লিগ্যাল</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {["নর্তাবলী - কাস্টমার", "নর্তাবলী - পার্টনার", "প্রাইভেসি পলিসি"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-4">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <a href="mailto:boxbhai.official@gmail.com" className="hover:text-white transition-colors">
                  boxbhai.official@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801631496748" className="hover:text-white transition-colors">
                  +8801631496748 | +8801631642246
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11a4.5 4.5 0 0 1-4.5 4.5h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-blue-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4 h-4">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 pt-5 text-center text-xs text-blue-400">
          © {new Date().getFullYear()} BoxBhai-Movers. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
