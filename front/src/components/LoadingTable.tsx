import React from "react";

export const LoadingTable = () => {
  // Número de filas simuladas
  const skeletonRows = Array.from({ length: 3 });

  return (
    <>
      {skeletonRows.map((_, index) => (
        <tr
          key={index}
          className="animate-pulse bg-white border-b dark:bg-[#EDF1D6] dark:border-gray-700"
        >
          <td className="px-6 py-4">
            <div className="h-4  w-3/4 mx-auto"></div>
          </td>

          <td className="px-6 py-4">
            <div className="h-4 mx-auto"></div>
          </td>

          <td className="px-6 py-4">
            <div className="h-4 mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
};