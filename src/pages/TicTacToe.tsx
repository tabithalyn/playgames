import { MouseEventHandler, useState } from "react";

// REDO ?
// https://github.com/basarat/tic-tac-toe/blob/integration/src/components/Game.tsx ?
// https://codepen.io/angelo_jin/pen/GROEdMK

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xPlayer, setXPlayer] = useState(true);

  function Square({onClick, value}:{onClick:MouseEventHandler<HTMLButtonElement>; value:string|number}) {
    return (
      <button className="border border-gray-700 float-left text-4xl h-24 w-24 p-0 text-center hover:cursor-pointer" onClick={onClick}>
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

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next player: " + (xPlayer ? "X" : "O");
  }

  const restart = () => {
    setXPlayer(true);
    setSquares(Array(9).fill(null));
  }

  const renderSquare = (i:number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  return (
    <div className="w-[99vw] h-[100vh] overflow-hidden bg-red-200 flex flex-wrap justify-center items-center">
      <div className="flex flex-wrap w-[30vw] h-2/3 py-5 justify-center items-center bg-blue-400">
        <div className="mt-2 w-full bg-green-400 p-3">{status}</div>
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
          <button className="py-2 px-4 text-white bg-[#007bff] border border-blue-500 rounded-lg transition-all active:bg-[#0062cc] active:border-blue-600 hover:bg-[#0069d9] hover:border-[#0062cc] focus:shadow-xl mt-2" onClick={restart}>Restart Game!</button>
        </div>
      </div>
    </div>
  );
}
 
export default TicTacToe;