"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Qeydiyyatdan",
      className: "text-blue-500 dark:text-blue-500 text-sm font-Oleo",
    },
    {
      text: "keçdiyiniz",
      className: "text-blue-500 dark:text-blue-500 text-sm font-Oleo",
    },
    {
      text: "üçün",
      className: "text-blue-500 dark:text-blue-500 text-sm font-Oleo",
    },
    {
      text: "təşəkkür",
      className: "text-blue-500 dark:text-blue-500 text-sm font-Oleo",
    },
    {
      text: "edirik.",
      className: "text-blue-500 dark:text-blue-500 text-sm font-Oleo",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem]  ">
    
      <TypewriterEffectSmooth words={words} className=""/>
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div> */}
    </div>
  );
}
