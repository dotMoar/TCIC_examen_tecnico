import "./App.css";
import { useForm } from "./hooks/useForm";
import { useAppDispatch, useAppSelector } from "./hooks/useSelector";
import { EmptyTable } from "./components/EmptyTable";
import { Palette } from "./components/Palette";
import { useEffect, useState } from "react";
import { createPost, deletePost, fetchPosts } from "./store/post/thunk";
import { LoadingTable } from "./components/LoadingTable";
import { Pagination } from "./components/PaginationTable";

function App() {
  const dispatch = useAppDispatch();
  const { items, loading, error, total, totalPages } = useAppSelector((state) => state.post);

  const { form, handleChange, resetForm, errors, validate } = useForm({
    name: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const _handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const postId = target.id;

    dispatch(deletePost(postId));
  };

  const _handleInsert = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    dispatch(
      createPost({
        title: form.name,
        description: form.description,
        authorId: "autor123",
      }));
    resetForm();
  };

  useEffect(() => {
    dispatch(fetchPosts({ page, limit }));
  }, [dispatch, page]);

  return (
    <>
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
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#40513B] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-3"
        >
          Buscar
        </button>
      </div>

      <div className=" mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-[#EDF1D6] dark:text-[#EDF1D6] table-fixed">
          <thead className="text-xs text-[#EDF1D6] uppercase bg-gray-50 dark:bg-[#609966] dark:text-[#EDF1D6] sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/4 truncate">Nombre</th>
              <th scope="col" className="px-6 py-3 w-2/4 truncate">Descripción</th>
              <th scope="col" className="px-6 py-3 w-1/4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading && <LoadingTable />}
            {items.length === 0 && !loading && <EmptyTable />}
            {items.map((post) => (
              <tr
                key={post.id}
                className={`border-b dark:border-gray-700 hover:bg-[#D8C4B6] ${post.temporary
                  ? "bg-[#FEE2E2] text-[#B91C1C]"
                  : "bg-white dark:bg-[#EDF1D6] text-gray-900 dark:text-[#40513B]"
                  }`}
                style={{ height: "56px" }} // 🔹 fija la altura mínima de la fila
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap truncate max-w-[200px]"
                >
                  {post.title}
                </th>
                <td className="px-6 py-4 truncate max-w-[400px]">{post.description}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    id={post.id}
                    onClick={_handleDelete}
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
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-2 w-full max-w-3xl mx-auto mt-4">
        <div className="flex-1 w-full">
          <input
            type="text"
            id="input-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`flex-1 w-full p-3 text-sm border rounded-lg focus:ring-2 focus:outline-none ${errors.name
              ? "border-red-500 focus:ring-red-400 text-red-700 placeholder-red-400"
              : "text-[#609966] border-[#609966] focus:ring-[#609966]"
              } dark:bg-[#EDF1D6]`}
            placeholder="Nombre..."
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
          )}
        </div>

        <div className="flex-1 w-full">
          <input
            type="text"
            id="input-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`flex-1 w-full p-3 text-sm border rounded-lg focus:ring-2 focus:outline-none ${errors.description
              ? "border-red-500 focus:ring-red-400 text-red-700 placeholder-red-400"
              : "text-[#609966] border-[#609966] focus:ring-[#609966]"
              } dark:bg-[#EDF1D6]`}
            placeholder="Descripción..."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={_handleInsert}
          className="text-white bg-[#40513B] hover:bg-[#609966] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 whitespace-nowrap transition-all"
        >
          Insertar
        </button>
      </div>
      {error && (
        <div className=" mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <div className="mt-4 w-full text-center bg-[#FEE2E2] text-[#B91C1C] border border-[#F87171] rounded-md p-2 font-medium shadow-sm">
            {error || "Ocurrió un error al procesar la acción."}
          </div>
        </div>
      )}
      <Palette />
    </>
  );
}

export default App;
