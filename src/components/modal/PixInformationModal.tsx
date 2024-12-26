"use client";
import { ITicket } from "@/interfaces/ticket";
import {
    PixInformationType,
    pixInformationSchema,
} from "@/schemas/pixModalInformation";
import { formatCPF, normalizePhoneNumber } from "@/utils/formatUserInfos";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import PixQrCode from "./RetrievePixQrCode";
export const PixInfoModal = ({
  ticketType,
  ticketAmount,
}: {
  ticketType: ITicket;
  ticketAmount: number;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm<PixInformationType>({
    resolver: zodResolver(pixInformationSchema),
  });

  const [cpf, setCpf] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [qrCode, setQrCode] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCpfChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    setCpf(formatCPF(value));
  };
  const handlePhoneChange = (event: any) => {
    let value = event.target.value;
    setPhoneContact(normalizePhoneNumber(value));
  };
  const submit: SubmitHandler<PixInformationType> = async () => {
    setIsLoading(true);
    const subTotal = ((ticketType.price * ticketAmount) / 100).toString();
    if (isValid) {
      await axios.post(`/api/pix`, { valor: subTotal }).then((res) => {
        if (res.status && res.status === 200) {
          setTimeout(() => {
            setQrCode(res.data.brcode);
            setIsLoading(false);
          }, 2000);
        }
      });
    }
  };
  const inputClass =
    " h-[48px] p-2 rounded w-full border-gray-300 border-[2px] ";
  const fieldsetClass = "relative flex flex-col w-full ";

  return !qrCode ? (
    <div className="">
      <div className="flex justify-between items-center">
        <h4 className="">Informações pessoais</h4>
      </div>

      <form
        className="flex flex-col gap-4 mt-6"
        onSubmit={handleSubmit(submit)}
      >
        <p className="font-bold">Pagamento com pix</p>
        <div className="flex flex-col w-full gap-2 justify-between">
          <fieldset className={fieldsetClass}>
            <label className="w-fit">Nome</label>
            <input
              type="text"
              placeholder="Digitar nome..."
              className={`${inputClass} ${
                errors.name ? "border-red-500" : "border-gray-300"
              }}`}
              {...register("name", { required: true })}
            />{" "}
            {watch("name") && !errors.name && (
              <FaCheck className="absolute right-3 top-[55%] transform  text-green-500" />
            )}
            {errors.name && (
              <span className="text-red-500">
                {errors.name.message as ReactNode}
              </span>
            )}
          </fieldset>

          <fieldset className={fieldsetClass}>
            <label className="w-fit">Email</label>
            <input
              type="text"
              placeholder="Ex: nome@email.com"
              className={inputClass}
              {...register("email", { required: true })}
            />{" "}
            {watch("email") && !errors.email && (
              <FaCheck className="absolute right-3 top-[55%] transform  text-green-500" />
            )}
            {errors.email && (
              <span className="text-red-500">
                {errors.email.message as ReactNode}
              </span>
            )}
          </fieldset>
          <fieldset className={fieldsetClass}>
            <label className="w-fit">CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              className={inputClass}
              maxLength={14}
              value={cpf}
              onInput={handleCpfChange}
              {...register("cpf", { required: true })}
            />
            {errors.cpf && (
              <span className="text-red-500">
                {errors.cpf.message as ReactNode}
              </span>
            )}
            {watch("cpf") && !errors.cpf && (
              <FaCheck className="absolute right-3 top-[55%] transform  text-green-500" />
            )}
          </fieldset>
          <fieldset className={fieldsetClass}>
            <label className="w-fit">Celular</label>
            <input
              type="text"
              maxLength={15}
              placeholder="(DDD) 90000-0000"
              value={phoneContact}
              onInput={handlePhoneChange}
              className={inputClass}
              {...register("contact", { required: true })}
            />
            {errors.contact && (
              <span className="text-red-500">
                {errors.contact.message as ReactNode}
              </span>
            )}
            {watch("contact") && !errors.contact && (
              <FaCheck className="absolute right-3 top-[55%] transform  text-green-500" />
            )}
          </fieldset>
        </div>
        <div className="w-full flex justify-center gap-[10px] md:justify-end">
          <LoadingButton
            disabled={!isValid}
            loading={isLoading}
            startIcon={<IoMdSend />}
            type="submit"
            color="success"
            className="bg-green-700 disabled:text-white disabled:bg-opacity-60 disabled:cursor-not-allowed  hover:bg-green-600 text-white hover:bg-brand-300 px-4 py-2 rounded"
          >
            {" "}
            Pagar com pix
          </LoadingButton>
        </div>
      </form>
    </div>
  ) : (
    <PixQrCode
      qrcode={qrCode}
      ticketAmount={ticketAmount}
      ticketType={ticketType}
    ></PixQrCode>
  );
};
