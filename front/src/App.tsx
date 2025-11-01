import { useEffect, useState } from "react";
import "./App.css";
import { AppDispatch } from "./store/store";
import { createPost, deletePostAction } from "./store/post/thunk";
import { useForm } from "./hooks/useForm";
import { useAppDispatch, useAppSelector } from "./hooks/useSelector";

function App() {
  const dispatch = useAppDispatch();
  const { data, loading, error, message } = useAppSelector(
    (state) => state.post
  )

  const { form, handleChange, resetForm } = useForm({
    name: "",
    description: "",
  })


  const insertPost = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      createPost({
        title: form.name,
        description: form.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        isDeleted: false,
        temporary: true,
        id: ""
      })
    )
  }

  const deletePost = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const postId = target.id;

    dispatch(deletePostAction(postId));
  }

  useEffect(() => { console.log(form); }, [form]);
  useEffect(() => { console.log(form); }, [form]);


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
        <table className="min-w-full text-sm text-left text-[#EDF1D6] dark:text-[#EDF1D6]">
          <thead className="text-xs text-[#EDF1D6] uppercase bg-gray-50 dark:bg-[#609966] dark:text-[#EDF1D6] sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.length === 0 && (
                <tr className="bg-white border-b dark:bg-[#EDF1D6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td
                    colSpan={3} // 👈 ocupa las 3 columnas
                    className="px-6 py-8 text-center font-medium text-gray-900 dark:text-[#40513B]"
                  >
                    No hay posts disponibles.
                  </td>
                </tr>
              )}
            {
              data.map((post) => (
                <tr key={post.id} className="bg-white border-b dark:bg-[#EDF1D6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#40513B]"
                  >
                    {post.title}
                  </th>
                  <td className="px-6 py-4 dark:text-[#40513B]">{post.description}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      id={post.id}
                      onClick={deletePost}
                      className="text-white bg-[#40513B] hover:bg-[#609966] focus:ring-2 focus:outline-none font-normal rounded-md text-sm px-3 py-1.5 whitespace-nowrap"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
              )}
          </tbody>
        </table>
      </div >

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-3xl mx-auto mt-4">
        <input
          type="text"
          id="input-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="flex-1 p-3 text-sm text-[#609966] border border-[#609966] rounded-lg dark:bg-[#EDF1D6] dark:border-gray-600 dark:placeholder-[#609966] focus:ring-[#609966] focus:border-[#609966]"
          placeholder="Nombre..."
          required
        />

        <input
          type="text"
          id="input-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="flex-1 p-3 text-sm text-[#609966] border border-[#609966] rounded-lg dark:bg-[#EDF1D6] dark:border-gray-600 dark:placeholder-[#609966] focus:ring-[#609966] focus:border-[#609966]"
          placeholder="Descripción..."
          required
        />

        <button
          type="submit"
          onClick={insertPost}
          className="text-white bg-[#40513B] hover:bg-[#609966] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 whitespace-nowrap"
        >
          Insetar
        </button>
      </div>


      {/* 🎨 Paleta de colores */}
      <div className="grid place-items-center mt-10">
        <div className="grid grid-cols-11 gap-1 p-1">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
            <div key={shade} className={`bg-stone-${shade} h-5 w-5 rounded-sm`} />
          ))}
        </div>

        <div className="grid grid-cols-11 gap-1 p-1">
          {["#213555", "#3E5879", "#D8C4B6", "#F5EFE7"].map((color) => (
            <div key={color} className="h-5 w-5 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className="grid grid-cols-11 gap-1 p-1">
          {["#EDF1D6", "#9DC08B", "#609966", "#40513B"].map((color) => (
            <div key={color} className="h-5 w-5 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
