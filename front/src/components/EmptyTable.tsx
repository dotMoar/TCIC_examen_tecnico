export const EmptyTable = () => {
  return (
    <tr className="bg-white border-b dark:bg-[#EDF1D6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td
        colSpan={3}
        className="px-6 py-8 text-center font-medium text-gray-900 dark:text-[#40513B]"
      >
        No hay posts disponibles.
      </td>
    </tr>
  );
};
