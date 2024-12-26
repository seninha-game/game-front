import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="border-t-[1px] mt-6 w-full   border-slate-400 flex flex-col"></div>
      <div className="w-full mt-6 py-8">
        <div className="container flex flex-col w-full gap-8 justify-between mb-10">
          <div className="flex flex-wrap items-center text-center text-xs md:text-lg  sm:mx-auto md:p-8 gap-2 my-auto">
            <span className="font-bold">Coringa Games</span>
            <span>CNPJ 00.000.000/0001-00</span>
            <span> ENDEREÇO</span>
            <span>CEP 70070-000 BRASÍLIA DF</span>
          </div>
        </div>
        <div className="container text-xs md:text-lg mx-auto text-slate-600">
          <ul className=" w-full flex justify-between text-center items-center">
            <li>
              <Link href={""}>Política de Privacidade</Link>
            </li>
            <li>
              <Link href={""}>Termos de Uso</Link>
            </li>
            <li>
              <Link href={""}>Suporte</Link>{" "}
            </li>
            <li>
              <Link href={""}>Voltar ao Coringa Games</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
