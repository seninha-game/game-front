"use client";
import { ITicket } from "@/interfaces/ticket";
import { formatCurrency } from "@/utils/formatCurrency";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQRCode } from "next-qrcode";
export default function PixQrCode({
  ticketAmount,
  ticketType,
  qrcode,
}: {
  ticketAmount: number;
  ticketType: ITicket;
  qrcode: string;
}) {
  const { Image } = useQRCode();
  const subTotal = ((ticketType.price * ticketAmount) / 100).toString();
  return (
    <div>
      <h1 className="text-sm md:text-3xl">Solicitação realizada!</h1>{" "}
      <div className="flex flex-col gap-2 text-sm md:text-lg mt-8 mb-16">
        <span>
          Quantidade de bilhetes: <span>{ticketAmount}</span>
        </span>
        <span>Preço por unidade: {formatCurrency(ticketType.price / 100)}</span>
        <span className="font-bold">
          Total: {formatCurrency(parseInt(subTotal))}
        </span>
      </div>
      <div className="flex flex-col items-center text-center">
        {" "}
        <span className="font-bold text-lg">
          Seu pagamento está pendente.
        </span>{" "}
        <span>
          Escaneie o seguinte QrCode em seu aplicativo de preferência para
          realizar o pix!
        </span>
        <div className="flex items-center mt-4 justify-center">
          <Image
            text={qrcode}
            options={{
              type: "image/jpeg",
              quality: 0.3,
              errorCorrectionLevel: "M",
              margin: 0,
              scale: 4,
            }}
          />
        </div>
      </div>
      <div className=" mt-6 mb-6 break-all">
        <p className="">Pix copia e cola:</p>
        <div className="p-1 border-[1px] border-black rounded-lg">
          <span className="text-xs ">{qrcode}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="w-fit">Aguardando confirmação </span>
        <LoadingButton loading className="w-fit"></LoadingButton>
      </div>
    </div>
  );
}
