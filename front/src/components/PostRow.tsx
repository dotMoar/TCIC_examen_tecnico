import React from "react";

export const PostRow: React.FC<PostRowProps> = ({ post, onDelete }) => {
  return (
    <tr
      key={post.id}
      className={`border-b dark:border-gray-700 hover:bg-[#D8C4B6] ${post.temporary
          ? "bg-[#FEE2E2] text-[#B91C1C]"
          : "bg-white dark:bg-[#EDF1D6] text-gray-900 dark:text-[#40513B]"
        }`}
      style={{ height: "56px" }}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap truncate max-w-[200px]"
      >
        {post.title}
      </th>

      <td className="px-6 py-4 truncate max-w-[400px]">
        {post.description}
      </td>

      <td className="px-6 py-4 text-center">
        <button
          type="button"
          id={post.id}
          onClick={onDelete}
          disabled={post.loadingDelete}
          className={`text-white font-normal rounded-md text-sm px-3 py-1.5 whitespace-nowrap focus:ring-2 focus:outline-none min-w-[100px] text-center transition-all duration-200 ${post.loadingDelete
              ? "bg-[#A7A7A7] text-[#E8E8E8] cursor-not-allowed opacity-70"
              : "bg-[#40513B] hover:bg-[#609966]"
            }`}
        >
          {post.loadingDelete ? "Eliminando..." : "Eliminar"}
        </button>
      </td>
    </tr>
  );
};