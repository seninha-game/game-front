"use client";
import { useTimer } from "@/hooks/useTimer";

export const Timer = ({
  customClass,
  createdAt,
  endsAt,
}: {
  customClass: string | null;
  createdAt: any;
  endsAt: any;
}) => {
  const timer = useTimer({createdAt, endsAt});
  let seconds = timer.seconds >= 10 ? timer.seconds : "0" + `${timer.seconds}`;
  let minutes = timer.minutes >= 10 ? timer.minutes : "0" + `${timer.minutes}`;

  return (
    <span className={`countdown font-mono text-2xl ${customClass ?? ""}`}>
      <span style={{ "--value": minutes } as React.CSSProperties}></span>:
      <span style={{ "--value": seconds } as React.CSSProperties}></span>
    </span>
  );
};
