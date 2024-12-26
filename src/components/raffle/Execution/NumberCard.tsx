"use client";

import { useEffect, useRef, useState } from "react";

export const NumberCard = ({
  units,
  winnerAnimation,
  startRaffleAnimation,
  setStartRaffleAnimation,
}: {
  units: string;
  winnerAnimation: any;
  startRaffleAnimation: boolean;
  setStartRaffleAnimation: (value: boolean) => void;
}) => {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(6);
  const [showNumber, setShowNumber] = useState(false);
  const audioRaffleRef = useRef<HTMLAudioElement | null>(null);

  const transformToNumbers = units ? units.split(",").map(Number) : [];

  const handleRaffleAnimation = () => {
    let audioTimeout: NodeJS.Timeout;
    let animationInterval: NodeJS.Timeout;

    const playAudio = () => {
      if (audioRaffleRef.current) {
        audioRaffleRef.current.currentTime = 0;
        audioRaffleRef.current.loop = true;
        audioRaffleRef.current.play();
      }
    };

    const stopAudio = () => {
      if (audioRaffleRef.current) {
        audioRaffleRef.current.loop = false;
        audioRaffleRef.current.pause();
        audioRaffleRef.current.currentTime = 0;
      }
    };

    const startAnimation = () => {
      setCurrentNumberIndex(0);
      let index = 0;

      animationInterval = setInterval(() => {
        setShowNumber(true);

        setTimeout(() => {
          setShowNumber(false);

          setTimeout(() => {
            if (index < transformToNumbers.length) {
              setCurrentNumberIndex(index + 1);
              index += 1;
            }

            if (index >= transformToNumbers.length) {
              clearInterval(animationInterval);
              winnerAnimation();
              setStartRaffleAnimation(false);
            }
          }, 1200);
        }, 1500);
      }, 1800);
    };

    playAudio();
    audioTimeout = setTimeout(stopAudio, 14000);
    startAnimation();

    return () => {
      clearTimeout(audioTimeout);
      clearInterval(animationInterval);
    };
  };

  useEffect(() => {
    if (startRaffleAnimation) {
      handleRaffleAnimation();
    }
  }, [startRaffleAnimation]);

  return (
    <div>
      <audio ref={audioRaffleRef} src="/sounds/raffle.mp3" />
      <div className="flex flex-wrap gap-2">
        {transformToNumbers.map((number, index) => (
          <div
            id="ball"
            key={index}
            className={
              index < currentNumberIndex
                ? "text-black rounded-full flex text-center text-xl md:text-3xl items-center font-bold ball w-[2.8rem] h-[2.8rem] xs:w-14 xs:h-14  sm:w-[3.7rem] sm:h-[3.7rem] border-[0.01px] border-black drop-shadow-lg"
                : "rounded-full shadow-md drop-shadow-md flex text-center items-center ball w-[2.8rem] h-[2.8rem] xs:w-14 xs:h-14 sm:w-[3.7rem] sm:h-[3.7rem] animate-spin-fast"
            }
          >
            <p
              className={
                index < currentNumberIndex ? "mx-auto fade-in" : "hidden"
              }
            >
              {number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
