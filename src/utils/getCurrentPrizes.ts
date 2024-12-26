import { TicketModel } from "@/interfaces/ticket";

export const initialPrizes = {
  sena: 10000,
  quina: 1000,
  quadra: 500,
  acumulado: 0,
  coringa_games: 0,
};

export const prizeConfiguration = {
  sena: 0.4,
  quina: 0.1,
  quadra: 0.05,
  acumulado: 0.1,
  coringa_games: 0.35,
};
type prizes = {
  sena: number;
  quina: number;
  quadra: number;
  acumulado: number;
  coringa_games: number;
};
export const getCurrentPrize = (ticketList: TicketModel[]) => {
  let auxPrizeTotal = initialPrizes;
  let totalPot = 0;
  const objKeysPrizes = Object.keys(prizeConfiguration);
  ticketList.forEach((e) => {
    totalPot += e.ticket_type.price;
  });
  objKeysPrizes.forEach((key) => {
    let objKey = key as keyof prizes;
    auxPrizeTotal[objKey] =
      totalPot * prizeConfiguration[objKey] + initialPrizes[objKey];
  });
};
