import NumberTicker from "@/components/magicui/number-ticker";

export const NumberTickerDemo = () => {
  return (
    <p className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={100} />
    </p>
  );
};


