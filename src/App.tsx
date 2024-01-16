import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Memoree from "./pages/Memoree";
import Dice from "./pages/Dice";
import TicTacToe from "./pages/TicTacToe";
import Wurdel from "./pages/Wurdel";
import HangTheMan from "./pages/HangTheMan";


function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/memoree" element={<Memoree />} />
      <Route path="/dice" element={<Dice />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/wurdel" element={<Wurdel />} />
      <Route path="/hangtheman" element={<HangTheMan />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
