import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Memorey from "./pages/Memorey";
import Dice from "./pages/Dice";
import TicTacToe from "./pages/TicTacToe";
import HangTheMan from "./pages/HangTheMan";


function App() {

  // https://github.com/GavinLonDigital/HuntTheAceJSGame
  // https://github.com/WebDevSimplified/War-Card-Game/blob/main/deck.js

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/memorey" element={<Memorey moves={0} bestScore={0} />} />
      <Route path="/dice" element={<Dice />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      {/* <Route path="/wurdel" element={<Wurdel />} /> */}
      <Route path="/hangtheman" element={<HangTheMan />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
