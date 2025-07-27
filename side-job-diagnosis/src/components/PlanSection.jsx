import React from "react";
import CTAButton from "./CTAButton";

const plans = [
  {
    name: "スターター",
    price: "¥29,800",
    features: [
      "インテリアキットS",
      "月利20%：¥50,000枠",
    ],
    tag: "お試し",
  },
  {
    name: "アドバンス",
    price: "¥98,000",
    features: [
      "キットM＋セミナー",
      "月利20%：¥200,000枠",
      "紹介報酬2段階",
    ],
    tag: "人気",
    highlight: true,
  },
  {
    name: "エリート",
    price: "¥298,000",
    features: [
      "キットL＋動画素材＋専属サポート",
      "月利20%：¥1,000,000枠",
    ],
    tag: "本気",
  },
];

const PlanSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* カワウソ画像を複数ランダム配置 */}
      <img src="https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&w=400" alt="カワウソ1" className="absolute top-10 left-10 w-24 h-24 object-cover rounded-full opacity-40 rotate-12 pointer-events-none select-none -z-10" />
      <img src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&w=400" alt="カワウソ2" className="absolute bottom-10 right-10 w-28 h-28 object-cover rounded-full opacity-40 -rotate-6 pointer-events-none select-none -z-10" />
      <img src="https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&w=400" alt="カワウソ3" className="absolute top-1/2 left-0 -translate-y-1/2 w-20 h-20 object-cover rounded-full opacity-30 pointer-events-none select-none -z-10" />
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-serif text-center text-[#D4AF37] font-bold mb-12">加入プラン比較</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative bg-white/10 border-2 ${plan.highlight ? 'border-[#D4AF37] scale-105 shadow-2xl' : 'border-white/20'} rounded-3xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl group`}
            >
              {/* 推奨タグ */}
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.highlight ? 'bg-[#D4AF37] text-black' : 'bg-black text-[#D4AF37] border border-[#D4AF37]'}`}>{plan.tag}</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-2 font-serif">{plan.name}</h3>
              <div className="text-2xl md:text-3xl font-bold mb-4 text-white">{plan.price}</div>
              <ul className="mb-6 text-white/90 text-sm md:text-base space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: f }} />
                ))}
              </ul>
              <CTAButton className="w-full">今すぐ参加</CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSection; 