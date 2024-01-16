const NumberSelector = ({
  setError, error, setSelectedNumber, selectedNumber
} : {
  setError: (error:string) => void;
  error: string;
  selectedNumber: number;
  setSelectedNumber: (value:number) => void;
}) => {
  const diceNumber = [1, 2, 3, 4, 5, 6];

  const handleNumberSelector = (value:number) => {
    setSelectedNumber(value);
    setError("");
  }
  return (
    <div className="flex flex-wrap justify-center">
      <p className="text-red-700 w-full text-center py-2">{error}</p>
      <p className="w-full text-center">Select a Number:</p>
      <div>
        <ul className="flex flex-wrap w-full justify-center">
        {diceNumber.map((value, i) => (
          <li
            key={i}
            className={`h-16 w-16 border border-[#738373] dark:border-[#232b23] hover:text-[#3d4a3d] grid place-items-center text-xl font-extrabold hover:cursor-pointer transition-all active:bg-black active:text-white hover:border-2 ${value === selectedNumber ? "bg-[#899a86] dark:bg-[#365439] text-white dark:hover:text-[#dae1d9]" : "text-black bg-white dark:bg-[#2e332e] dark:text-[#e4ece3] dark:hover:bg-[#474e47]"}`}
            onClick={() => handleNumberSelector(value)}
          >{value}</li>
        ))}
        </ul>
      </div>
    </div>
  );
}
 
export default NumberSelector;