import React from "react";
import { howToPlayTextsMockupSec1, howToPlayTextsMockupSec2 } from "./mock";
import { HowToPlayCard } from "./HowToPlayCard";

export const HowToPlaySection = ({
  selectedPage,
}: {
  selectedPage: "bet" | "info";
}) => {
  return (
    <div className={` ${selectedPage === "info" && " fade-in mt-12"}`}>
      <div className="flex w-full justify-between">
        <div className="flex flex-col sm:flex-row gap-6  w-full justify-between lg:px-12">
          <ul className="flex flex-col gap-6">
            {howToPlayTextsMockupSec1.map((element, i) => {
              return (
                <HowToPlayCard
                  key={i}
                  index={i}
                  title={element!.title}
                  text={element!.text}
                  Icon={element!.icon}
                ></HowToPlayCard>
              );
            })}
          </ul>
          <ul className="flex flex-col  gap-6 ">
            {howToPlayTextsMockupSec2.map((element, i) => {
              return (
                <HowToPlayCard
                  key={i}
                  index={i}
                  title={element!.title}
                  text={element!.text}
                  Icon={element!.icon}
                ></HowToPlayCard>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};
