import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoxBhai Movers - ঢাকায় বাসা অথবা অফিস মুভিং",
  description:
    "ঢাকার সবচেয়ে নির্ভরযোগ্য মুভিং সার্ভিস। বাসা বদল থেকে ট্রাক ভাড়া প্রতিটি মুভে সহজ, দ্রুত ও ঝামেলামুক্ত অভিজ্ঞতা।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
