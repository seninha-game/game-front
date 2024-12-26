"use client";
import { seninhaApi } from "@/api/seninhaApi";
import { ITicket } from "@/interfaces/ticket";
import {
        Dispatch,
        SetStateAction,
        createContext,
        useContext,
        useEffect,
        useState,
} from "react";

export type TicketCreationRequestModel = {
  selected_numbers: string | null;
  buy_source: string;
  resale_place_id: string | null;
  owner_id: string | null;
  owner_name: string;
  owner_contact: string;
  payment_type: string;
  ticket_type_id: string;
};

export interface iTicketContextProps {
  multipleTicketSelections: number[][];
  user: {
    wallet: number;
    name: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      wallet: number;
      name: string;
    }>
  >;
  setMultipleTicketSelections: Dispatch<SetStateAction<number[][]>>;
  updateNumberArrayAtIndex: (
    numberArray: number[],
    currentIndex: number
  ) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  ticketBuyRequestToRaffleApi: (
    amount: number,
    selectedType: ITicket
  ) => Promise<boolean>;
}
export const TicketContext = createContext<iTicketContextProps>(
  {} as iTicketContextProps
);
export default function TicketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [multipleTicketSelections, setMultipleTicketSelections] = useState<
    number[][]
  >(() => {
    return [[], [], []];
  });
  const [user, setUser] = useState({
    wallet: 600,
    name: "Felipe Silveira",
  });
  useEffect(() => {
    localStorage.setItem("ticketPresetAmount", "3");
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateNumberArrayAtIndex = (
    numberArray: number[],
    currentIndex: number
  ) => {
    setMultipleTicketSelections((prevState) => {
      let newState = prevState;
      if (currentIndex >= 0 && currentIndex < prevState.length) {
        newState = [...prevState];
        newState[currentIndex] = numberArray;
        return newState;
      }
      return newState;
    });
  };

  const ticketBuyRequestToRaffleApi = async (
    amount: number,
    selectedType: ITicket
  ) => {
    setIsLoading(true);
    let requestBodyWithPayload: TicketCreationRequestModel = {
      selected_numbers: null,
      resale_place_id: null,
      buy_source: "web",
      owner_name: "Felipe Silveira",
      owner_contact: "3399324525",
      owner_id: "26",
      payment_type: "pix",
      ticket_type_id: selectedType.id,
    };
    let responseBoolean = false;
    let payload = multipleTicketSelections;

    await Promise.all(
      payload.map(async (e, i) => {
        requestBodyWithPayload.selected_numbers = payload[i].toString();
        let data = { ...requestBodyWithPayload };

        try {
          const response = await seninhaApi.post("/tickets", data);
          if (response.status === 201) {
            responseBoolean = true;
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } catch (err) {}
      })
    );
    if (responseBoolean) {
      setTimeout(() => {
        setUser((prevUser) => ({
          ...prevUser,
          wallet: prevUser.wallet - amount * selectedType.price,
        }));
      }, 2000);
    }
    return responseBoolean;
  };
  return (
    <TicketContext.Provider
      value={{
        user,
        setUser,
        multipleTicketSelections,
        setMultipleTicketSelections,
        updateNumberArrayAtIndex,
        isLoading,
        setIsLoading,
        ticketBuyRequestToRaffleApi,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export const useTicketContext = () => useContext(TicketContext);
