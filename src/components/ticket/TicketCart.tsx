"use client";
import { TicketContext, iTicketContextProps } from "@/context/ticket-context";
import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import { formatCurrency } from "@/utils/formatCurrency";
import React, { useContext, useState } from "react";
import NestedBuyModal from "../modal/NestBuyModal";
import { shadowSet } from "./TicketCard/TicketBody";

interface TicketCartProps {
        amount: number;
        ticketType: ITicket;
        isReadyForBuy: boolean;
        isBuySuccess: boolean;
        setIsBuySuccess: React.Dispatch<React.SetStateAction<boolean>>;
        integrationData: CoringaIntegrationData
}
export const TicketCart = ({
        amount,
        ticketType,
        isReadyForBuy,
        isBuySuccess,
        setIsBuySuccess,
        integrationData
}: TicketCartProps) => {
        const realPrice = ticketType.price / 100;
        const value = amount * realPrice;
        const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

        const { isLoading }: iTicketContextProps = useContext(TicketContext);

        return (
                ticketType && (
                        <div className="h-fit mx-auto flex flex-col max-w-[550px] self-center">
                                {
                                        <NestedBuyModal
                                                setIsBuySuccess={setIsBuySuccess}
                                                infoTicket={{ amount, selectedType: ticketType }}
                                                open={isBuyModalOpen}
                                                setOpen={setIsBuyModalOpen}
                                                integrationData={integrationData}
                                        ></NestedBuyModal>
                                }
                                <div className="flex flex-col h-fit lg:min-w-[350px] mx-auto w-full">
                                        <h2 className="text-white  flex justify-center bg-brand-theme-100 p-6 rounded-t-md">
                                                Carrinho
                                        </h2>
                                        <div className={shadowSet + " rounded-b-lg"}>
                                                <div className=" flex flex-col ">
                                                        <div className="flex flex-col gap-2 p-4">
                                                                <p className="w-full flex justify-between">
                                                                        Quantidade de bilhetes <span>{amount}</span>
                                                                </p>
                                                                <p className="w-full flex justify-between">
                                                                        Preço do bilhete <span>{formatCurrency(realPrice)}</span>
                                                                </p>
                                                        </div>{" "}
                                                        <div className="border-t-[1px] mt-2 w-full   border-slate-400 flex flex-col"></div>
                                                        <div className="flex flex-col pb-4">
                                                                <p className=" border-t-1 border-black mt-2 w-full flex justify-between font-bold p-4">
                                                                        Preço final <span> {formatCurrency(value)}</span>
                                                                </p>
                                                                <button
                                                                        onClick={() => setIsBuyModalOpen(true)}
                                                                        disabled={!isReadyForBuy}
                                                                        className={`
                     w-fit p-4 mx-auto rounded-md md:mt-2 lg:px-8 text-white border-2 bg-brand-theme-100 border-opacity-0 disabled:opacity-50 disabled:bg-brand-theme-100 disabled:hover:opacity-75 disabled:cursor-not-allowed`}
                                                                >
                                                                        Comprar
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                )
        );
};
