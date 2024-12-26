"use client";

import { IPrizes } from "@/interfaces/raffle";
import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import { formatCurrency } from "@/utils/formatCurrency";
import { HiOutlineTrophy } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";
import FullScreenModal from "../modal/ModalTicketSelect";
import { Timer } from "../raffle/Timer";
import { HowToPlaySection } from "./HowToPlaySection/HowToPlaySection";

export const InformationChangePage = ({
  prizes,
  selectedPage,
  ticketTypes,
  integrationData,
  currentRaffle,
}: {
  ticketTypes: ITicket[];
  prizes: IPrizes;
  selectedPage: "bet" | "info";
  integrationData: CoringaIntegrationData;
  currentRaffle: any;
}) => {
  return (
    <>
      {selectedPage === "bet" ? (
        <>
          <CardSection
            currentRaffle={currentRaffle}
            selectedPage={selectedPage}
            prizes={prizes}
          ></CardSection>

          <div className={`w-fit mx-auto fade-in`}>
            <FullScreenModal
              ticketTypes={ticketTypes}
              integrationData={integrationData}
            ></FullScreenModal>
          </div>
        </>
      ) : (
        <>
          <HowToPlaySection selectedPage={selectedPage}></HowToPlaySection>
        </>
      )}
    </>
  );
};

const CardSection = ({
  prizes,
  selectedPage,
  currentRaffle,
}: {
  prizes: IPrizes;
  selectedPage: "bet" | "info";
  currentRaffle: any;
}) => {
  return (
    <div
      className={` mx-auto flex flex-col sm:flex-row gap-8  text-sm text-[1rem] md:text-lg justify-center items-center mt-20  ${selectedPage === "bet" && "fade-in"}`}
    >
      <Card
        icon={
          <HiOutlineTrophy className="text-brand-yellow-100 w-10 h-10 "></HiOutlineTrophy>
        }
        title="Sorteio"
      >
        <>
          <div className="flex flex-col gap-4 items-center md:flex-row md:mx-auto w-full justify-between">
            {" "}
            <div className="text-white flex flex-col items-center mt-2 ">
              <span className="text-[0.9rem]">PRÓXIMA RODADA</span>
              <div className="h-[57.8px] w-[130px] flex items-center justify-center rounded-2xl bg-[#233481] bg-opacity-35">
                <Timer
                  customClass={"text-3xl font-bold"}
                  createdAt={currentRaffle.createdAt}
                  endsAt={currentRaffle.endsAt}
                ></Timer>
              </div>
            </div>
            <div className="text-white flex flex-col items-center ">
              <span className="text-[0.9rem]">RODADA ATUAL</span>
              <div className="h-[57.8px] w-[130px] flex items-center justify-center rounded-2xl  bg-[#233481] bg-opacity-35">
                <span className="text-3xl font-bold p-4">
                  {currentRaffle.id}
                </span>
              </div>
            </div>
          </div>
        </>
      </Card>

      <Card
        icon={
          <MdOutlineAttachMoney className="text-brand-yellow-100 w-10 h-10"></MdOutlineAttachMoney>
        }
        title="Premiações"
      >
        <div className="text-lg md:text-xl">
          <div className="flex w-full gap-4 justify-around">
            {" "}
            <h2 className="font-medium">Sena</h2>
            <span className=" font-bold">
              {formatCurrency(prizes.sena ? prizes.sena / 100 : 0)}
            </span>
          </div>
          <div className="flex w-full gap-4 justify-around">
            {" "}
            <h2 className="font-medium">Quina</h2>
            <span className=" font-bold">
              {formatCurrency(prizes.quina ? prizes.quina / 100 : 0)}
            </span>
          </div>
          <div className="flex w-full gap-4 justify-around">
            {" "}
            <h2 className="font-medium">Quadra</h2>
            <span className=" font-bold">
              {formatCurrency(prizes.quadra ? prizes.quadra / 100 : 0)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Card = ({
  icon,
  title,
  children,
}: {
  icon: JSX.Element;
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div className="font-semibold rounded-md items-center md:items-start w-[80%] max-w-[350px] md:w-[350px] min-h-[200px] flex border-[1px] p-4 text-white border-gray-700 border-opacity-40 flex-col  bg-[#01162f]">
      {icon}
      <div className="mt-6 w-full  flex flex-col gap-4">
        <h3 className="text-white w-fit mx-auto text-xl">{title}</h3>
        {children}
      </div>
    </div>
  );
};
