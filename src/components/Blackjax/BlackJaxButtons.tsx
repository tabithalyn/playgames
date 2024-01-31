import { useEffect } from "react";

const BlackJaxButtons = (props:{
  onClickHit: () => void;
  onClickStand: () => void;
}) => {
  useEffect(() => {
    function click(event:KeyboardEvent) {
      switch (event.key) {
        case "h":
          props.onClickHit();
          break;
        case "s":
          props.onClickStand();
          break;
        default:
          break;
      }
    }
    document.body.addEventListener("keydown", click, { passive: false });
    return () => {
      document.body.removeEventListener("keydown", click);
    }
  }, [props]);

  return (
    <div className="flex flex-row justify-center flex-wrap mt-auto w-full">
      <div className="w-full flex justify-center">
        <button onClick={props.onClickHit} className="p-2 border rounded-lg bg-gray-100 dark:bg-[#0a0d0a] dark:hover:bg-[#8f7e1b] dark:hover:text-[#0a0d0a] dark:border-gray-900 dark:text-[#929991] dark:hover:border-[#1f2a1f] m-2 hover:bg-gray-200 transition-all active:bg-gray-300 w-1/6">HIT</button>
        <button onClick={props.onClickStand} className="p-2 border rounded-lg bg-gray-100 dark:bg-[#0a0d0a] dark:hover:bg-[#8f7e1b] dark:hover:text-[#0a0d0a] dark:border-gray-900 dark:text-[#929991] dark:hover:border-[#1f2a1f] m-2 hover:bg-gray-200 transition-all active:bg-gray-300 w-1/6">STAND</button>
      </div>
    </div>
  );
}
 
export default BlackJaxButtons;