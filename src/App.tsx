import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Memorey from "./pages/Memorey";
import Dice from "./pages/Dice";
import TicTacToe from "./pages/TicTacToe";
import HangTheMan from "./pages/HangTheMan";
import Blackjax from "./pages/Blackjax";


function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/memorey" element={<Memorey />} />
      <Route path="/dice" element={<Dice />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/blackjax" element={<Blackjax />} />
      <Route path="/hangtheman" element={<HangTheMan />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
