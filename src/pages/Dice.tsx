import { useState } from "react";
import NumberSelector from "../components/Dice/NumberSelector";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";

const Dice = () => {
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);

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
      <div className="w-[100vw] h-[100vh] overflow-hidden bg-[#ecf2eb] dark:bg-[#1f241f] dark:text-[#ecf2eb]">
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
        <div className="w-full flex flex-wrap justify-center items-center py-10 gap-3">
          <Link to="/" className="py-2 px-6 hover:bg-[#768773] hover:border-[#f3f8f3] transition-all border border-[#a0a6a0] hover:text-[#f3f8f3] dark:bg-[#2e332e] dark:border-[#474e47] dark:text-[#798579] dark:hover:bg-[#3d463d] bg-[#f3f8f3] hover:cursor-pointer">&larr; Games Menu </Link>
          <button onClick={resetScore} className="py-2 px-6 hover:bg-[#768773] hover:border-[#f3f8f3] transition-all border border-[#a0a6a0] hover:text-[#f3f8f3] dark:bg-[#2e332e] dark:border-[#474e47] dark:text-[#798579] dark:hover:bg-[#3d463d] bg-[#f3f8f3] hover:cursor-pointer">Reset</button>
          <button onClick={() => setShowRules((prev) => !prev)} className="py-2 px-6 hover:bg-[#768773] hover:border-[#f3f8f3] transition-all border border-[#a0a6a0] hover:text-[#f3f8f3] dark:bg-[#2e332e] dark:border-[#474e47] dark:text-[#798579] dark:hover:bg-[#3d463d] bg-[#f3f8f3] hover:cursor-pointer z-50">
            {showRules ? "Hide" : "Show"} Rules
          </button>
          <ThemeSwitcher moonColor="silver" sunColor="#3a4a35" />
        </div>
        {showRules ? (
          <div className="w-[100vw] h-[100vh] absolute top-0 left-0 my-0 mx-auto p-5 rounded-lg flex justify-center items-center bg-[#e0e0e0c1] dark:bg-[#000000be]">
            <div className="w-2/5 h-3/6 bg-slate-50 dark:bg-[#232825] p-4 flex flex-wrap items-center justify-center dark:text-[#939f98]">
              <h2 className="text-2xl text-center font-semibold">How to Play the Dice Game</h2>
              <div className="text-base border p-2 rounded-lg bg-gray-100 dark:bg-[#353c38] dark:border-[#57605b]">
                <p>• Select any number</p>
                <p>• Click on the dice image</p>
                <p className="flex flex-wrap">
                  • After clicking on the dice:
                  <span className="ml-8 w-3/4">- If selected number is EQUAL to dice number, you'll get same points equivalent to the dice number.</span>
                  <span className="ml-8 w-3/4">- If the number is NOT equal, then 2 points will be deducted.</span></p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
 
export default Dice;