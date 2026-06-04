"use client";

import { useState } from "react";

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <span className="text-blue-700 font-bold text-lg tracking-tight">
              BoxBhai-Movers
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["বাড়ি", "সার্ভিস", "পার্টনার", "যোগাযোগ"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-gray-700 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                English
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                  {["English", "বাংলা"].map((lang) => (
                    <button
                      key={lang}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setLangOpen(false)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
              লগইন
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
