import { useEffect, useRef, useState } from "react";
import Card from "../components/Memorey/Card";
import ConfettiExplosion from "react-confetti-explosion";

const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
cardIds.sort(() => 0.5 - Math.random());

const Memorey = () => {
  const [moves, setMoves] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    parseInt(localStorage.getItem("bestScore") || "0") || Number.MAX_SAFE_INTEGER
  );
  const [openCards, setOpenCards] = useState<Array<number>>([]);
  const [clearedCards, setClearedCards] = useState<Array<number>>([]);
  const [shouldDisableCards, setShouldDisableCards] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout>(setTimeout(() => {}));

  const handleCardClick = (id:number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, id]);
      setMoves(moves + 1);
      setShouldDisableCards(true);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([id]);
    }
  }

  useEffect(() => {
    const evaluate = () => {
      const [first, second] = openCards;
      setShouldDisableCards(false);
      if ((first % 6 + 1) === (second % 6 + 1)) {
        setClearedCards((prev) => [...prev, first, second]);
        setOpenCards([]);
        return;
      }
      timeout = setTimeout(() => {
        setOpenCards([]);
      }, 700);
    }

    let timeout:NodeJS.Timeout = setTimeout(() => {});
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [openCards]);

  useEffect(() => {
    const finishGameCallback = () => {
      const newBestScore = moves < bestScore ? moves : bestScore;
      setBestScore(newBestScore);
      localStorage.setItem("bestScore", "" + newBestScore);
    }
    
    const checkCompletion = () => {
      if (clearedCards.length === cardIds.length) {
        finishGameCallback();
      }
    }
    checkCompletion();
  }, [bestScore, clearedCards.length, moves]);

  const checkedIsFlipped = (id:number) => {
    return clearedCards.includes(id) || openCards.includes(id);
  }

  const checkIsInactive = (id:number) => {
    return clearedCards.includes(id);
  }

  return (
    <div className="flex flex-col items-center">
      {(cardIds.length === clearedCards.length) ? (
          <ConfettiExplosion />
        ) : null}
      <div className="flex flex-row justify-center items-center text-2xl w-[800px] m-2 gap-2">
        <div className="flex justify-between w-[800px]">
          <span>Moves: {moves}</span>
          {localStorage.getItem("bestScore") ? (
            <span>Best Score: {bestScore}</span>
          ) : null}
          <button onClick={() => {window.location.reload()}} className="w-[100px] h-10 rounded border-none text-lg text-white bg-gray-600">
            RESTART
          </button>
        </div>
      </div>
      <div className="grid items-center grid-cols-4 grid-rows-3 gap-2 w-[500px] h-[400px]">
        {cardIds.map((i:number) => {
          return <Card
            key={i}
            image={`src/assets/memoree/${i % 6 + 1}a.png`}
            onClick={handleCardClick}
            id={i}
            isInactive={checkIsInactive(i)}
            isFlipped={checkedIsFlipped(i)}
            isDisabled={shouldDisableCards}
            cardIds={cardIds}
            clearedCards={clearedCards}
          />
        })}
      </div>
    </div>
  );
}
 
export default Memorey;