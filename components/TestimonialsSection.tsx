const testimonials = [
  {
    id: 1,
    quote:
      "Had a great experience with BoxBhai. The team were professional and courteous, and took great care of our furniture. Would recommend.",
    name: "Tanvir Islam",
    role: "Manager, Business Finance",
    company: "PepsiCo",
  },
  {
    id: 2,
    quote: "Their service and the time management was good, hope they grow more..",
    name: "MD Mehedi Hasan",
    role: "-",
    company: "-",
  },
  {
    id: 3,
    quote:
      "They are just awesome, maintain the proper timing. skilled resources, very caring about clients. In a word you can trust them as home shifting partner.",
    name: "Utsho Biswas",
    role: "Brain Station 23",
    company: "Software Engineer",
  },
  {
    id: 4,
    quote: "Very good service and behavior. Thanks to All support to move my House.",
    name: "Tania Afroj",
    role: "Silver Line Group",
    company: "Assistant Manager Commercial",
  },
  {
    id: 5,
    quote:
      "Their service was excellent. I am simply very happy. I didn't have to touch a single item.",
    name: "Jubayer Joy",
    role: "Gold Sands Hotel & Resorts Ltd",
    company: "Sr. Deputy Manager",
  },
  {
    id: 6,
    quote:
      "Took their service. The delivery guys were very friendly, coordinated well and patient. Affordable service as well!",
    name: "Dihan Mustakeem",
    role: "Dirt2Dollars",
    company: "Media Buyer",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 mb-12 leading-snug">
          আমাদের সম্পর্কে
          <br />
          কী বলছেন আমাদের <span className="text-blue-600">গ্রাহকেরা</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.quote}</p>
              <div className="border-t border-gray-100 pt-3">
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-blue-600 text-sm font-medium">{t.role}</p>
                <p className="text-gray-500 text-sm">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#facc15" className="w-4 h-4">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}
