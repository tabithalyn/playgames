import { useEffect } from "react";

const GameProgButton = (props:{isLastGame:boolean; onClickNext:()=>void}) => {
  useEffect(() => {
    function click(event:KeyboardEvent) {
      if (event.key === "Enter") {
        props.onClickNext();
      } else if (!props.isLastGame && event.key === "n") {
        props.onClickNext();
      } else if (props.isLastGame && event.key === "f") {
        props.onClickNext();
      }
    }
    document.body.addEventListener("keydown", click, { passive: true });
    return () => {
      document.body.removeEventListener("keydown", click, { passive: true });
    }
  }, [props]);

  return (
    <div className="w-full flex justify-center">
      <button onClick={props.onClickNext} className="p-2 border rounded-lg bg-gray-100 m-2 hover:bg-gray-200 transition-all active:bg-gray-300 dark:bg-[#0a0d0a] dark:hover:bg-[#141914] dark:border-gray-900 dark:text-[#929991] dark:hover:border-[#2d3c2d] w-1/6">
        {props.isLastGame ? "FINISH" : "NEXT"}
      </button>
    </div>
  );
}
 
export default GameProgButton;