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
    <div className="flex flex-row justify-center flex-wrap mb-3 mt-auto">
      <div>
        <button onClick={props.onClickHit} className="p-2 border rounded-lg bg-gray-100 m-2 hover:bg-gray-200 transition-all active:bg-gray-300">HIT</button>
        <button onClick={props.onClickStand} className="p-2 border rounded-lg bg-gray-100 m-2 hover:bg-gray-200 transition-all active:bg-gray-300">STAND</button>
      </div>
    </div>
  );
}
 
export default BlackJaxButtons;