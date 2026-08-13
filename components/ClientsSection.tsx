const clients = [
  { name: "Haier", src: "/clients/haier.png" },
  { name: "Nagara Textiles Ltd", src: "/clients/nagara.png" },
  { name: "Anzara", src: "/clients/anzara.jpeg" },
];

export default function ClientsSection() {
  return (
    <section className="bg-[#eaedf9] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-10 underline decoration-2 underline-offset-4">
          আমাদের <span className="text-blue-600">গ্রাহক</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-2xl shadow-md h-32 flex items-center justify-center p-6"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
