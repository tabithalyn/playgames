import { useEffect, useRef, useState } from "react";
import Card from "../components/Memorey/Card";
import ConfettiExplosion from "react-confetti-explosion";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center h-[100vh] bg-indigo-100 dark:bg-[#161729]">
      {(cardIds.length === clearedCards.length) ? (
          <ConfettiExplosion />
        ) : null}
      <div className="flex flex-row justify-center items-center text-2xl w-[600px] m-2 gap-2">
        <div className="flex justify-around w-[800px]">
          <span className="dark:text-[#717382]">Moves: {moves}</span>
          <ThemeSwitcher moonColor="silver" sunColor="#363c5c" />
          {localStorage.getItem("bestScore") ? (
            <span className="dark:text-[#717382]">Best Score: {bestScore}</span>
          ) : null}
        </div>
      </div>
      <div className="grid items-center grid-cols-4 grid-rows-3 gap-2 w-[500px] h-[400px] dark:opacity-50">
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
      <div className="flex flex-wrap justify-around w-3/6">
        <Link to="/" className="w-36 p-2 rounded-lg text-sm text-white border-2 mt-5 font-bold border-black bg-[#363c5c] hover:bg-[#5f6795] hover:border-[#565d8a] dark:bg-[#0d0e16] dark:text-[#5d5e75] dark:border-[#06070a] dark:hover:text-black dark:hover:bg-[#363c5c] dark:hover:border-[#10131c] transition-all tracking-wide flex items-center justify-center">
          &larr; GAMES MENU
        </Link>
        <button onClick={() => {window.location.reload()}} className="w-24 p-2 rounded-lg text-base text-white border-2 mt-5 font-bold border-black bg-[#363c5c] hover:bg-[#5f6795] hover:border-[#565d8a] dark:bg-[#0d0e16] dark:text-[#5d5e75] dark:border-[#06070a] dark:hover:text-black dark:hover:bg-[#363c5c] dark:hover:border-[#10131c] transition-all tracking-wide">
          RESTART
        </button>
      </div>
    </div>
  );
}
 
export default Memorey;