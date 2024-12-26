"use client";

export const NumberBalls = ({ units }: { units: string }) => {
  let transformToNumbers: number[] = [];
  if (units) {
    transformToNumbers = units.split(",").map(Number);
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {transformToNumbers.map((number, index) => (
          <div
            id="ball"
            key={index}
            className={
              "text-black rounded-full flex text-center items-center font-bold ball w-6 h-6"
            }
          >
            <p className={"mx-auto fade-in text-xs"}>{number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
