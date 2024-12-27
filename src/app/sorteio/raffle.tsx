"use client";
import { seninhaApi } from "@/api/seninhaApi";
import ContentCycler from "@/components/raffle/ContentCycler";
import Carousel from "@/components/raffle/Execution/Carousel";
import { NumberCard } from "@/components/raffle/Execution/NumberCard";
import { NumberBalls } from "@/components/raffle/NumberBalls";
import { Timer } from "@/components/raffle/Timer";
import { RaffleContext } from "@/context/raffle-context";
import {
  ICurrentRaffle,
  ILastRaffle,
  ILastTicketBought,
  ILastWinner,
  IPayment,
  IPrizes,
  IRaffleData,
  IRaffleResult,
} from "@/interfaces/raffle";
import { formattingPrice } from "@/utils/formattingPrice";
import { useMediaQuery } from "@/utils/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  TConductorInstance,
  TOnInitPresetFn,
} from "react-canvas-confetti/dist/types";
import { IoTicketOutline } from "react-icons/io5";
import { RiVipCrownFill } from "react-icons/ri";
import fundo from "../../../public/raffle/tela-2.jpg";
import seninhaLogo from "../../../public/raffle/vetor logo seninha.svg";

export default function RafflePage() {
  const smUp = useMediaQuery("(min-width: 600px)");
  const lgUp = useMediaQuery("(min-width: 1280px)");
  const pageInformations = useContext(RaffleContext);

  const [lastRaffles, setLastRaffles] = useState<ILastRaffle[]>(
    pageInformations?.lastRaffles
  );
  const [numbersCard, setNumbersCard] = useState<ILastRaffle>(
    pageInformations?.lastRaffles[0]
  );
  const [lastWinners, setLastWinners] = useState<ILastWinner[]>(
    pageInformations?.lastWinners
  );
  const [winners, setWinners] = useState<any[]>([]);
  const [topPaidPrize, setTopPaidPrize] = useState<IPayment[]>(
    pageInformations?.topPaidPrize
  );
  const [lastTicketsBought, setLastTicketsBought] = useState<
    ILastTicketBought[]
  >(pageInformations?.lastTicketsBought);
  const [currentPrizes, setCurrentPrizes] = useState<IPrizes>(
    pageInformations?.prizes
  );
  const [currentRaffle, setCurrentRaffle] = useState<ICurrentRaffle>(
    pageInformations?.currentRaffle
  );
  const [raffleResult, setRaffleResult] = useState<IRaffleResult>(
    pageInformations?.raffleResult
  );
  const [startRaffleAnimation, setStartRaffleAnimation] =
    useState<boolean>(false);
  const [animatedSena, setAnimatedSena] = useState<number>(
    pageInformations?.prizes.sena
  );
  const [animatedQuina, setAnimatedQuina] = useState<number>(
    pageInformations?.prizes.quina
  );
  const [animatedQuadra, setAnimatedQuadra] = useState<number>(
    pageInformations?.prizes.quadra
  );

  const divContents = [
    <div key={"divContents1"}>
      <p className="text-white text-xl text-bold pb-2 text-center">
        Resultado dos Sorteios
      </p>
      {lastRaffles.map((raffle, index) => {
        return smUp ? (
          index < 7 ? (
            <div key={index}>
              <div className="flex justify-center p-1">
                <NumberBalls units={raffle.numbers} />
              </div>
            </div>
          ) : null
        ) : index < 3 ? (
          <div key={index}>
            <div className="flex justify-center p-1">
              <NumberBalls units={raffle.numbers} />
            </div>
          </div>
        ) : null;
      })}
    </div>,
    <div key={"divContents2"}>
      <p className="text-white text-xl text-bold pb-2 text-center">
        Ranking de Premiação
      </p>
      <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 w-[70%] mx-auto">
        {topPaidPrize.map((winners, index) => {
          return smUp ? (
            index < 6 ? (
              <Fragment key={index}>
                <div className="truncate">{winners.Winner}</div>

                <div className="text-center">
                  <span
                    className={`badge ${
                      winners.PrizeType === "sena"
                        ? "bg-yellow-500 text-black"
                        : winners.PrizeType === "quina"
                          ? "bg-gray-100 text-black"
                          : "bg-[#CD7F32] text-black"
                    }`}
                  >
                    {winners.PrizeType}
                  </span>
                </div>

                <div className="text-center">
                  {formattingPrice(winners.Value)}
                </div>

                <div className="text-center">
                  {index === 0 ? (
                    <RiVipCrownFill color="yellow" />
                  ) : index === 1 ? (
                    <RiVipCrownFill color="#d1d5db" />
                  ) : index === 2 ? (
                    <RiVipCrownFill color="#CD7F32" />
                  ) : null}
                </div>
              </Fragment>
            ) : null
          ) : index < 3 ? (
            <Fragment key={index}>
              <div className="truncate">{winners.Winner}</div>

              <div className="text-center">
                <span
                  className={`badge ${
                    winners.PrizeType === "sena"
                      ? "bg-yellow-500 text-black"
                      : winners.PrizeType === "quina"
                        ? "bg-gray-100 text-black"
                        : "bg-[#CD7F32] text-black"
                  }`}
                >
                  {winners.PrizeType}
                </span>
              </div>

              <div className="text-center">
                {formattingPrice(winners.Value)}
              </div>

              <div className="text-center">
                {index === 0 ? (
                  <RiVipCrownFill color="yellow" />
                ) : index === 1 ? (
                  <RiVipCrownFill color="#d1d5db" />
                ) : index === 2 ? (
                  <RiVipCrownFill color="#CD7F32" />
                ) : null}
              </div>
            </Fragment>
          ) : null;
        })}
      </div>
    </div>,
    <div key={"divContents3"}>
      <p className="text-white text-xl text-bold pb-2 text-center">
        Últimos Bilhetes Comprados
      </p>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 w-[50%] mx-auto">
        {lastTicketsBought.map((tickets, index) => {
          return smUp ? (
            index < 6 ? (
              <Fragment key={index}>
                <div className="truncate">{tickets.name}</div>

                <div className="text-center">{tickets.ticket_type}</div>
              </Fragment>
            ) : null
          ) : index < 3 ? (
            <Fragment key={index}>
              <div className="truncate">{tickets.name}</div>

              <div className="text-center">{tickets.ticket_type}</div>
            </Fragment>
          ) : null;
        })}
      </div>
    </div>,
  ];

  const conductorRef = useRef<TConductorInstance | null>(null);
  const audioWinnerRef = useRef<HTMLAudioElement | null>(null);

  const handleInit: TOnInitPresetFn = ({ conductor }) => {
    conductorRef.current = conductor;
  };

  const startAnimation = (animationTime: number) => {
    const animationDuration = animationTime;
    if (conductorRef.current) {
      conductorRef.current.run({ speed: 3, duration: animationDuration });

      if (audioWinnerRef.current) {
        audioWinnerRef.current.currentTime = 0;
        audioWinnerRef.current.play();
      }

      setTimeout(() => {
        if (audioWinnerRef.current) {
          audioWinnerRef.current.pause();
          audioWinnerRef.current.currentTime = 0;
        }

        setWinners([]);
      }, animationDuration);
    }
  };

  const winnerAnimation = () => {
    if (raffleResult !== null) {
      if (raffleResult.Payments !== null) {
        if (raffleResult.Payments.length > 0) {
          const cicles = lgUp
            ? raffleResult.Payments.length / 5
            : raffleResult.Payments.length / 3;
          const timer = Math.ceil(cicles) * 5000;

          startAnimation(timer);

          setWinners([...raffleResult.Payments]);
        }
      }
    }
  };

  useEffect(() => {
    const es = new EventSource(`${seninhaApi.getUri()}events`);
    es.onopen = () => console.log(">>> Connection opened!");
    es.onerror = (e) => console.log("ERROR!", e);
    es.onmessage = (e) => {
      const event = JSON.parse(e.data);
      let data: any = event.data;
      const type = event.type;

      switch (type) {
        case "raffleData":
          const raffleData: IRaffleData = data;
          setLastWinners([...raffleData?.lastWinners]);
          setTopPaidPrize([...raffleData?.topPaidPrize]);
          setLastTicketsBought([...raffleData?.lastTicketsBought]);
          setCurrentPrizes({ ...raffleData?.prizes });
          setCurrentRaffle({ ...raffleData?.currentRaffle });
          setRaffleResult({ ...raffleData?.raffleResult });
          setStartRaffleAnimation(true);
          setNumbersCard({ ...raffleData?.lastRaffles[0] });

          setTimeout(() => {
            setLastRaffles([...raffleData?.lastRaffles]);
          }, 14000);
          break;
        case "prizeUpdate":
          const prizeUpdate: IPrizes = data;
          setCurrentPrizes({ ...prizeUpdate });
          break;
        case "newTicket":
          const lastTicket: ILastTicketBought = data;
          setLastTicketsBought((prev) => {
            let lastTickets = [...prev];
            lastTickets.unshift(lastTicket);
            lastTickets.pop();

            return lastTickets;
          });
          break;
        default:
          break;
      }
    };
    return () => es.close();
  }, []);

  useEffect(() => {
    animateValue(animatedSena, currentPrizes.sena, 1000, setAnimatedSena);
    animateValue(animatedQuina, currentPrizes.quina, 1000, setAnimatedQuina);
    animateValue(animatedQuadra, currentPrizes.quadra, 1000, setAnimatedQuadra);
  }, [currentPrizes]);

  const animateValue = (
    start: number,
    end: number,
    duration: number,
    onUpdate: (arg0: number) => void
  ) => {
    const range = end - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.round(start + range * progress);

      onUpdate(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="flex flex-row w-full bg-[#010325]">
      <audio ref={audioWinnerRef} src="/sounds/winner.wav" />
      <Fireworks onInit={handleInit} />
      {lgUp && (
        <div className="flex-1 bg-[#010325]">
          <div className="bg-[#233481] bg-opacity-15 text-white flex-1 m-4 mt-20 card">
            <div className="card-body">
              <div>Últimos Bilhetes Comprados</div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="max-w-40">Nome</th>
                      <th className="text-center">Tipo do Bilhete</th>
                      <th className="text-center">Local</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastTicketsBought.map((tickets, index) => (
                      <tr key={index}>
                        <td className="max-w-40 truncate">{tickets.name}</td>
                        <td className="text-center">{tickets.ticket_type}</td>
                        <td className="text-center">
                          {tickets.source == "resale" ? "Revenda" : "WEB"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-[#233481] bg-opacity-15 text-white flex-1 m-4 card">
            <div className="card-body">
              <div>Últimos Ganhadores</div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="max-w-40">Nome</th>
                      <th className="text-center">Sorteio</th>
                      <th className="text-center">Premiação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastWinners.map((tickets, index) => (
                      <tr key={index}>
                        <td className="max-w-40 truncate">{tickets.Winner}</td>
                        <td className="text-center">
                          <div
                            className={`badge ${tickets.PrizeType == "sena" ? "bg-yellow-500 text-black" : tickets.PrizeType == "quina" ? "bg-grey-600 text-black" : "bg-[#CD7F32] text-black"}`}
                          >
                            {tickets.PrizeType}
                          </div>
                        </td>
                        <td className="text-center">
                          {formattingPrice(tickets.Value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          backgroundImage: `url(${fundo.src})`,
          backgroundSize: "100% 100%",
        }}
        className="flex flex-1 flex-col  h-[100dvh] max-w-[465px] mx-auto m-0 p-0 overflow-hidden bg-no-repeat bg-center border-[#f2d07b] border-x-4"
      >
        {winners.length > 0 && <Carousel winners={winners} lgUp={lgUp} />}
        <div className="flex-shrink-0" style={{ height: "23%" }}>
          <Image
            alt="logoSeninhaBrand"
            src={seninhaLogo}
            className="w-[85%] h-[100%] max-w-[650px] max-h-[200px] mx-auto drop-shadow-glow-2 "
          ></Image>
        </div>
        <div className="flex-shrink-0" style={{ height: "36%" }}>
          <div
            style={{ height: "71.3%" }}
            className="px-[9.7%] pb-[5%] pt-[3.5%] "
          >
            <div className="flex flex-col justify-between h-full">
              <div className="h-[50.5%] relative flex justify-center items-center text-[#ffd100] text-4xl  sm:text-5xl font-bold">
                <div className="h-full w-full absolute"></div>
                <span className="text-[#ffd100] text-4xl  sm:text-5xl font-bold">
                  {formattingPrice(animatedSena)}
                </span>
              </div>
              <div className="flex justify-between relative h-[31.5%] py-1">
                <div className="h-full relative flex justify-center items-center w-[48%]">
                  <span className="text-[#cfcfcf] text-xl xs:text-3xl sm:text-3xl font-bold">
                    {formattingPrice(animatedQuina)}
                  </span>
                </div>
                <div className="h-full relative flex justify-center items-center w-[48%] ">
                  <span className="text-[#e99151] text-xl xs:text-3xl sm:text-3xl font-bold">
                    {formattingPrice(animatedQuadra)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "29.5%",
            }}
            className="relative h-full flex flex-col justify-center items-center text-white bg-no-repeat bg-center bg-red-700 w-full"
          >
            <div className="flex flex-col">
              <div className="flex">
                <NumberCard
                  units={numbersCard.numbers}
                  startRaffleAnimation={startRaffleAnimation}
                  setStartRaffleAnimation={setStartRaffleAnimation}
                  winnerAnimation={winnerAnimation}
                ></NumberCard>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "45%" }} className="flex-shrink-0 w-full">
          <div
            style={{ height: "67.5%" }}
            className=" flex flex-col items-center justify-center py-6"
          >
            <ContentCycler divContents={divContents} interval={15000} />
          </div>
          <div
            style={{ height: "25.5%" }}
            className="flex place-content-center items-center gap-2 pb-4"
          >
            <div className="text-white flex flex-col items-center ">
              <span className="text-[0.7rem]">PRÓXIMA RODADA</span>
              <div className="h-[57.8px] w-[130px] flex items-center justify-center rounded-2xl bg-[#233481] bg-opacity-35">
                <Timer
                  customClass={"text-3xl font-bold"}
                  createdAt={currentRaffle.createdAt}
                  endsAt={currentRaffle.endsAt}
                ></Timer>
              </div>
            </div>
            <div className="text-white flex flex-col items-center ">
              <span className="text-[0.7rem]">RODADA ATUAL</span>
              <div className="h-[57.8px] w-[130px] flex items-center justify-center rounded-2xl  bg-[#233481] bg-opacity-35">
                <span className="text-3xl font-bold p-4">
                  {currentRaffle.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!lgUp && (
        <button className="btn btn-circle btn-warning text-gray-800 fixed right-[20px] bottom-[100px] z-10 animate-pulse">
          <IoTicketOutline />
        </button>
      )}
      {lgUp && (
        <div className="flex-1 bg-[#010325]">
          <div className="w-full flex flex-row-reverse p-4">
            {lgUp && (
              <Link
                href={"/bilhetes"}
                className="btn btn-warning text-gray-800 animate-pulse"
              >
                <IoTicketOutline />
                Bilhete
              </Link>
            )}
          </div>
          <div className="bg-[#233481] bg-opacity-15 text-white flex-1 m-4 mt-0 card">
            <div className="card-body">
              <div>Ranking de Premiação</div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="max-w-40">Nome</th>
                      <th className="text-center">Sorteio</th>
                      <th className="text-center">Premiação</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPaidPrize.map((winners, index) => (
                      <tr key={index}>
                        <td className="max-w-40 truncate">{winners.Winner}</td>
                        <td className="text-center">
                          <div
                            className={`badge ${winners.PrizeType == "sena" ? "bg-yellow-500 text-black" : winners.PrizeType == "quina" ? "bg-grey-600 text-black" : "bg-[#CD7F32] text-black"}`}
                          >
                            {winners.PrizeType}
                          </div>
                        </td>
                        <td className="text-center">
                          {formattingPrice(winners.Value)}
                        </td>
                        <td className="text-center">
                          {index == 0 ? (
                            <RiVipCrownFill color="yellow" />
                          ) : index == 1 ? (
                            <RiVipCrownFill color="grey-600" />
                          ) : index == 2 ? (
                            <RiVipCrownFill color="#CD7F32" />
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-[#233481] bg-opacity-15 text-white flex-1 m-4 card">
            <div className="card-body">
              <div>Resultados dos Sorteios</div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Sorteio</th>
                      <th className="text-center">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastRaffles.map((raffle, index) => {
                      return index < 8 ? (
                        <tr key={index}>
                          <td>{raffle.id}</td>
                          <td className="flex justify-center">
                            <NumberBalls units={raffle.numbers} />
                          </td>
                        </tr>
                      ) : null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
