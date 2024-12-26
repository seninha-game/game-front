import { ITicket } from "@/interfaces/ticket";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

export const TicketType = ({
        ticketType,
        selectedType,
        setSelectedTicketType,
}: {
        selectedType: ITicket;
        setSelectedTicketType: React.Dispatch<React.SetStateAction<ITicket>>;
        ticketType: ITicket;
}) => {
        let selectedClass;
        if (selectedType != null) {
                let isCurrentlySelected = selectedType.id === ticketType.id;
                selectedClass = isCurrentlySelected
                        ? " bg-brand-theme-100 text-white border-2 border-transparent"
                        : " hover:bg-brand-theme-100 hover:bg-opacity-90  hover:ease-in hover:transition-all hover:duration-100 hover:text-white border-2 border-transparent min-w-[155.86px]";
        }
        const shadowTypeCard = " shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.14)]";

        let formatPrice = formatCurrency(ticketType.price / 100);

        return (
                <div
                        onClick={() => {
                                setSelectedTicketType(ticketType);
                        }}
                        className={
                                selectedClass +
                                shadowTypeCard +
                                "  text-brand-blue-100 font-bold text-sm sm:text-base px-8 flex flex-col p-2  rounded-md cursor-pointer min-w-[155.86px]"
                        }
                >
                        <span className="text-xl">
                                {ticketType.name.charAt(0).toLocaleUpperCase() +
                                        ticketType.name.slice(1)}
                        </span>
                        <div className="flex flex-col mt-2 font-normal">
                                <span>{formatPrice}</span>
                                <span>{ticketType.numbers_amount} números</span>
                        </div>
                </div>
        );
};
