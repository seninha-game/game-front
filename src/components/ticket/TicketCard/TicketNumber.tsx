import { TicketContext, iTicketContextProps } from "@/context/ticket-context";
import React, { useContext, useEffect, useState } from "react";

export const TicketNumberOption = ({
  number,
  maxNumbers,
  currentIndex,
}: {
  number: number;
  maxNumbers: number;
  currentIndex: number;
}) => {
  const [, setDummyState] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const {
    multipleTicketSelections,
    setMultipleTicketSelections,
    updateNumberArrayAtIndex,
  }: iTicketContextProps = useContext(TicketContext);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (multipleTicketSelections[currentIndex].includes(number)) {
      let updatedArray = multipleTicketSelections[currentIndex].filter(
        (element) => element != number
      );
      updateNumberArrayAtIndex(updatedArray, currentIndex);
    } else if (maxNumbers === multipleTicketSelections[currentIndex].length) {
      return;
    } else {
      let addToArr = [...multipleTicketSelections[currentIndex], number];
      updateNumberArrayAtIndex(addToArr, currentIndex);
    }
    setDummyState((prev) => !prev);
  };

  useEffect(() => {
    if (multipleTicketSelections[currentIndex]) {
      if (multipleTicketSelections[currentIndex].includes(number)) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }
  }, [multipleTicketSelections]);
  const defaultButtonClass =
    "p-2 w-8 h-8 rounded-full flex justify-center items-center font-semibold";

  return (
    <div className="">
      <button
        onClick={(e) => handleOptionClick(e)}
        className={`${defaultButtonClass} ${
          isSelected
            ? "transition ease-in duration-100  bg-brand-blue-100 bg-opacity-70 text-white font-bold"
            : "text-gray-950 hover:bg-grey-500 border border-blue-400"
        }`}
      >
        <span className="text-sm">{number}</span>
      </button>
    </div>
  );
};
