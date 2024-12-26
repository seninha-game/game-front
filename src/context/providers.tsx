"use-client";

import TicketProvider from "./ticket-context";
import RaffleProvider from "./raffle-context";
export const TicketProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TicketProvider>{children}</TicketProvider>;
};

export const RaffleProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RaffleProvider>{children}</RaffleProvider>;
};
