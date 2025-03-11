type HeaderProps = {
  inputVal: string | undefined;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priVal: number | undefined;
  onPriChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onEnter: () => void;
};

export const Header = ({
  inputVal,
  onInputChange,
  priVal = 1,
  onPriChange,
  onEnter,
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-5 p-5 bg-slate-400 w-full">
      <div>
        <input
          value={inputVal as string}
          onChange={onInputChange}
          className="mr-5"
        />
        <select value={priVal} onChange={onPriChange}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-orange-200 rounded-md p-2"
        onClick={onEnter}
        disabled={inputVal === ""}
      >
        Enter
      </button>
    </div>
  );
};
