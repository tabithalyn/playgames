import { useState } from "react";

// https://github.com/devression/hangman-game-js

// USE RANDOM WORD API
// https://random-word-api.herokuapp.com/home

const HangTheMan = () => {
  const [winCount, setWinCount] = useState(0);
  const [count, setCount] = useState(0);
  const [chosenWord, setChosenWord] = useState("");

  // https://github.com/devression/hangman-game-js/blob/main/script.js

  return (
    <>
    <div className="container">
      <div className="options-container"></div>
      <div id="user-input-section"></div>
      <canvas id="canvas"></canvas>
      <div id="new-game-container" className="new-game-popup hide">
        <div id="result-text"></div>
        <button id="new-game-button">New Game</button>
      </div>
    </div>
    </>
  );
}
 
export default HangTheMan;