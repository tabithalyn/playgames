import { PropsType, getScoreDisplay, judge } from "../../utils/BlackJaxUtils";
import Card from "./Card";
import { Chip } from "@material-ui/core";

const PlayArea = (props:PropsType) => {
  return (
    <>
    <div className="h-full flex flex-wrap items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className={`${props.isTurnOver ? "visible bg-green-600 dark:bg-[#0f2212] dark:border-[#09140a] dark:text-[#9faba4] border border-green-900 py-2 px-3 rounded-full mb-2 -mt-4 h-[42px]" : "hidden border border-green-900 py-2 px-3 rounded-full my-2 h-[42px]"}`}>
          {props.dealersHand.length !== 0 && getScoreDisplay(props.dealersHand)}
        </div>
        <div className="flex flex-wrap justify-center">
          {props.dealersHand.map((card:{ rank: string; suit: string; }, index:number) => {
            const marginLeft = index === 0 ? "ml-0" : "-ml-9";
            const hide = index === 0 && !props.isTurnOver ? true : false;
            return (
              <div key={index} className={`${marginLeft}`}>
                <Card card={card} hide={hide} />
              </div>
            );
          })}
        </div>
      </div>
      <span className="w-full -mb-5 mt-5">
      <hr
        style={{
        background: "#212922",
        height: "1px",
        border: "none",
        width: "100%"
        }}
      />
      </span>
      <div className="flex flex-wrap justify-center items-center mt-10 w-full">
        {props.playersHand.map((card:{ rank: string; suit: string; }, index:number) => {
          return (
            <div key={index} className="flex flex-wrap justify-center">
              <Card card={card} hide={false} />
            </div>
          );
        })}
        <div className="w-full flex justify-center items-center mt-1">
          <span className="bg-green-600 border border-green-900 py-2 px-3 rounded-full my-2 dark:bg-[#0f2212] dark:border-[#09140a] dark:text-[#9faba4]">
            {props.playersHand.length !== 0 ? getScoreDisplay(props.playersHand) : null}
          </span>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center flex-wrap mt-2 mb-10 w-full">
      {props.isTurnOver ? (
        <Chip
          label={judge(props.dealersHand, props.playersHand)}
          style={{
            backgroundColor: "#FFD700",
            padding: "5px",
            color: "black",
            border: "2px solid #FFD700",
            fontWeight: "bold",
            fontSize: "16px",
            opacity: "0.8",
            borderRadius: "20px",
            height: "40px",
            boxShadow: "0px 0px 3px #FFD700"
          }}
        />
      ) : (
        <div className="h-[40px]"></div>
      )}
    </div>
    </>
  );
}
 
export default PlayArea;