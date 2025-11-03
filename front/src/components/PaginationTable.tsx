

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!totalPages) return <></>;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md border font-medium transition-colors
          ${currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#40513B] text-white hover:bg-[#609966]"
          }`}
      >
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md border font-medium transition-colors
            ${page === currentPage
              ? "bg-[#609966] text-white border-[#40513B]"
              : "bg-[#EDF1D6] text-[#40513B] border-[#609966] hover:bg-[#9DC08B]"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md border font-medium transition-colors
          ${currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#40513B] text-white hover:bg-[#609966]"
          }`}
      >
        Siguiente
      </button>
    </div>
  );
};