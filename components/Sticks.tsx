import React from 'react';

interface SticksProps {
  count: number;
}

export const Sticks: React.FC<SticksProps> = ({ count }) => {
  const tens = Math.floor(count / 10);
  const ones = count % 10;

  return (
    <div className="flex items-end gap-2 md:gap-4 p-2 md:p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 shadow-sm min-h-[140px] md:min-h-[160px] justify-center flex-wrap max-w-full">
      {/* Bundles of 10 */}
      {Array.from({ length: tens }).map((_, i) => (
        <div key={`ten-${i}`} className="flex flex-col items-center relative group">
          <div className="relative w-10 h-28 md:w-12 md:h-32 bg-yellow-100 rounded border border-yellow-300 flex justify-center overflow-hidden shadow-md transform rotate-1">
             {/* Lines representing sticks in a bundle */}
             <div className="absolute top-1/2 w-full h-3 md:h-4 bg-red-400 z-10 -translate-y-1/2 opacity-80"></div>
             {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="h-full w-0.5 bg-yellow-600 mx-[1px]"></div>
             ))}
          </div>
          <span className="mt-2 text-xs md:text-sm text-gray-500 font-bold">1个十</span>
        </div>
      ))}

      {/* Single Sticks */}
      {ones > 0 && (
        <div className="flex gap-0.5 md:gap-1 items-end ml-1 md:ml-4 mb-1">
           {Array.from({ length: ones }).map((_, i) => (
             <div key={`one-${i}`} className="w-1.5 h-20 md:w-2 md:h-24 bg-yellow-200 border border-yellow-400 rounded-full shadow-sm transform -rotate-2 hover:-translate-y-2 transition-transform"></div>
           ))}
        </div>
      )}
      
      {tens === 0 && ones === 0 && (
         <div className="text-gray-400 italic text-sm md:text-base">没有小棒</div>
      )}
    </div>
  );
};