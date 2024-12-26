"use client";

import { seninhaApi } from "@/api/seninhaApi";
import { IRaffleData } from "@/interfaces/raffle";
import { createContext, useContext } from "react";

export const RaffleContext = createContext<IRaffleData>({} as IRaffleData);
export default async function RaffleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getLastResults = async (): Promise<IRaffleData> => {
    let response = await seninhaApi.get("/raffle/data");
    try {
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      return response.data.data;
    }
  };

  const raffleData = await getLastResults();

  return (
    <RaffleContext.Provider
      value={{
        currentRaffle: raffleData.currentRaffle,
        lastRaffles: raffleData.lastRaffles,
        lastTicketsBought: raffleData.lastTicketsBought,
        lastWinners: raffleData.lastWinners,
        prizes: raffleData.prizes,
        raffleResult: raffleData.raffleResult,
        topPaidPrize: raffleData.topPaidPrize,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
}

export const useTicketContext = () => useContext(RaffleContext);
