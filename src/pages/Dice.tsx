import { useState } from "react";
import NumberSelector from "../components/Dice/NumberSelector";

// turn rules into popup modal
// toast to say 'match' or 'not a match' ?
// dice animation (flick through all images before landing on one ?)

const Dice = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  }

  const generateRandomNumber = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const roleDice = () => {
    if (!selectedNumber) {
      setError("No number selected!");
      return;
    }

    const randomNumber = generateRandomNumber(1, 7);
    setCurrentDice(randomNumber);

    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + randomNumber);
    } else {
      setScore((prev) => prev - 2);
    }

    setSelectedNumber(0);
  }

  const resetScore = () => {
    setScore(0);
    setCurrentDice(1);
  }

  return (
    <>
    {
      isGameStarted ? (
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center py-5">
              <h1 className="text-5xl">{score}</h1>
              <p className="text-xl font-bold">Total Score</p>
            </div>
            <NumberSelector
              error={error}
              setError={setError}
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <p className="text-xl">Click on Dice to roll:</p>
            <img
              src={`src/assets/dice/dice_${currentDice}.png`}
              alt="dice"
              className="hover:cursor-pointer w-1/6 shadow-xl rounded-3xl bg-black"
              onClick={roleDice}
            />
          </div>
          <div className="w-full flex flex-wrap justify-center py-10 gap-2">
            <button onClick={resetScore} className="py-4 px-8 hover:bg-gray-300 hover:border-gray-500 transition-all border border-gray-400">Reset</button>
            <button onClick={() => setShowRules((prev) => !prev)} className="py-4 px-8 hover:bg-gray-300 hover:border-gray-500 transition-all border border-gray-400">
              {showRules ? "Hide" : "Show"} Rules
            </button>
          </div>
          {showRules ? (
            <div className="w-2/5 my-0 mx-auto bg-slate-50 p-5 rounded-lg">
              <h2 className="text-2xl">How to play dice game</h2>
              <div className="text-lg mt-6">
                <p>Select any number</p>
                <p>Click on dice image</p>
                <p>
                  After clicking on the dice, if selected number is equal to dice number, you will get same points equivalent to the dice number.
                </p>
                <p>If you get wrong guess then 2 points will be deducted </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="h-[97vh] max-w-[97vw] flex my-0 mx-auto items-center">
          <div>
            <img src="src/assets/dice/dies.png" alt="dies" className="w-3/4" />
          </div>
          <div>
            <h1 className="text-6xl whitespace-nowrap">Dice Game</h1>
            <button onClick={toggleGamePlay}>Play Now</button>
          </div>
        </div>
      )
    }
    </>
  );
}
 
export default Dice;