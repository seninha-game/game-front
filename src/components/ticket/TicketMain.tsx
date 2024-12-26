"use client";

import { seninhaApi } from "@/api/seninhaApi";
import { prizesCommonInterface } from "@/interfaces/raffle";
import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollTopButton } from "../buttonScrollTop/ScrollTopButton";
import { InformationChangePage } from "./InformationChangePage";

const getLastResults = async (): Promise<any> => {
  //todo typagem
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

export const TicketMain = ({
  ticketTypes,
  prizes,
  integrationData: integrationData,
  pageInformations,
}: {
  ticketTypes: ITicket[];
  prizes: prizesCommonInterface;
  integrationData: CoringaIntegrationData;
  pageInformations: any;
}) => {
  const [selectedPage, setSelectedPage] = useState<"bet" | "info">("bet");
  const [informations, setInformations] = useState<{}>({});
  const [currentPrizes, setCurrentPrizes] = useState<any>({});
  const [currentRaffle, setCurrentRaffle] = useState<any>({});
  useEffect(() => {
    const es = new EventSource("http://localhost:8080/events");
    es.onopen = () => console.log(">>> Connection opened!");
    es.onerror = (e) => console.log("ERROR!", e);
    es.onmessage = (e) => {
      const event = JSON.parse(e.data);
      const data = event.data;
      const type = event.type;
      switch (type) {
        case "raffleData":
          setCurrentPrizes({ ...data?.prizes });
          setCurrentRaffle({ ...data?.currentRaffle });
          break;
        case "prizeUpdate":
          setCurrentPrizes({ ...data });
          break;
        case "newTicket":
          break;
        default:
          break;
      }
    };
    setCurrentPrizes({ ...pageInformations?.prizes });
    setCurrentRaffle({ ...pageInformations?.currentRaffle });
    return () => es.close();
  }, []);

  const standByButtonClass =
    " flex items-center gap-1 p-2 border-[2px] border-brand-theme-100 rounded-md hover:bg-brand-theme-100 hover:ease-in hover:transition-all hover:duration-200 hover:text-white";
  const selectedButtonClass =
    "text-white bg-brand-theme-100 p-2 border-[2px] border-transparent  rounded-md";

  return (
    <div className="pb-6 ">
      <div className=" flex flex-col justify-end gap-10">
        <div className="flex flex-col">
          {" "}
          <h1 className="text-2xl md:text-4xl font-bold  text-brand-theme-100 flex gap-2 mx-auto md:mx-0 mt-6">
            SENINHA
          </h1>
          <h4>
            Aqui você aposta com grandes chances, temos bilhetes de até
            {ticketTypes &&
              " " + ticketTypes[ticketTypes?.length - 1]?.numbers_amount}{" "}
            números!
          </h4>
        </div>
        <div className=" flex justify-between text-sm md:text-lg gap-12 w-full flex-col sm:flex-row items-center ">
          {" "}
          <div className="flex flex-row gap-6">
            {" "}
            <button
              onClick={() => {
                setSelectedPage("bet");
              }}
              className={`${selectedPage === "info" ? standByButtonClass : selectedButtonClass}  `}
            >
              Aposte já
            </button>
            <button
              onClick={() => {
                setSelectedPage("info");
              }}
              className={`${selectedPage === "bet" ? standByButtonClass : selectedButtonClass}  `}
            >
              Como jogar
            </button>
          </div>
          <Link
            className="rounded-md h-fit p-2 border-[2px] border-brand-theme-100  w-fit   fade-in-2 hover:bg-brand-theme-100 hover:ease-in hover:transition-all hover:duration-200 hover:text-white"
            href={"/sorteio"}
          >
            Acompanhar sorteio agora
          </Link>
        </div>
      </div>

      {ticketTypes && (
        <InformationChangePage
          ticketTypes={ticketTypes}
          selectedPage={selectedPage}
          prizes={currentPrizes}
          currentRaffle={currentRaffle}
          integrationData={integrationData}
        ></InformationChangePage>
      )}
      <ScrollTopButton></ScrollTopButton>
    </div>
  );
};
