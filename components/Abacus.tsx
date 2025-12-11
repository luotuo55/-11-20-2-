import React from 'react';
import { motion } from 'framer-motion';

interface AbacusProps {
  tens: number;
  ones: number;
  highlight?: 'tens' | 'ones' | 'none';
}

export const Abacus: React.FC<AbacusProps> = ({ tens, ones, highlight = 'none' }) => {
  return (
    <div className="flex flex-col items-center bg-orange-100 p-6 rounded-2xl border-4 border-orange-300 shadow-lg relative max-w-[300px] mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-lg font-bold shadow-md">
        计数器
      </div>
      
      {/* Rods Container */}
      <div className="flex justify-center gap-12 mt-4 relative">
        {/* Horizontal Beam */}
        <div className="absolute bottom-8 w-full h-4 bg-orange-700 rounded z-0"></div>

        {/* Tens Rod */}
        <div className={`flex flex-col items-center z-10 ${highlight === 'tens' ? 'bg-yellow-100/50 p-2 -m-2 rounded' : ''}`}>
          <div className="h-40 w-2 bg-gray-400 rounded-t relative flex flex-col-reverse justify-start pb-8">
             {Array.from({ length: tens }).map((_, i) => (
                <motion.div 
                    key={`t-bead-${i}`}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                    className="w-8 h-6 bg-red-500 rounded-full border-b-4 border-red-700 shadow-sm mb-0.5 z-10"
                />
             ))}
          </div>
          <div className="mt-2 text-xl font-bold text-gray-700 bg-white px-2 rounded border border-gray-200">十位</div>
        </div>

        {/* Ones Rod */}
        <div className={`flex flex-col items-center z-10 ${highlight === 'ones' ? 'bg-yellow-100/50 p-2 -m-2 rounded' : ''}`}>
           <div className="h-40 w-2 bg-gray-400 rounded-t relative flex flex-col-reverse justify-start pb-8">
              {Array.from({ length: ones }).map((_, i) => (
                <motion.div 
                    key={`o-bead-${i}`}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                    className="w-8 h-6 bg-green-500 rounded-full border-b-4 border-green-700 shadow-sm mb-0.5 z-10"
                />
             ))}
           </div>
           <div className="mt-2 text-xl font-bold text-gray-700 bg-white px-2 rounded border border-gray-200">个位</div>
        </div>
      </div>
    </div>
  );
};