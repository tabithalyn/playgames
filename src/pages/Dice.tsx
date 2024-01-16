import { useState } from "react";
import NumberSelector from "../components/Dice/NumberSelector";
import ThemeSwitcher from "../components/ThemeSwitcher";

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
        <div className="w-[100vw] h-[100vh] overflow-hidden bg-[#ecf2eb] dark:bg-[#1f241f] dark:text-[#ecf2eb]">
          <ThemeSwitcher />
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
              className="hover:cursor-pointer w-1/6 shadow-xl rounded-[36px] bg-[#1f241f] dark:invert dark:opacity-70"
              onClick={roleDice}
            />
          </div>
          <div className="w-full flex flex-wrap justify-center py-10 gap-2">
            <button onClick={resetScore} className="py-2 px-6 hover:bg-[#768773] hover:border-[#f3f8f3] transition-all border border-[#a0a6a0] hover:text-[#f3f8f3] dark:bg-[#2e332e] dark:border-[#474e47] dark:text-[#798579] dark:hover:bg-[#3d463d] bg-[#f3f8f3] hover:cursor-pointer">Reset</button>
            <button onClick={() => setShowRules((prev) => !prev)} className="py-2 px-6 hover:bg-[#768773] hover:border-[#f3f8f3] transition-all border border-[#a0a6a0] hover:text-[#f3f8f3] dark:bg-[#2e332e] dark:border-[#474e47] dark:text-[#798579] dark:hover:bg-[#3d463d] bg-[#f3f8f3] hover:cursor-pointer">
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
        <div className="font-inconsolata h-[100vh] max-w-[97vw] flex my-0 mx-auto items-center justify-center">
          <div className="w-3/5 h-3/5 bg-[#ecf2eb]">
          <div>
            <img src="src/assets/dice/dies.png" alt="dies" className="w-[10%]" />
          </div>
          <div>
            <h1 className="text-6xl whitespace-nowrap">Dice Game</h1>
            <button onClick={toggleGamePlay}>Play Now</button>
          </div>
          </div>
        </div>
      )
    }
    </>
  );
}
 
export default Dice;