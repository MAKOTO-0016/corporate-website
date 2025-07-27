import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-black text-gold-400 overflow-hidden">
      {/* 上部固定CTAボタン */}
      <div className="fixed top-0 left-0 w-full flex justify-end p-6 z-20">
        <button className="bg-[#D4AF37] text-white font-bold py-3 px-8 rounded-full shadow-lg animate-pulse hover:brightness-125 transition-all duration-300">
          今すぐ始める
        </button>
      </div>
      {/* メインコピー */}
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-center mb-6 drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
        “あなたの眠る資産が、毎月20%の不労所得に変わる。”
      </h1>
      {/* サブコピー */}
      <p className="text-lg md:text-2xl text-center mb-12 font-sans" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
        カワウソと癒しの空間で、あなたの人生が変わる瞬間へ。
      </p>
      {/* 背景装飾（後で動画やパララックスに拡張可） */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#D4AF37]/30 pointer-events-none -z-10" />
      {/* カワウソ画像（中央下・左右） */}
      <img
        src="https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&w=800"
        alt="カワウソ中央"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 md:w-96 opacity-70 pointer-events-none select-none -z-0"
        style={{ filter: 'blur(0.5px)' }}
      />
      <img
        src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&w=800"
        alt="カワウソ左"
        className="absolute bottom-10 left-10 w-40 md:w-56 opacity-50 pointer-events-none select-none -z-0"
        style={{ filter: 'blur(1px)' }}
      />
      <img
        src="https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&w=800"
        alt="カワウソ右"
        className="absolute bottom-10 right-10 w-32 md:w-48 opacity-40 pointer-events-none select-none -z-0"
        style={{ filter: 'blur(1px)' }}
      />
    </section>
  );
};

export default HeroSection; 