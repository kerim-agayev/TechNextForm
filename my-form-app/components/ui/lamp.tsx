"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 py-1 bg-clip-text text-center text-lg font-medium tracking-tight text-transparent"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-30 items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "3rem" }}
          whileInView={{ opacity: 1, width: "6rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 transform -translate-x-1/2 h-10 w-[6rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-10 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-10 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "3rem" }}
          whileInView={{ opacity: 1, width: "6rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 transform -translate-x-1/2 h-10 w-[6rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-10 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-10 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-10 w-full bg-slate-950 blur-sm"></div>
        <div className="absolute top-1/2 z-50 h-10 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-9 w-[6rem] transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-lg"></div>
        <motion.div
          initial={{ width: "2rem" }}
          whileInView={{ width: "4rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-9 w-16 transform -translate-x-1/2 -translate-y-2 rounded-full bg-cyan-400 blur-sm"
        ></motion.div>
        <motion.div
          initial={{ width: "3rem" }}
          whileInView={{ width: "6rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[6rem] transform -translate-x-1/2 -translate-y-4 bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-11 w-full transform -translate-x-1/2 -translate-y-[4rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex translate-y-0 flex-col items-center px-2">
        {children}
      </div>
    </div>
  );
};
