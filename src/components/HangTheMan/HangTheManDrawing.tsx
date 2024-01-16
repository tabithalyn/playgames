const HEAD = (
  <div className="w-12 h-12 rounded-full border-4 border-black dark:border-[#909296] absolute top-12 -right-[20px]" />
);

const BODY = (
  <div className="w-1 h-24 bg-black  dark:bg-[#909296] absolute top-24 right-1" />
);

const R_ARM = (
  <div className="w-20 h-1 bg-black  dark:bg-[#909296] absolute top-36 -right-[74px] -rotate-[30deg] origin-bottom-left" />
);
const L_ARM = (
  <div className="w-20 h-1 bg-black  dark:bg-[#909296] absolute top-36 right-1.5 rotate-[30deg] origin-bottom-right" />
);

const R_LEG = (
  <div className="w-24 h-1 bg-black  dark:bg-[#909296] absolute top-[187px] -right-[88px] rotate-[60deg] origin-bottom-left" />
);
const L_LEG = (
  <div className="w-24 h-1 bg-black  dark:bg-[#909296] absolute top-[187px] right-[4px] -rotate-[60deg] origin-bottom-right" />
);

const BODY_PARTS = [HEAD, BODY, R_ARM, L_ARM, R_LEG, L_LEG];

const HangTheManDrawing = ({ numberOfGuesses }: {numberOfGuesses:number}) => {
  return (
    <div className="relative">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="w-1.5 h-12 bg-black dark:bg-[#909296] absolute top-0 right-0" />
      <div className="w-24 h-1.5 bg-black dark:bg-[#909296] ml-24" />
      <div className="w-1.5 h-[360px] bg-black dark:bg-[#909296] ml-[96px]" />
      <div className="h-1.5 w-44 bg-black dark:bg-[#909296] ml-2" />
    </div>
  );
}
 
export default HangTheManDrawing;