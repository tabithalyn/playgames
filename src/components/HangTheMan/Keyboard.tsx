const KEYS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

type KeyboardType = {
  disabled?: boolean;
  addGuessedLetter: (letter:string) => void;
  activeLetters: string[];
  inactiveLetters: string[];
}

const Keyboard = ({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false
}:KeyboardType) => {
  
  return (
    <div className="flex flex-wrap w-full justify-center gap-2">
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`
            xs:w-[9%] sm:w-[8%] md:w-[6%] lg:w-[6%] border-2 border-black bg-none text-3xl uppercase p-1 font-bold cursor-pointer text-black 
            ${isActive ? "bg-sky-600 text-white" : ""} 
            ${isInactive ? "opacity-40" : "bg-sky-50"} hover:bg-sky-400 disabled:hover:bg-sky-600 disabled:hover:cursor-default
            `}
            disabled={isInactive||isActive||disabled}
            key={key}
          >
            {key}
          </button>
        )
      })}
    </div>
  );
}
 
export default Keyboard;