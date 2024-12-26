"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoMdLogIn } from "react-icons/io";
import logo from "../../../public/logo.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-[#070B28] text-white font-normal h-[9dvh] z-20">
      <div className="w-full mx-auto  flex justify-between container px-4 text-xs lg:text-base">
        <Link className="h-fit my-auto w-20" href="https://coringagames.com/">
          <Image
            src={logo}
            alt="logo-company"
            className="flex items-center h-fit justify-center"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-4">
          <Link className="p-1 hover:text-brand-yellow-100" href="/bilhetes">
            HOME
          </Link>
          <GoDotFill />
          <Link className="p-1 hover:text-brand-yellow-100" href="/sobre">
            SOBRE
          </Link>
          <GoDotFill />
          <Link className="p-1 hover:text-brand-yellow-100" href="/jogos">
            JOGOS
          </Link>
          <GoDotFill />
          <Link className="p-1 hover:text-brand-yellow-100" href="/contato">
            ENTRE EM CONTATO
          </Link>
        </nav>
        <div className="hidden sm:flex gap-6 text-brand-yellow-100 items-center">
          {/* <button className="flex gap-2 items-center">
            <IoMdLogIn className="w-6 h-6" /> LOGIN
          </button>
          <button className="flex gap-2 items-center">
            <BsPersonAdd className="w-6 h-6" />
            REGISTRO
          </button> */}
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-brand-yellow-100">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden absolute top-[9dvh] fade-in-fast left-0 w-full bg-[#070B28] text-white">
          <div className="w-full border-t border-white border-opacity-50"></div>
          <nav className="flex flex-col items-center gap-4 p-4">
            <Link className="p-1 hover:text-brand-yellow-100" href="/bilhetes">
              HOME
            </Link>
            <Link className="p-1 hover:text-brand-yellow-100" href="/sobre">
              SOBRE
            </Link>
            <Link className="p-1 hover:text-brand-yellow-100" href="/jogos">
              JOGOS
            </Link>
            <Link className="p-1 hover:text-brand-yellow-100" href="/contato">
              ENTRE EM CONTATO
            </Link>
            <div className="w-full border-t border-white border-opacity-50"></div>
            <div className="flex w-full pt-6 justify-around">
              {" "}
              <button
                className="flex gap-2 items-center text-brand-yellow-100"
                onClick={toggleMenu}
              >
                <IoMdLogIn className="w-6 h-6" /> LOGIN
              </button>
              <button
                className="flex gap-2 items-center text-brand-yellow-100"
                onClick={toggleMenu}
              >
                <BsPersonAdd className="w-6 h-6" />
                REGISTRO
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
