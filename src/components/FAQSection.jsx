import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "Apakah CendekiaBook bisa diakses gratis?",
      answer: "Ya! Kami menyediakan paket dasar gratis selamanya untuk UMKM, serta paket premium untuk fitur analitik yang lebih mendalam."
    },
    {
      id: 2,
      question: "Apakah data pelanggan saya aman di sini?",
      answer: "Sangat aman. Seluruh data transaksi dan informasi pelanggan Anda dienkripsi secara ketat di server cloud kami."
    },
    {
      id: 3,
      question: "Bagaimana cara menghubungkan CRM ini dengan WhatsApp?",
      answer: "Anda dapat mengintegrasikannya dengan mudah melalui pengaturan integrasi API yang sudah disediakan di dalam dasbor."
    }
  ];

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-gray-600">
            Temukan jawaban cepat untuk pertanyaan umum tentang CendekiaBook
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Masih ada pertanyaan? Hubungi tim support kami.
          </p>
          <a
            href="mailto:support@cendekiabook.com"
            className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            support@cendekiabook.com
          </a>
        </div>
      </div>
    </section>
  );
}
