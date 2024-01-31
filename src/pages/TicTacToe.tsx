import { MouseEventHandler, useState } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xPlayer, setXPlayer] = useState(true);

  function Square({onClick, value}:{onClick:MouseEventHandler<HTMLButtonElement>; value:string|number}) {
    return (
      <button className="border border-[#baa64d] dark:border-[#6d694f] dark:bg-[#302e2a] dark:hover:bg-[#282621] bg-[#fffdf6] hover:bg-[#efecde] dark:text-[#817c5f] float-left text-4xl h-24 w-24 p-0 text-center transition-all hover:cursor-pointer" onClick={onClick}>
        {value}
      </button>
    );
  }

  const calculateWinner = (squares:number[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i=0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (i:number) => {
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xPlayer ? "X" : "O";
    setSquares(squares);
    setXPlayer(!xPlayer); 
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) status = `Winner: ${winner}`;

  const restart = () => {
    setXPlayer(true);
    setSquares(Array(9).fill(null));
  }

  const renderSquare = (i:number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  return (
    <div className="w-[99vw] h-[100vh] overflow-hidden dark:bg-[#241f1f] bg-[#f9f6e1] flex flex-wrap justify-center items-start font-inconsolata">
      <div className="w-full flex flex-wrap justify-center items-start">
      <div className="flex flex-wrap w-[30vw] py-5 justify-center items-center">
        <div className="w-full text-center dark:text-[#fffdf6]">{status}</div>
          <div className="mt-2 w-3/4 p-3 flex flex-wrap justify-around">
            <div className={`w-1/3 ${xPlayer === true ? "bg-[#dd8970] border-4 border-[#b7634a] dark:text-[#fffdf6] dark:bg-[#7d260c] dark:border-[#671f09]" : "bg-[#f9f8f3] border-[#f9f8f3] dark:bg-[#363633] dark:border-[#363633]"} ${winner && "bg-[#b7634a]"} text-center text-4xl border-4 py-2`}>X</div>
            <div className={`w-1/3 ${xPlayer === false ? "bg-[#70cfdd] dark:bg-[#2e656d] dark:border-[#234c53] border-4 border-[#49929e] dark:text-[#fffdf6]" : "bg-[#f9f8f3] border-[#f9f8f3] dark:bg-[#363633] dark:border-[#363633]"} ${winner && "bg-[#49929e]"} text-center text-4xl border-4 py-2`}>O</div>
          </div>
          <div className="after:clear-both after:content-none after:table">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="after:clear-both after:content-none after:table">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="after:clear-both after:content-none after:table">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="w-full flex justify-center">
            <button className="py-2 px-4 bg-[#d7d3b5] text-[#68655b] dark:text-[#d5d3ca] dark:bg-[#47453a] border border-[#928754] dark:border-[#37321c] rounded-lg transition-all hover:bg-[#ebe5cb] dark:hover:bg-[#1c1a15] hover:border-[#ebe5cb] dark:hover:border-[#4b4424] hover:text-[#a1966a] dark:hover:text-[#e7dfc1] focus:shadow-xl mt-2" onClick={restart}>Restart Game!</button>
          </div>
          <div className="w-1/2 flex justify-between items-center flex-wrap mt-10 -mb-16">
            <Link to="/" className="py-2 px-4 bg-[#e9e5c7] text-[#807d72] dark:text-[#d5d3ca] dark:bg-[#47453a] border border-[#aea167] dark:border-[#37321c] rounded-lg transition-all hover:bg-[#e9e4cb] dark:hover:bg-[#1c1a15] hover:border-[#e9e4cb] dark:hover:border-[#4b4424] hover:text-[#a8a07e] dark:hover:text-[#e7dfc1] focus:shadow-xl mt-2">&larr; GAMES MENU</Link>
            <ThemeSwitcher moonColor="#b3afa8" sunColor="#47453a" />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default TicTacToe;