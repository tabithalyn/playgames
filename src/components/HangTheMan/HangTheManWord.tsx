type HangTheManWordType = {
  guessedLetters: string[];
  playWord: string;
  reveal?: boolean;
}

const HangTheManWord = ({
  guessedLetters,
  playWord
}:HangTheManWordType) => {
  return (
    <div className="flex gap-1 text-5xl font-bold uppercase mt-2 mb-4 dark:text-[#9a9ca0]">
      {playWord.split("").map((letter, index) => (
        <span className="mx-1" key={index}>
          {guessedLetters.includes(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
}
 
export default HangTheManWord;