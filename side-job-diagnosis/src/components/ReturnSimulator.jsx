import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountUp from "react-countup";

const calcReturn = (amount, months) => {
  let result = amount;
  for (let i = 0; i < months; i++) {
    result *= 1.2;
  }
  return Math.floor(result);
};

const ReturnSimulator = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: { amount: 100000, months: 6 },
  });
  const [result, setResult] = useState(null);
  const [input, setInput] = useState({ amount: 100000, months: 6 });

  const onSubmit = (data) => {
    setInput(data);
    setResult(calcReturn(Number(data.amount), Number(data.months)));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black via-black/90 to-[#D4AF37]/10 relative overflow-hidden">
      {/* カワウソ画像（右下・左上） */}
      <img src="https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&w=400" alt="カワウソ右下" className="absolute bottom-0 right-0 w-40 md:w-56 opacity-30 pointer-events-none select-none -z-10" />
      <img src="https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&w=400" alt="カワウソ左上" className="absolute top-0 left-0 w-28 md:w-40 opacity-20 pointer-events-none select-none -z-10" />
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-[#D4AF37] font-bold mb-8">リターンシミュレーター</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <input
            type="number"
            {...register("amount", { min: 10000, max: 1000000 })}
            className="rounded-lg px-4 py-2 w-40 text-lg text-black"
            placeholder="入金金額(円)"
            min={10000}
            max={1000000}
            required
          />
          <span className="text-white">×</span>
          <input
            type="number"
            {...register("months", { min: 1, max: 24 })}
            className="rounded-lg px-4 py-2 w-24 text-lg text-black"
            placeholder="期間(月)"
            min={1}
            max={24}
            required
          />
          <button type="submit" className="bg-[#D4AF37] text-white font-bold py-2 px-6 rounded-full shadow hover:brightness-125 transition-all">シミュレーション</button>
        </form>
        {result !== null && (
          <div className="text-2xl md:text-3xl font-bold text-white bg-black/60 rounded-xl py-6 px-4 shadow-lg">
            <span className="text-[#D4AF37]">{input.months}ヶ月後：</span>
            <CountUp
              start={0}
              end={result}
              duration={2}
              separator="," 
              prefix="¥"
            />
            <span className="ml-2 text-lg text-white/70">円に</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReturnSimulator; 