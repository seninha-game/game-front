import React, { useEffect, useState } from "react";

interface ContentCyclerProps {
  divContents: React.ReactNode[];
  interval?: number;
}

const ContentCycler: React.FC<ContentCyclerProps> = ({
  divContents,
  interval = 60000,
}) => {
  const [visibleDivIndex, setVisibleDivIndex] = useState<number>(0);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setVisibleDivIndex((prevIndex) => (prevIndex + 1) % divContents.length);
    }, interval);

    return () => clearInterval(cycleInterval);
  }, [divContents.length, interval]);

  return (
    <div className="relative w-full h-full">
      {divContents.map((content, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            visibleDivIndex === index
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {content}
        </div>
      ))}
    </div>
  );
};

export default ContentCycler;
