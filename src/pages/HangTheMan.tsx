import { useCallback, useEffect, useState } from "react";
import words from "../data/wordList.json";
import HangTheManWord from "../components/HangTheMan/HangTheManWord";
import HangTheManDrawing from "../components/HangTheMan/HangTheManDrawing";
import Keyboard from "../components/Keyboard";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
}

const HangTheMan = () => {
  const [playWord, setPlayWord] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !playWord.includes(letter)
  );

  const lose = incorrectLetters.length >= 6;
  const win = playWord.split("").every((letter:string) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter:string) => {
    if (guessedLetters.includes(letter) || lose || win) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, win, lose]);

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [addGuessedLetter]);

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setPlayWord(getWord());
    }
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, []);

  const reset = () => {
    setPlayWord(getWord);
    setGuessedLetters([]);
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#eef3f9] flex flex-wrap justify-center items-center font-inconsolata dark:bg-[#0b1523]">
      <div className="w-full flex justify-around items-center">
        <Link to="/" className="text-lg bg-blue-200 p-2 border border-black hover:bg-sky-100 hover:border-gray-400 hover:text-gray-600 dark:bg-gray-600 dark:hover:text-gray-800 dark:hover:border-gray-600 transition-all">&larr; GAMES MENU</Link>
        <ThemeSwitcher moonColor="silver" sunColor="#62808c" />
      </div>
      <div className="flex flex-col gap-1 my-0 mx-auto items-center max-w-[800px] bg-[#fefefe] dark:bg-[#152335] p-5">
      <div className="text-center text-lg">
        {win ? (
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center flex-wrap justify-center p-4 z-20 bg-green-50 bg-opacity-90">
            <p className="opacity-80 bg-opacity-80 w-3/5 h-2/4 bg-green-100 border border-green-400 flex flex-wrap justify-center items-center">
              <span className="w-full h-1/2 text-4xl font-extrabold flex flex-wrap items-center justify-center">
                <span className="w-full">You Win! &#9786;</span>
                <span className="w-full text-2xl font-normal text-center">The word was <b>{playWord}</b>.</span>
              </span>
              <span className="w-full h-1/3 flex justify-center items-center">
                <button className="py-3 px-4 h-1/2 text-xl cursor-pointer border-green-950 border text-green-950 font-bold hover:bg-green-300 transition-all" onClick={reset}>Play Again</button>
              </span>
            </p>
          </div>
        ) : null}
        {lose ? (
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center flex-wrap justify-center p-4 z-20 bg-red-50 bg-opacity-90 dark:bg-red-950 dark:bg-opacity-90">
            <p className="opacity-80 bg-opacity-80 w-3/5 h-2/4 bg-red-100 dark:bg-[#b45353] border dark:border-red-800 border-red-400 flex flex-wrap justify-center items-center">
            <span className="w-full h-1/2 text-4xl font-extrabold flex flex-wrap items-center justify-center">
                <span className="w-full">You Lose! &#9785;</span>
                <span className="w-full text-2xl font-normal text-center">The word was <b>{playWord}</b>.</span>
              </span>
              <span className="w-full h-1/3 flex justify-center items-center">
                <button className="py-3 px-4 h-1/2 text-xl cursor-pointer border-red-950 border text-red-950 font-bold hover:bg-red-300 transition-all" onClick={reset}>Play Again</button>
              </span>
            </p>
          </div>
        ) : null}
      </div>
      <HangTheManDrawing numberOfGuesses={incorrectLetters.length} />
      <HangTheManWord guessedLetters={guessedLetters} playWord={playWord} />
      <div className="align-middle">
        <Keyboard
          disabled={win||lose}
          activeLetters={guessedLetters.filter(letter => playWord.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
    </div>
  );
}
 
export default HangTheMan;