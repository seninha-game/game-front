import React from "react";
import { IconType } from "react-icons";

export const HowToPlayCard = ({
  title,
  text,
  index,
  Icon,
}: {
  title: string;
  text: string;
  index: number;
  Icon: IconType;
}) => {
  return (
    <li
      key={index}
      className="flex sm:w-full mx-auto  font-semibold rounded-md min-h-[180px] max-h-[350px] max-w-[450px] border-[1px] p-6 text-white border-gray-700 border-opacity-40 flex-col bg-[#01162f]"
    >
      <div className="flex items-center gap-6 text-pretty  text-start">
        <div>
          <Icon className="w-12 h-12  text-brand-theme-100 p-2 rounded-full"></Icon>
        </div>

        <div className="flex flex-col  gap-4">
          {" "}
          <p className="font-bold w-fit"> {title}</p>
          <p className="text-sm font-normal w-full">{text}</p>
        </div>
      </div>
    </li>
  );
};
