import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const questions = [
  "好きな作業スタイルは？",
  "人と話すのは好き？",
  "パソコン操作は得意？",
  "スキマ時間は1日どれくらい？",
  "文章を書くのは得意？",
  "デザインには興味ある？",
  "リスクを取ることに抵抗はない？",
  "体を動かす仕事は苦ではない？",
  "副業でどんな結果を重視？",
  "どれくらいの収入を目指す？",
];

const options = [
  ["一人で黙々と", "チームでワイワイ", "柔軟に選びたい"],
  ["とても好き", "まあまあ", "苦手"],
  ["得意", "普通", "苦手"],
  ["3時間以上", "1〜2時間", "30分以下"],
  ["好き", "どちらでも", "苦手"],
  ["大好き", "興味あり", "全くなし"],
  ["抵抗ない", "場合による", "かなり慎重"],
  ["好き", "どちらでも", "苦手"],
  ["収入", "やりがい", "両方"],
  ["月10万円以上", "月3〜5万円", "少しでもOK"],
];

const results = {
  typeA: {
    title: "Webライター",
    desc: "文章力が高く、コツコツ作業が得意なあなたにおすすめ！",
  },
  typeB: {
    title: "せどり・物販",
    desc: "行動力とリサーチ力があるあなたにぴったりの副業！",
  },
  typeC: {
    title: "動画編集",
    desc: "クリエイティブで集中力のあるあなたに最適な選択！",
  },
  typeD: {
    title: "オンライン秘書",
    desc: "サポート業務が得意で、信頼感あるあなたに！",
  },
  typeE: {
    title: "アフィリエイト",
    desc: "文章・分析・継続力が揃ったあなたに！",
  },
};

export default function SideJobDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (index) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (step + 1 >= questions.length) {
      const sum = newAnswers.reduce((a, b) => a + b, 0);
      if (sum <= 10) setResult("typeA");
      else if (sum <= 15) setResult("typeB");
      else if (sum <= 20) setResult("typeC");
      else if (sum <= 25) setResult("typeD");
      else setResult("typeE");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {!result ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Q{step + 1}. {questions[step]}</h2>
            <div className="grid gap-3">
              {options[step].map((opt, idx) => (
                <Button key={idx} className="w-full" onClick={() => handleAnswer(idx)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">あなたにぴったりの副業は…</h2>
            <Card className="bg-gradient-to-br from-pink-100 to-yellow-100">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{results[result].title}</h3>
                <p>{results[result].desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 