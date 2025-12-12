import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw, Check, Star, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SlideType, SlideData } from './types';
import { Sticks } from './components/Sticks';
import { Abacus } from './components/Abacus';

// Slide Configurations
const SLIDES: SlideData[] = [
  {
    id: SlideType.INTRO,
    title: "11-20各数的认识",
    description: "欢迎来到数学乐园！今天我们来认识新朋友：计数器。",
    voiceOverText: "你好呀！今天我们要学习11到20这些数字，还要认识一位新朋友——计数器。"
  },
  {
    id: SlideType.WARMUP,
    title: "热身运动：数一数",
    description: "让我们一起大声从1数到20吧！",
    voiceOverText: "准备好了吗？预备，开始！我们一根一根地数小棒。"
  },
  {
    id: SlideType.CONCEPT_ABACUS,
    title: "认识数位",
    description: "这是计数器。右边第一位是“个位”，第二位是“十位”。",
    voiceOverText: "看，这个好玩的东西叫计数器。记住口诀：从右边起，第一位是个位，第二位是十位。"
  },
  {
    id: SlideType.LEARN_11,
    title: "认识 11",
    description: "1捆小棒和1根小棒组成了11。在计数器上怎么表示呢？",
    voiceOverText: "这里有11根小棒。左边的1在十位，表示1个十；右边的1在个位，表示1个一。"
  },
  {
    id: SlideType.LEARN_15,
    title: "认识 15",
    description: "1捆小棒和5根小棒。试着写出这个数！",
    voiceOverText: "十位有一颗珠子，个位有五颗珠子，这个数读作十五，写作15。"
  },
  {
    id: SlideType.LEARN_20,
    title: "认识 20",
    description: "2捆小棒是2个十。个位没有小棒怎么办？用0占位！",
    voiceOverText: "现在有两捆小棒，就是2个十。个位没有珠子，一定要写0占位哦，不然就变成2啦！"
  },
  {
    id: SlideType.SUMMARY,
    title: "小小总结",
    description: "让我们复习一下今天的口诀。",
    voiceOverText: "从右边起，第一位是个位，第二位是十位。有几个十就在十位写几，有几个一就在个位写几。"
  },
  {
    id: SlideType.PRACTICE,
    title: "大闯关",
    description: "我说你做：请根据提示写出正确的数字。",
    voiceOverText: "现在是游戏时间！听清楚题目，写出正确的数字。"
  }
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [practiceQuestion, setPracticeQuestion] = useState({ tens: 1, ones: 7 }); // Default 17
  
  // State for Warmup Slide
  const [warmupCount, setWarmupCount] = useState(0);

  const slide = SLIDES[currentSlideIndex];

  // Reset warmup count when entering the slide
  useEffect(() => {
    if (slide.id === SlideType.WARMUP) {
      setWarmupCount(0);
    }
  }, [currentSlideIndex, slide.id]);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setUserInput('');
      setFeedback('idle');
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setUserInput('');
      setFeedback('idle');
    }
  };

  const checkAnswer = (target: string) => {
    if (userInput.trim() === target) {
      setFeedback('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setFeedback('wrong');
    }
  };

  const generatePractice = () => {
    const t = Math.floor(Math.random() * 2) + 1; // 1 or 2
    const o = t === 2 ? 0 : Math.floor(Math.random() * 10); // if 20, ones 0. else 0-9
    setPracticeQuestion({ tens: t, ones: o });
    setUserInput('');
    setFeedback('idle');
  };

  // Render content based on slide type
  const renderSlideContent = () => {
    switch (slide.id) {
      case SlideType.INTRO:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4 md:mb-8 animate-bounce">11 - 20</h1>
            <div className="text-lg md:text-2xl text-gray-600 max-w-lg bg-white p-4 md:p-6 rounded-xl shadow-md">
              {slide.description}
            </div>
          </div>
        );

      case SlideType.WARMUP:
        return (
          <div className="flex flex-col items-center w-full max-w-3xl px-2">
             <div className="mb-4 md:mb-6 flex flex-col items-center">
                <span className="text-6xl md:text-8xl font-bold text-blue-600 font-mono mb-2 h-20 md:h-24 flex items-center">
                  {warmupCount > 0 ? warmupCount : "?"}
                </span>
                <div className="text-gray-500 text-base md:text-lg">
                  {warmupCount === 20 ? "数完了！太棒了！" : "请点击按钮，我们一起数小棒"}
                </div>
             </div>

             <div className="mb-6 md:mb-8 w-full flex justify-center">
                <Sticks count={warmupCount} />
             </div>

             <div className="flex gap-4">
                <button
                  onClick={() => setWarmupCount(0)}
                  className="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-100 font-bold flex items-center gap-2 text-sm md:text-base"
                >
                  <RefreshCw size={18} className="md:w-5 md:h-5" /> 重来
                </button>
                <button
                  onClick={() => setWarmupCount(prev => Math.min(prev + 1, 20))}
                  disabled={warmupCount >= 20}
                  className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-blue-500 text-white font-bold text-lg md:text-xl hover:bg-blue-600 shadow-lg transform active:scale-95 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <Plus size={20} className="md:w-6 md:h-6" /> {warmupCount === 0 ? "开始" : "数一根"}
                </button>
             </div>
          </div>
        );

      case SlideType.CONCEPT_ABACUS:
        return (
          <div className="flex flex-col items-center px-4 w-full">
            <Abacus tens={0} ones={0} />
            <div className="mt-6 md:mt-8 bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500 text-center w-full max-w-sm">
              <p className="text-lg md:text-xl text-blue-800 font-bold">👉 从右边起，第一位是 <span className="text-red-500 block md:inline">个位</span></p>
              <p className="text-lg md:text-xl text-blue-800 font-bold mt-2">👉 第二位是 <span className="text-red-500 block md:inline">十位</span></p>
            </div>
          </div>
        );

      case SlideType.LEARN_11:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full max-w-4xl px-2">
            <div className="flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-4">摆小棒</h3>
              <Sticks count={11} />
              <p className="mt-2 md:mt-4 text-gray-600 text-center text-sm md:text-base">1捆（1个十）和 1根（1个一）</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-4">拨珠子</h3>
              <Abacus tens={1} ones={1} />
              <div className="mt-4 md:mt-6 flex gap-3 md:gap-4 items-center">
                <span className="text-xl md:text-2xl font-bold">写作：</span>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  maxLength={2}
                  className={`w-20 h-14 md:w-24 md:h-16 text-center text-3xl md:text-4xl font-bold border-4 rounded-lg outline-none ${feedback === 'correct' ? 'border-green-500 bg-green-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                <button onClick={() => checkAnswer('11')} className="bg-blue-500 text-white p-2 md:p-3 rounded-full hover:bg-blue-600">
                  <Check size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-2">试试在方框里写出 11</p>
            </div>
            <div className="col-span-1 md:col-span-2 bg-yellow-100 p-3 md:p-4 rounded-lg text-center mt-2">
              <p className="font-bold text-base md:text-lg text-yellow-800">🤔 思考：这两个“1”意思一样吗？</p>
              <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-8 mt-2 text-sm text-yellow-900">
                <span>左边的 1：表示 1个十</span>
                <span>右边的 1：表示 1个一</span>
              </div>
            </div>
          </div>
        );

      case SlideType.LEARN_15:
        return (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full max-w-4xl px-2">
            <div className="flex flex-col items-center order-2 md:order-1">
              <Sticks count={15} />
            </div>
            <div className="flex flex-col items-center order-1 md:order-2">
              <Abacus tens={1} ones={5} />
              <div className="mt-4 md:mt-6 flex gap-3 md:gap-4 items-center">
                <span className="text-xl md:text-2xl font-bold">写作：</span>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  maxLength={2}
                  className={`w-20 h-14 md:w-24 md:h-16 text-center text-3xl md:text-4xl font-bold border-4 rounded-lg outline-none ${feedback === 'correct' ? 'border-green-500 bg-green-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                <button onClick={() => checkAnswer('15')} className="bg-blue-500 text-white p-2 md:p-3 rounded-full hover:bg-blue-600">
                  <Check size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        );

      case SlideType.LEARN_20:
        return (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full max-w-4xl px-2">
            <div className="flex flex-col items-center order-2 md:order-1">
              <Sticks count={20} />
              <p className="mt-2 font-bold text-gray-600">2个十</p>
            </div>
            <div className="flex flex-col items-center order-1 md:order-2">
              <Abacus tens={2} ones={0} highlight="ones" />
              <div className="mt-4 md:mt-6 flex gap-3 md:gap-4 items-center">
                <span className="text-xl md:text-2xl font-bold">写作：</span>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  maxLength={2}
                  className={`w-20 h-14 md:w-24 md:h-16 text-center text-3xl md:text-4xl font-bold border-4 rounded-lg outline-none ${feedback === 'correct' ? 'border-green-500 bg-green-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                <button onClick={() => checkAnswer('20')} className="bg-blue-500 text-white p-2 md:p-3 rounded-full hover:bg-blue-600">
                  <Check size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
               <div className="mt-4 bg-red-100 p-2 md:p-3 rounded text-red-800 text-xs md:text-sm font-bold text-center">
                 注意：个位上一个也没有，要写0占位！
               </div>
            </div>
          </div>
        );

      case SlideType.SUMMARY:
        return (
          <div className="flex flex-col items-start gap-4 bg-white p-4 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-2">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2 md:mb-4 self-center">记一记</h2>
            <div className="space-y-4 text-base md:text-xl text-gray-800 w-full">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 min-w-[2rem] bg-blue-500 rounded-full text-white flex items-center justify-center font-bold">1</div>
                <p>从右边起，第一位是<span className="font-bold text-blue-600">个位</span>，第二位是<span className="font-bold text-blue-600">十位</span>。</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 min-w-[2rem] bg-blue-500 rounded-full text-white flex items-center justify-center font-bold">2</div>
                <p>有几个十在十位写几，有几个一在个位写几。</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 min-w-[2rem] bg-blue-500 rounded-full text-white flex items-center justify-center font-bold">3</div>
                <p>个位一个也没有，写 <span className="font-bold text-red-500 text-xl md:text-2xl">0</span> 占位。</p>
              </div>
            </div>
          </div>
        );

      case SlideType.PRACTICE:
        const targetNum = practiceQuestion.tens * 10 + practiceQuestion.ones;
        return (
          <div className="flex flex-col items-center w-full max-w-2xl px-2">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full flex flex-col items-center relative">
               <button onClick={generatePractice} className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-blue-500 p-2">
                  <RefreshCw size={20} className="md:w-6 md:h-6" />
               </button>
               
               <h3 className="text-lg md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 text-center mt-2">
                 请写出：<span className="text-blue-600">{practiceQuestion.tens}</span> 个十和 <span className="text-blue-600">{practiceQuestion.ones}</span> 个一
               </h3>

               <div className="flex justify-center gap-12 w-full mb-6 md:mb-8">
                  {/* Visual Hint */}
                  <div className="scale-75 origin-top md:scale-100">
                    <Abacus tens={practiceQuestion.tens} ones={practiceQuestion.ones} />
                  </div>
               </div>

               <div className="flex gap-3 md:gap-4 items-center">
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer(targetNum.toString())}
                    className={`w-24 h-16 md:w-32 md:h-20 text-center text-3xl md:text-5xl font-bold border-4 rounded-xl outline-none transition-colors ${feedback === 'correct' ? 'border-green-500 bg-green-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="?"
                    autoFocus
                  />
                  <button onClick={() => checkAnswer(targetNum.toString())} className="bg-green-500 text-white p-3 md:p-4 rounded-xl hover:bg-green-600 shadow-lg transform active:scale-95 transition">
                    <Check size={24} className="md:w-8 md:h-8" />
                  </button>
               </div>
               
               {feedback === 'correct' && (
                 <div className="mt-4 text-xl md:text-2xl font-bold text-green-600 animate-bounce">
                   太棒了！答对了！🎉
                 </div>
               )}
               {feedback === 'wrong' && (
                 <div className="mt-4 text-lg md:text-xl font-bold text-red-500">
                   不对哦，再试一次吧！
                 </div>
               )}
               
               {feedback === 'correct' && (
                  <button onClick={generatePractice} className="mt-4 md:mt-6 text-blue-500 underline hover:text-blue-700 text-sm md:text-base">
                    下一题
                  </button>
               )}
            </div>
          </div>
        );

      default:
        return <div>Slide content missing</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 font-sans text-gray-800">
      {/* Header / Progress */}
      <header className="bg-white shadow-sm p-3 md:p-4 flex justify-between items-center z-10 sticky top-0">
        <div className="text-lg md:text-xl font-bold text-blue-600 flex items-center gap-2">
           🧮 数学乐园
        </div>
        <div className="flex gap-1">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 w-4 md:h-2 md:w-8 rounded-full transition-colors ${idx === currentSlideIndex ? 'bg-blue-500' : idx < currentSlideIndex ? 'bg-green-400' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
        <div className="text-xs md:text-sm text-gray-500">
          {currentSlideIndex + 1} / {SLIDES.length}
        </div>
      </header>

      {/* Main Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 relative overflow-y-auto overflow-x-hidden w-full">
        {renderSlideContent()}
        
      </main>

      {/* Navigation Footer */}
      <footer className="bg-white p-3 md:p-4 flex justify-between items-center shadow-inner z-10 sticky bottom-0">
        <button 
          onClick={handlePrev} 
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition text-sm md:text-base"
        >
          <ArrowLeft size={18} className="md:w-6 md:h-6" /> <span className="hidden md:inline">上一步</span><span className="md:hidden">Back</span>
        </button>

        <div className="text-center mx-2">
            <h2 className="text-sm md:text-lg font-bold text-gray-800 line-clamp-1">{slide.title}</h2>
        </div>

        <button 
          onClick={handleNext} 
          disabled={currentSlideIndex === SLIDES.length - 1}
          className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-30 shadow-md transition transform hover:scale-105 text-sm md:text-base"
        >
          <span className="hidden md:inline">下一步</span><span className="md:hidden">Next</span> <ArrowRight size={18} className="md:w-6 md:h-6" />
        </button>
      </footer>
    </div>
  );
};

export default App;