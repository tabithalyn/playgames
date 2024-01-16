import { CardType } from "../../pages/Memoree";

// Add # of failed
// Add timer ?
// Display both in RESULTS component

const Card = ({ card, flipped, callback }:{
  card: CardType;
  flipped: boolean;
  callback: (card:CardType) => void;
}) => {
  const handleClick = () => {
    if (card.clickable) callback(card);
  }

  return (
    <div className="flex flex-wrap bg-green-200 p-6 w-[12%]" onClick={handleClick}>
      <img
        src={card?.src}
        alt="card front"
        className={`${flipped ? "z-40" : "z-0"} hover:cursor-pointer transition-all w-full`}
        style={{ "backfaceVisibility":"hidden", "transformStyle":"preserve-3d"}}
      />
      <img
        src="src/assets/memoree/back.png"
        alt="card back"
        className={`${flipped ? "z-0" : "z-40"} absolute hover:cursor-pointer w-[7%]`}
      />
    </div>
  );
}
 
export default Card;