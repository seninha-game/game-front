"use client";
import { TicketBody } from "@/components/ticket/TicketCard/TicketBody";
import { TicketContext, iTicketContextProps } from "@/context/ticket-context";
import { ITicket } from "@/interfaces/ticket";
import { makeRandomUniqueNumbers } from "@/utils/makeRandomUniqueNumbers";
import { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

export const Ticket = ({
  currentTicketType,
  currentIndex,
}: {
  currentTicketType: ITicket | null;
  currentIndex: number;
}) => {
  const {
    multipleTicketSelections,
    updateNumberArrayAtIndex,
  }: iTicketContextProps = useContext(TicketContext);

  const [, setDummyState] = useState(false);
  return (
    <div className="">
      <div className="bg-brand-theme-100 bg-opacity-90 text-white h-[13%] gap-2 rounded-t-xl flex flex-col justify-center items-center py-2 ">
        <span className=" font-bold">Escolha seus números!</span>
        <div className="flex justify-between w-full px-6">
          {" "}
          <button
            id="delete-single-selection-button"
            aria-label="delete-single-selection-button"
            onClick={() => {
              if (currentTicketType) {
                const randomNumbers = makeRandomUniqueNumbers(
                  currentTicketType?.numbers_amount
                );
                updateNumberArrayAtIndex(randomNumbers, currentIndex);
                setDummyState((prev) => !prev);
              }
            }}
            className="flex items-center gap-1"
          >
            <GiCheckMark className="w-[10px]" />
            Seleção rápida
          </button>
          <button
            onClick={() => {
              updateNumberArrayAtIndex([], currentIndex);
              setDummyState((prev) => !prev);
            }}
            className="flex items-center gap-1"
          >
            <FaRegTrashAlt className="w-[10px]" /> Limpar
          </button>
        </div>
      </div>

      <TicketBody
        currentIndex={currentIndex}
        currentSelectedNumbers={multipleTicketSelections[currentIndex]}
        currentSelectedTicketType={currentTicketType}
      ></TicketBody>
    </div>
  );
};
