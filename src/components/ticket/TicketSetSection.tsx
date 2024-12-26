"use client";
import { TicketContext, iTicketContextProps } from "@/context/ticket-context";
import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import { checkForCartAvailability } from "@/utils/checkCartAvailability";
import { makeRandomUniqueNumbers } from "@/utils/makeRandomUniqueNumbers";
import { Alert, Snackbar } from "@mui/material";
import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { Ticket } from "./TicketCard/Ticket";
import { TicketCart } from "./TicketCart";
import { TicketType } from "./TicketType";

export const TicketSetSection = ({
  ticketTypes,
  integrationData,
}: {
  ticketTypes: ITicket[];
  integrationData: CoringaIntegrationData;
}) => {
  const [isBuySuccess, setIsBuySuccess] = useState(false);
  const handleSnackBarClose = () => {
    setIsBuySuccess(false);
  };
  const [, setDummyState] = useState(false);
  const [isCartAvailable, setIsCartAvailable] = useState(false);

  const {
    updateNumberArrayAtIndex,
    multipleTicketSelections,
  }: iTicketContextProps = useContext(TicketContext);
  const [ticketPresetAmount, setTicketPresetAmount] = useState(() => {
    if (localStorage.getItem("ticketPresetAmount")) {
      return Number(localStorage.getItem("ticketPresetAmount"));
    } else {
      return 3;
    }
  });
  const [selectedTicketType, setSelectedTicketType] = useState<ITicket>(
    ticketTypes[0]
  );

  const numberOfLines = Array.from(
    { length: ticketPresetAmount },
    (_, index) => index + 1
  );
  const handleSelectAll = (type: string) => {
    if (selectedTicketType != null) {
      for (let i = 0; i < ticketPresetAmount; i++) {
        if (type === "select") {
          let newRandomArr = makeRandomUniqueNumbers(
            selectedTicketType.numbers_amount
          );
          updateNumberArrayAtIndex(newRandomArr, i);
        } else if (type === "delete") {
          updateNumberArrayAtIndex([], i);
        }
      }
    }
  };

  const lineTicketsPossibleAmounts = [1, 3, 5, 8];
  useEffect(() => {
    const result = checkForCartAvailability(
      multipleTicketSelections,
      selectedTicketType.numbers_amount,
      ticketPresetAmount
    );
    setIsCartAvailable(result);
  }, [multipleTicketSelections, selectedTicketType, ticketPresetAmount]);

  return (
    <>
      <section className="h-full fade-in-2 flex flex-col xl:flex-row xl:justify-between container sm:gap-8">
        {" "}
        <div className="w-full mx-auto p-0" id="ticket-section-separation">
          {isBuySuccess && (
            <Snackbar
              autoHideDuration={6000}
              onClose={handleSnackBarClose}
              open={isBuySuccess}
            >
              <Alert
                onClose={handleSnackBarClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Sua compra foi realizada com sucesso!
              </Alert>
            </Snackbar>
          )}
          <div className="w-full">
            <div
              id="bet-sec"
              className="flex flex-col sm:flex-row pt-6 justify-center items-center h-fit w-full gap-2"
            >
              <div className="my-4 flex flex-col w-full">
                <div className="block lg:hidden mb-8 ">
                  {selectedTicketType && (
                    <>
                      <TicketCart
                        isBuySuccess={isBuySuccess}
                        setIsBuySuccess={setIsBuySuccess}
                        isReadyForBuy={isCartAvailable}
                        amount={ticketPresetAmount}
                        ticketType={selectedTicketType && selectedTicketType!}
                        integrationData={integrationData}
                      />
                    </>
                  )}
                </div>

                <p className="text-black font-bold md:text-3xl mb-4">
                  <span className="text-brand-theme-100">Bilhetes</span>{" "}
                  Disponíveis
                </p>
                <p className="text-2xl mb-2 sm:mb-8">Selecione um tipo</p>
                <ul className="flex gap-6 flex-wrap">
                  {ticketTypes?.map((type, i) => (
                    <li key={i}>
                      <TicketType
                        selectedType={selectedTicketType}
                        setSelectedTicketType={setSelectedTicketType}
                        ticketType={type}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <div className="flex items-center justify-between w-full ">
                <div className="flex flex-col gap-6 sm:flex-row w-full justify-between">
                  <div className="flex flex-wrap mx-auto sm:mx-0 sm:gap-2 justify-between">
                    {lineTicketsPossibleAmounts.map((e, i) => (
                      <SelectorButton
                        amount={e}
                        key={i}
                        ticketPresetAmount={ticketPresetAmount}
                        setTicketPresetAmount={setTicketPresetAmount}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center sm:flex-row gap-12 sm:gap-2 sm:w-fit sm:mx-0">
                    <button
                      onClick={() => handleSelectAll("select")}
                      className="flex bg-brand-theme-100 rounded-md p-2 text-white items-center h-fit w-fit gap-2"
                    >
                      <GiCheckMark className="w-[12px]" />
                      Seleção rápida
                    </button>
                    <button
                      aria-label="delete-all-selections-button"
                      name="delete-all-selections-button"
                      onClick={() => handleSelectAll("delete")}
                      className="bg-brand-theme-100 text-white flex items-center rounded-md w-10 h-10"
                    >
                      <FaRegTrashAlt className="mx-auto hover:text-white font-semibold" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-2 sm:mt-8  justify-between">
            <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-between w-full gap-10 mb-8">
              {numberOfLines.map((e, i: number) => (
                <li key={i} className="max-w-[240px] h-[20%] fade-in">
                  <Ticket
                    currentIndex={i}
                    currentTicketType={selectedTicketType}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:block mt-40 pb-20 ">
          {selectedTicketType && (
            <>
              <TicketCart
                isBuySuccess={isBuySuccess}
                setIsBuySuccess={setIsBuySuccess}
                isReadyForBuy={isCartAvailable}
                amount={ticketPresetAmount}
                ticketType={selectedTicketType && selectedTicketType!}
                integrationData={integrationData}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

const SelectorButton = ({
  amount,
  ticketPresetAmount,
  setTicketPresetAmount,
}: {
  amount: number;
  ticketPresetAmount: number;
  setTicketPresetAmount: Dispatch<SetStateAction<number>>;
}) => {
  const {
    multipleTicketSelections,
    setMultipleTicketSelections,
  }: iTicketContextProps = useContext(TicketContext);

  const handleClick = () => {
    setTicketPresetAmount(amount);
    window.localStorage.setItem("ticketPresetAmount", amount.toString());
    const numberSelectionArrays = Array.from(
      { length: amount },
      (_, index): any => {
        if (multipleTicketSelections[index]) {
          return multipleTicketSelections[index];
        }
        return index > 0 ? [] : multipleTicketSelections[index];
      }
    );
    setMultipleTicketSelections(numberSelectionArrays);
  };

  return (
    <button
      className={`
        rounded-md p-2 text-black
        ${ticketPresetAmount === amount ? "bg-brand-theme-100 text-white" : "hover:bg-brand-theme-100 hover:text-white"}`}
      onClick={handleClick}
    >
      {amount} {amount === 1 ? "Bilhete" : "Bilhetes"}
    </button>
  );
};
