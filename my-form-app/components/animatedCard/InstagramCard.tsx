"use client";
import React from "react";
import { motion } from "framer-motion";

export function InstagramCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex items-center justify-center w-full h-[50px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-md p-2"
    >
      <div className="flex flex-col items-center justify-center text-center leading-none">
        <span className="text-xs font-medium">You can follow us on</span>
        <span className="text-sm font-bold">Instagram</span>
      </div>
    </motion.div>
  );
}
