"use client";

import { useEffect, useState } from "react";

export default function Carousel({ winners, lgUp }: { winners: any, lgUp: any }) {
  const [currentBatch, setCurrentBatch] = useState(0);
  const batchSize = lgUp ? 5 : 3;
  const totalBatches = Math.ceil(winners.length / batchSize);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatch((prevBatch) => (prevBatch + 1) % totalBatches);
    }, 6000); // Change batch every 6 seconds

    return () => clearInterval(interval);
  }, [totalBatches]);

  const getCurrentBatchWinners = () => {
    const startIndex = currentBatch * batchSize;
    const endIndex = startIndex + batchSize;
    return winners.slice(startIndex, endIndex);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <ul className="relative flex flex-col gap-6 w-full max-w-md h-auto overflow-hidden">
        {getCurrentBatchWinners().map((winner: any, index: number) => (
          <li
            key={index}
            className={
              "w-full transition-opacity duration-1000 ease-in-out flex items-center justify-center px-4"
            }
          >
            <div
              className={
                `text-white flex flex-col items-center justify-center w-full shadow-lg font-bold text-center rounded-lg p-4 bg-opacity-95 ` +
                (winner.PrizeType === "sena"
                  ? "bg-[#fff203] text-blue-900"
                  : winner.PrizeType === "quina"
                  ? "bg-[#54639c]"
                  : "bg-[#4f3244]")
              }
            >
              <span className="text-xl">
                {winner.Winner} - {winner.PrizeType.charAt(0).toUpperCase() + winner.PrizeType.slice(1)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul {
          position: relative;
          height: 400px; /* Adjust based on your design */
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
        }
        li {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}