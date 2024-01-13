import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-wrap justify-center h-[90vh]">
      <div className="w-2/5 flex flex-wrap items-center justify-center">
        <Link to="/memoree" className="w-full text-4xl font-bold text-center border-white border h-1/6 hover:border-b hover:border-b-blue-500 transition-all flex flex-wrap items-center justify-center"><span>Memory Game</span></Link>
        <Link to="/dice" className="w-full text-4xl font-bold text-center border-white border h-1/6 hover:border-b hover:border-b-blue-500 transition-all flex flex-wrap items-center justify-center"><span>Dice Game</span></Link>
        <Link to="/tictactoe" className="w-full text-4xl font-bold text-center border-white border h-1/6 hover:border-b hover:border-b-blue-500 transition-all flex flex-wrap items-center justify-center"><span>Tic Tac Toe</span></Link>
        <Link to="/wurdel" className="w-full text-4xl font-bold text-center border-white border h-1/6 hover:border-b hover:border-b-blue-500 transition-all flex flex-wrap items-center justify-center"><span>Wurdel Game</span></Link>
        <Link to="/hangtheman" className="w-full text-4xl font-bold text-center border-white border h-1/6 hover:border-b hover:border-b-blue-500 transition-all flex flex-wrap items-center justify-center"><span>Hang The Man</span></Link>
      </div>
    </div>
  );
}
 
export default Main;