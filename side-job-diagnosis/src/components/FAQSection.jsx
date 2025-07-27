import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "本当に月利20%のリターンが得られるのですか？", a: "運用状況により変動しますが、過去の実績では月利20%を達成しています。" },
  { q: "元本保証はありますか？", a: "元本保証はありませんが、リスク管理を徹底しています。" },
  { q: "紹介しないと報酬は得られませんか？", a: "紹介がなくてもリターンは得られます。紹介で追加報酬も可能です。" },
  { q: "どんな商品を扱っていますか？", a: "インテリアグッズや癒しグッズなど、カワウソをテーマにした商品です。" },
  { q: "怪しくないですか？", a: "特商法表記や運営実績を公開し、信頼性を重視しています。" },
  { q: "途中で退会できますか？", a: "所定の手続きでいつでも退会可能です。" },
  { q: "再加入は可能ですか？", a: "再加入も可能です。お気軽にご相談ください。" },
  { q: "スマホだけで始められますか？", a: "スマホだけで簡単に始められます。" },
  { q: "顔出ししないとダメですか？", a: "顔出しは必須ではありません。ご安心ください。" },
  { q: "どれくらいの時間が必要ですか？", a: "1日10分程度から始められます。" },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* カワウソ画像（左上・右下） */}
      <img src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&w=400" alt="カワウソ左上" className="absolute top-0 left-0 w-32 md:w-44 opacity-25 pointer-events-none select-none -z-10" />
      <img src="https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&w=400" alt="カワウソ右下" className="absolute bottom-0 right-0 w-24 md:w-36 opacity-20 pointer-events-none select-none -z-10" />
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-serif text-[#D4AF37] font-bold mb-8 text-center">よくある質問</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full flex justify-between items-center bg-white/10 text-white px-6 py-4 rounded-xl font-bold text-left focus:outline-none hover:bg-[#D4AF37]/20 transition-all"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-[#D4AF37]">{openIdx === idx ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white/5 text-white px-6 py-4 rounded-b-xl"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 