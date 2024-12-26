export const formattingPrice = (num: number) => {
  const price = num / 100;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
};
