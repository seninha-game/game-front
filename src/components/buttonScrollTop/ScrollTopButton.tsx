"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export const ScrollTopButton = () => {
  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const isBrowser = () => typeof window !== "undefined";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsVisible(scrollTop > windowHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={` fixed bottom-5 right-3 bg-brand-yellow-100 bg-opacity-85 text-white px-3 py-3 rounded-3xl z-[1000] opacity-0 transition-opacity duration-300 ${
        isVisible ? " opacity-100 z-[1000] " : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <FaArrowUpLong></FaArrowUpLong>
    </button>
  );
};
