"use client";
import { getUserBalance } from "@/api/coringaApi";
import { seninhaApi } from "@/api/seninhaApi";
import { Header } from "@/components/header/Header";
import { TicketMain } from "@/components/ticket/TicketMain";
import { useEffect, useState } from "react";
import bg from "../../../public/choose-us.jpg";

import { CoringaIntegrationData } from "@/interfaces/ticket";

const getTicketTypes = async () => {
  const response = await seninhaApi.get("ticket-types");
  if (response.status === 200) {
    return response.data.data;
  }
  return [];
};

export default function Tickets({
  authToken,
  userId,
  pageInformations,
}: {
  authToken: string;
  userId: string;
  pageInformations: any
}) {
  const [ticketTypes, setTicketTypes] = useState<any>([]);
  const [prizes, setPrizes] = useState<any>({});
  const [balance, setBalance] = useState<number>(0);

  let coringaIntegrationData: CoringaIntegrationData = {
    balance: balance,
    setBalance: setBalance,
    authToken: authToken,
    userId: userId,
  };
  useEffect(() => {
    const fetchData = async () => {
      const ttResult = await getTicketTypes();
      setTicketTypes(ttResult);

      const prizeResult = {};
      setPrizes(prizeResult);

      const userBalance = await getUserBalance(userId, authToken);
      setBalance(userBalance ?? 0);
    };

    fetchData();
  }, [authToken, userId]);

  return (
    <>
      <Header />
      <div className="relative pt-[9dvh] text-white min-h-[100dvh] bg-brand-blue-100 bg-opacity-70">
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
          }}
          className="absolute inset-0 w-full h-full bg-cover z-[-1]"
        ></div>
        <div className="container relative z-10">
          <TicketMain
            pageInformations={pageInformations}
            prizes={prizes}
            ticketTypes={ticketTypes}
            integrationData={coringaIntegrationData}
          />
        </div>
      </div>
    </>
  );
}
