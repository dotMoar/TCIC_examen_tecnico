export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mt-4 w-full text-center bg-[#FEE2E2] text-[#B91C1C] border border-[#F87171] rounded-md p-2 font-medium shadow-sm animate-fade-in">
        {message || "Ocurrió un error al procesar la acción."}
      </div>
    </div>
  );
};