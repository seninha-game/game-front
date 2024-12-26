// "use client";
// import { TicketModel } from "@/app/context/ticket-context";
// import { getCurrentPrize } from "@/app/sorteio/page";
// import { useTimer } from "@/hooks/useTimer";
// import { prizesCentsToReal } from "@/utils/centsToReal";
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import CardInfo from "./CardInfo";

// export interface prizesInterface {
//   sena: number;
//   quina: number;
//   quadra: number;
//   acumulado: number;
//   coringa_games: number;
// }

// export interface prizesToBrl {
//   sena: string;
//   quina: string;
//   quadra: string;
//   acumulado: string;
//   coringa_games: string;
// }
// interface recheckData {
//   tickets: TicketModel[];
//   prizes: prizesInterface;
// }
// export const RaffleDefaultInitial = ({
//   activeTickets,
//   currentPrize,
// }: {
//   activeTickets: TicketModel[];
//   currentPrize: prizesToBrl;
// }) => {
//   const [recheckTicketsLength, setRecheckTickets] = useState(
//     activeTickets.length
//   );
//   const [recheckPrizes, setRecheckPrizes] = useState(currentPrize);
//   const timerState = useTimer();
//   const [loading, setLoading] = useState(false);
//   const [timerGotZero, setTimerGotZero] = useState(false);
//   useEffect(() => {
//     const checkTicketsInterval = setInterval(() => {
//       getCurrentPrize().then((response) => {
//         let ticketsAmount = response.tickets.length;
//         if (ticketsAmount > 0) {
//           setRecheckTickets(ticketsAmount);
//         }
//         if (response.prizes) {
//           setRecheckPrizes(prizesCentsToReal(response.prizes));
//         }
//       });
//     }, 10000);
//     return () => clearInterval(checkTicketsInterval);
//   }, []);

//   useEffect(() => {
//     if (timerState.minutes === 0 && timerState.seconds === 5) {
//       setLoading(true);
//       setTimerGotZero(true);
//     } else {
//       setTimerGotZero(false);
//     }
//   }, [timerState.minutes, timerState.seconds]);

//   useEffect(() => {
//     if (timerGotZero) {
//       setTimeout(() => {
//         window.location.href = "/sorteio/execute";
//       }, 4500);
//     }
//   }, [timerGotZero]);
//   let seconds =
//     timerState.seconds >= 10
//       ? timerState.seconds
//       : "0" + `${timerState.seconds}`;
//   let minutes =
//     timerState.minutes >= 10
//       ? timerState.minutes
//       : "0" + `${timerState.minutes}`;

//   return (
//     <div className="flex flex-col justify-between h-[102dvh] w-[100dvw] bg-black pb-6">
//       <Link
//         href={"/bilhetes"}
//         className="bg-purple-500 w-6 h-6 sm:w-10 sm:h-10 rounded-lg absolute top-2 left-2"
//       >
//         <IoIosArrowRoundBack className="w-6 h-6 sm:w-10 sm:h-10"></IoIosArrowRoundBack>
//       </Link>
//       <div className="w-full h-full container">
//         <div className="h-[10dvh] w-full flex items-center">
//           <h1 className="w-fit text-brand-yellow-100  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-7xl stroke-slate-900 mx-auto">
//             Seninha
//           </h1>
//         </div>
//         <p className="w-full bg-purple-500 rounded-3xl font-semibold text-white text-4xl text-center p-2 mb-8">
//           Atenção
//         </p>
//         <div className="flex flex-col items-center justify-center h-[35dvh] border-2 text-white border-blue-600 rounded-md mb-6 sm:w-[65%] mx-auto text-center">
//           {recheckTicketsLength > 0 ? (
//             <>
//               {!timerGotZero ? (
//                 <>
//                   <div>
//                     <p>{recheckTicketsLength} estão concorrendo ao prêmio! </p>
//                   </div>
//                   <p className="pt-4 px-4 font-bold w-fit h-fit">
//                     A RODADA VAI COMEÇAR EM:
//                   </p>
//                   <div>
//                     {minutes} : {seconds}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <h1>Preparando, aguarde</h1>
//                     <div className="flex flex-col gap-5">
//                       <p className="font-bold w-fit h-fit">
//                         A RODADA VAI COMEÇAR
//                       </p>
//                       <Box sx={{ display: "flex", margin: "auto" }}>
//                         <CircularProgress color={"success"} size={80} />
//                       </Box>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             <>
//               <div className="w-[75%] sm:text-xl flex flex-col justify-around h-full">
//                 <div className="flex flex-col">
//                   <span>
//                     O próximo sorteio acontece em{" "}
//                     <div>
//                       {minutes} : {seconds}
//                     </div>
//                   </span>
//                   <p className="flex flex-col">
//                     Compre seu bilhete e concorra agora!
//                     <Link
//                       target="_blank"
//                       className="p-2 mt-4 mx-auto w-fit rounded-lg bg-white text-black"
//                       href={"/bilhetes"}
//                     >
//                       Clique Aqui
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="mx-auto pt-6 px-4">
//           <div className="flex w-full justify-between mb-8">
//             <CardInfo
//               text="ACUMULADO"
//               info={recheckPrizes.acumulado}
//               customClass={"mx-auto"}
//             ></CardInfo>
//           </div>
//           <div className="mx-auto w-fit bg-black">
//             <CardInfo
//               text="SENA"
//               info={recheckPrizes.sena}
//               customClass={null}
//             ></CardInfo>
//           </div>
//           <div className="flex w-full justify-around mt-8">
//             <CardInfo
//               text="QUINA"
//               info={recheckPrizes.quina}
//               customClass={null}
//             ></CardInfo>
//             <CardInfo
//               text="QUADRA"
//               info={recheckPrizes.quadra}
//               customClass={null}
//             ></CardInfo>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
