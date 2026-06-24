"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/box-bhai logo.png"
                alt="BoxBhai Movers Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span className="text-blue-700 font-bold text-lg tracking-tight">
              Box-Bhai Movers
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
