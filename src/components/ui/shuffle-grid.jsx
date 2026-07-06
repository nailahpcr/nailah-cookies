import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">
      <div className="space-y-6">
        <span className="block text-xs md:text-sm text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider w-fit">
          Sistem Inventoris & CRM Cerdas
        </span>
        <h3 className="text-4xl md:text-6xl font-heading font-bold text-[#1E2A44] leading-tight">
          Buku & Alat Tulis Terkelola Sempurna
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Kelola inventarisasi buku paket sekolah, kitab Islam, novel, alat tulis, hingga pre-order pelanggan dalam satu sistem cerdas. Optimalkan sirkulasi stok toko Anda sekarang.
        </p>
        <div className="pt-4">
          <a href="#fitur" className={cn(
            "inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg",
            "transition-all hover:bg-blue-700 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md"
          )}>
            Pelajari Fitur Kami
          </a>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&q=80",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1568283096533-0d5a41589149?w=400&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&q=80",
  },
];

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/50 shadow-sm"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-2">
      {squares.map((sq) => sq)}
    </div>
  );
};
