type CardProps = {
  image: string;
  onClick: (id:number) => void;
  id: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
  cardIds: Array<number>;
  clearedCards: Array<number>;
}

const Card = (props:CardProps) => {
  const backSide = "src/assets/memoree/back.png";

  const handleClick = () => {
    !props.isFlipped && !props.isDisabled && props.onClick(props.id);
  }

  return (
    <div className={`rounded-lg w-full h-[93%] ${(props.clearedCards.length === props.cardIds.length) ? "bg-indigo-200 dark:bg-[#2f3038]" : "bg-[#717daf] dark:bg-[#0c0c0c]"}`}>
      <div
        className={`${props.isInactive ? "opacity-0 cursor-default" : ""} relative cursor-pointer w-full h-full`}
        onClick={handleClick}
      >
        <div className={`absolute w-full h-full ${props.isFlipped ? "z-0" : "z-50"}`} style={{ backfaceVisibility: "hidden" }}>
          <img src={backSide} alt="card backside" />
        </div>
        <div className="absolute w-full h-full">
          <img src={props.image} alt="card" />
        </div>
      </div>
    </div>
  );
}
 
export default Card;