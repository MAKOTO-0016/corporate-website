import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "スティーブ",
    comment: "毎月のリターンが想像以上！カワウソと癒しの空間で人生が変わりました。",
    img: "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&w=400",
  },
  {
    name: "佐藤 花子",
    comment: "最初は不安でしたが、サポートも手厚く安心して始められました。",
    img: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&w=400",
  },
  {
    name: "鈴木 一郎",
    comment: "紹介制度も魅力的で、友人にも勧めています！",
    img: "https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&w=400",
  },
];

const bgOtter = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 relative bg-black">
      <div className="absolute inset-0 opacity-20 bg-center bg-cover -z-10" style={{ backgroundImage: `url(${bgOtter})` }} />
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-[#D4AF37] font-bold mb-8">成功者の声</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center"
            >
              <img src={testimonials[idx].img} alt={testimonials[idx].name} className="w-20 h-20 rounded-full mb-4 border-4 border-[#D4AF37] object-cover" />
              <p className="text-lg text-black mb-4">{testimonials[idx].comment}</p>
              <div className="text-[#D4AF37] font-bold">{testimonials[idx].name}</div>
            </motion.div>
          </AnimatePresence>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-[#D4AF37] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-[#D4AF37] hover:text-black transition-all">‹</button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-[#D4AF37] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-[#D4AF37] hover:text-black transition-all">›</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 