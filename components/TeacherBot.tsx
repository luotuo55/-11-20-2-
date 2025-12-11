import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { askTeacher } from '../services/geminiService';

interface TeacherBotProps {
  context: string;
}

export const TeacherBot: React.FC<TeacherBotProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    
    // Provide a default question if user just clicks help without typing?
    // For now, require typing or click preset buttons.
    const response = await askTeacher(context, question);
    
    setAnswer(response);
    setLoading(false);
  };

  const presetQuestions = [
    "为什么要分十位和个位？",
    "11的两个1意思一样吗？",
    "20的0可以不写吗？"
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden">
          <div className="bg-blue-500 p-3 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span className="font-bold">智能小老师</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 rounded p-1">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 max-h-96 overflow-y-auto">
             {!answer && !loading && (
                 <div className="text-sm text-gray-600 mb-4">
                     小朋友，哪里不懂可以问我哦！你可以打字，或者点击下面的常见问题：
                 </div>
             )}

             {!answer && !loading && (
                 <div className="flex flex-col gap-2 mb-4">
                     {presetQuestions.map((q, i) => (
                         <button 
                            key={i} 
                            onClick={() => { setQuestion(q); setTimeout(() => handleAsk(), 100); }} // Quick hack to trigger
                            className="text-left text-xs bg-white border border-blue-200 hover:bg-blue-50 p-2 rounded-lg text-blue-600 transition-colors"
                         >
                             {q}
                         </button>
                     ))}
                 </div>
             )}

             {loading && (
                 <div className="flex justify-center p-4">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                 </div>
             )}

             {answer && (
                 <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-gray-800 text-sm leading-relaxed">
                     <span className="font-bold text-blue-500 block mb-1">老师说：</span>
                     {answer}
                 </div>
             )}
          </div>

          <div className="p-2 border-t border-gray-100 bg-white flex gap-2">
            <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="我有一个问题..."
                className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:border-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
                onClick={handleAsk}
                disabled={loading}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50"
            >
                <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
      >
        <MessageCircle size={24} />
        {!isOpen && <span className="font-bold">提问</span>}
      </button>
    </div>
  );
};