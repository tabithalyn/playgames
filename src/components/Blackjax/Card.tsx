
const cardFaceColor = (props:{
  card: {rank:string; suit:string;};
  hide: boolean;
}) => {
  if (props.card === null) {
    return "text-black";
  }
  if (props.hide) {
    return "text-black";
  }
  switch (props.card.suit) {
    case "❤":
    case "♦":
      return "text-red-500";
    default:
      return "text-black";
  }
}

const Card = (props:{
  card: { rank:string; suit:string; };
  hide: boolean;
}) => {
  const topAndBottom = props.card === null || props.hide ? "" : props.card.rank;
  const middle = props.card === null || props.hide ? "" : props.card.suit;

  const cardClass = topAndBottom !== ""  ? "w-[85px] h-[130px] border-2 border-gray-300 rounded-lg shadow-lg bg-gray-100" : "w-[85px] h-[130px] border-2 border-gray-300 rounded-lg shadow-lg bg-black";

  return (
    <div className={cardClass}>
      <div className="flex flex-col w-full h-full">
        <div className={`flex flex-start text-xl h-[30px] ml-1 ${cardFaceColor}`}>
          <div className={`w-full text-left ml-1 ${props.card.suit === "♥️" || props.card.suit === "♦️" ? "text-red-500" : "text-black"}`}>{topAndBottom}</div>
        </div>
        <div className={`text-5xl h-[60px] mb-2 flex flex-wrap items-center justify-center ${props.card.suit === "♥️" || props.card.suit === "♦️" ? "text-red-500" : "text-black"} text-center`}>
          {middle}
        </div>
        <div className="mr-2 text-xl flex flex-end">
          <div className={`text-right w-full mr-1 ${props.card.suit === "♥️" || props.card.suit === "♦️" ? "text-red-500" : "text-black"}`}>{topAndBottom}</div>
        </div>
      </div>
    </div>
  );
}
 
export default Card;