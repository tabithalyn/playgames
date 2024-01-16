import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-wrap justify-center h-[100vh] bg-[#efeef2]">
      <div className="w-2/5 flex flex-wrap items-center justify-center">
        <Link to="/memoree" className="w-full text-4xl font-bold text-center h-1/6 hover:bg-blue-400 transition-all flex flex-wrap items-center justify-center cursor-pointer hover:cursor-pointer"><span className="hover:cursor-pointer cursor-pointer">Memory Game</span></Link>
        <Link to="/dice" className="w-full text-4xl font-bold text-center h-1/6 hover:bg-[#bac8b8] transition-all flex flex-wrap items-center justify-center cursor-pointer hover:cursor-pointer"><span className="hover:cursor-pointer cursor-pointer">Dice Game</span></Link>
        <Link to="/tictactoe" className="w-full text-4xl font-bold text-center h-1/6 hover:bg-[#dd8970] transition-all flex flex-wrap items-center justify-center cursor-pointer hover:cursor-pointer"><span className="hover:cursor-pointer cursor-pointer">Tic Tac Toe</span></Link>
        <Link to="/wurdel" className="w-full text-4xl font-bold text-center h-1/6 hover:bg-[#dd7074] transition-all flex flex-wrap items-center justify-center cursor-pointer hover:cursor-pointer"><span className="hover:cursor-pointer cursor-pointer">Wurdel Game</span></Link>
        <Link to="/hangtheman" className="w-full text-4xl font-bold text-center h-1/6 hover:bg-sky-400 transition-all flex flex-wrap items-center justify-center cursor-pointer hover:cursor-pointer"><span className="hover:cursor-pointer cursor-pointer">Hang The Man</span></Link>
      </div>
    </div>
  );
}
 
export default Main;