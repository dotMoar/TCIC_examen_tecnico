export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onReset,
  onEnter,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 w-full max-w-3xl mx-auto">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 ps-10 text-sm text-[#609966] border border-[#609966] rounded-lg dark:bg-[#EDF1D6] dark:border-gray-600 dark:placeholder-[#609966] focus:ring-[#609966] focus:border-[#609966]"
          placeholder="Buscar..."
          value={value}
          onChange={onChange}
          onKeyDown={onEnter}
          name="search"
        />
      </div>
      <button
        type="button"
        onClick={onSearch}
        className="text-white bg-[#40513B] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3"
      >
        Buscar
      </button>
      <button
        type="button"
        onClick={onReset}
        className="text-white bg-[#40513B] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3"
      >
        Reset
      </button>
    </div>
  );
};