export interface IWinner {
  id: string;
  ticketId: string;
  winning_type: "sena" | "quina" | "quadra";
}

export const WinnerCard = ({
  winner,
  index,
}: {
  winner: IWinner;
  index: number;
}) => {
  let background =
    winner.winning_type === "sena"
      ? `bg-[#fff203] `
      : winner.winning_type === "quina"
        ? `bg-[#54639c] `
        : `bg-[#4f3244] `;
  let sizeStyleConfig =
    winner.winning_type === "sena"
      ? " text-blue-900 text-3xl font-bold text-center"
      : " text-white";
  return (
    <li
      key={index}
      className={
        background +
        sizeStyleConfig +
        " w-72 h-12 shadow-glow flex items-center justify-center bg-no-repeat  rounded-full card "
      }
    >
      <span className="text-white font-bold relative">
        {" "}
        {"Igor Matheus "} - {winner.id.slice(0, 5)} -
        {" " +
          winner.winning_type.charAt(0).toLocaleUpperCase() +
          winner.winning_type.slice(1)}
      </span>
    </li>
  );
};
