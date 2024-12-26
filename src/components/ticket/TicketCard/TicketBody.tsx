"use client";
import { iTicketContextProps, TicketContext } from "@/context/ticket-context";
import { ITicket } from "@/interfaces/ticket";
import { useContext, useEffect, useState } from "react";
import { TicketNumberOption } from "./TicketNumber";

export const shadowSet =
  " shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]";

export const TicketBody = ({
  currentSelectedTicketType,
  currentIndex,
}: {
  currentSelectedNumbers: number[];
  currentSelectedTicketType: ITicket | null;
  currentIndex: number;
}) => {
  const [, setDummyState] = useState(false);
  const amountOfPossibleNumbers = 60;

  const { updateNumberArrayAtIndex }: iTicketContextProps =
    useContext(TicketContext);

  const numberOptions = Array.from(
    { length: amountOfPossibleNumbers },
    (_, index) => index + 1
  );
  useEffect(() => {
    if (currentSelectedTicketType === undefined) {
      updateNumberArrayAtIndex([], currentIndex);
      setDummyState((prev) => !prev);
    }
  }, [currentSelectedTicketType, currentIndex, updateNumberArrayAtIndex]);

  return (
    <div className={shadowSet + " p-2 rounded-b-xl border bg-white"}>
      <div className="flex flex-wrap justify-between gap-2 ">
        {numberOptions.map((number, i) => (
          <TicketNumberOption
            currentIndex={currentIndex}
            maxNumbers={
              currentSelectedTicketType
                ? currentSelectedTicketType.numbers_amount
                : 0
            }
            // setSelected={setSelected}
            number={number}
            key={i}
          ></TicketNumberOption>
        ))}
      </div>
    </div>
  );
};
