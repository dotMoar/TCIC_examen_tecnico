import React from "react";
import { PostRow } from "./PostRow";
import { LoadingTable } from "./LoadingTable";
import { EmptyTable } from "./EmptyTable";
import { Post } from "../types/Post";

export const PostTable: React.FC<PostTableProps> = ({
  items,
  loading,
  onDelete,
}) => {
  return (
    <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left text-[#EDF1D6] dark:text-[#EDF1D6] table-fixed">
        <thead className="text-xs text-[#EDF1D6] uppercase bg-gray-50 dark:bg-[#609966] dark:text-[#EDF1D6] sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/4 truncate">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 w-2/4 truncate">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && <LoadingTable />}
          {!loading && items.length === 0 && <EmptyTable />}
          {!loading &&
            items.map((post) => (
              <PostRow key={post.id} post={post} onDelete={onDelete} />
            ))}
        </tbody>
      </table>
    </div>
  );
};