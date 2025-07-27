import React from "react";
import CTAButton from "./CTAButton";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-16 pb-32 mt-20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="mb-4 md:mb-0">
          <div className="text-lg font-bold mb-2">決済（Stripe仮）</div>
          <button className="bg-[#D4AF37] text-white font-bold py-2 px-6 rounded-full shadow hover:brightness-125 transition-all">Stripeで支払う</button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="text-[#D4AF37] underline">特定商取引法に基づく表記</a>
          <a href="#" className="text-[#D4AF37] underline">プライバシーポリシー</a>
        </div>
      </div>
      {/* 画面下固定CTA */}
      <div className="fixed bottom-0 left-0 w-full z-30 flex justify-center bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
        <CTAButton className="w-full max-w-md text-lg">今すぐ不労所得ライフを始める</CTAButton>
      </div>
    </footer>
  );
};

export default Footer; 