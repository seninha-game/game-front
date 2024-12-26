import { useEffect, useState } from "react";

const useTimer = ({ createdAt, endsAt }: { createdAt: any; endsAt: any }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date().getTime();
    const serverStart = new Date(createdAt).getTime();
    const serverEnd = new Date(endsAt).getTime();

    const elapsed = now - serverStart; // Tempo decorrido desde o `createdAt`
    const remaining = serverEnd - now; // Tempo restante até o `endsAt`

    if (remaining > 0) {
      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      return { minutes, seconds };
    }
    return { minutes: 0, seconds: 0 }; // Caso já tenha acabado
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const serverEnd = new Date(endsAt).getTime();
      const difference = serverEnd - now;

      if (difference > 0) {
        const minutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  return timeLeft;
};

export { useTimer };
