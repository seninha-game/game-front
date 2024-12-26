export interface ICurrentRaffle {
  createdAt: string;
  endsAt: string;
  id: number;
}

export interface ILastRaffle extends ICurrentRaffle {
  numbers: string;
}

export interface ILastTicketBought {
  name: string;
  source: string;
  ticket_type: string;
}

export interface ILastWinner {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  PrizeType: string;
  Value: number;
  Winner: string;
  TicketID: number;
  RaffleID: number;
}

export interface IPrizes {
  quadra: number;
  quina: number;
  sena: number;
}

export interface IPayment {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  PrizeType: string;
  Value: number;
  Winner: string;
  TicketID: number;
  RaffleID: number;
}

export interface IRaffleResult {
  Payments: IPayment[] | null;
  Accumulated: number;
}

export interface IRaffleData {
  currentRaffle: ICurrentRaffle;
  lastRaffles: ILastRaffle[];
  lastTicketsBought: ILastTicketBought[];
  lastWinners: ILastWinner[];
  prizes: IPrizes;
  raffleResult: IRaffleResult;
  topPaidPrize: IPayment[];
}
