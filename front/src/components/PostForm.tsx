import React from "react";

export const PostForm: React.FC<PostFormProps> = ({
  form,
  errors,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row items-start gap-2 w-full max-w-3xl mx-auto mt-4"
    >
      <div className="flex-1 w-full">
        <input
          type="text"
          id="input-name"
          name="name"
          value={form.name}
          onChange={onChange}
          className={`flex-1 w-full p-3 text-sm border rounded-lg focus:ring-2 focus:outline-none ${errors.name
              ? "border-red-500 focus:ring-red-400 text-red-700 placeholder-red-400"
              : "text-[#609966] border-[#609966] focus:ring-[#609966]"
            } dark:bg-[#EDF1D6]`}
          placeholder="Nombre..."
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500 font-medium">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex-1 w-full">
        <input
          type="text"
          id="input-description"
          name="description"
          value={form.description}
          onChange={onChange}
          className={`flex-1 w-full p-3 text-sm border rounded-lg focus:ring-2 focus:outline-none ${errors.description
              ? "border-red-500 focus:ring-red-400 text-red-700 placeholder-red-400"
              : "text-[#609966] border-[#609966] focus:ring-[#609966]"
            } dark:bg-[#EDF1D6]`}
          placeholder="Descripción..."
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500 font-medium">
            {errors.description}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-[#40513B] hover:bg-[#609966] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 whitespace-nowrap transition-all"
      >
        Insertar
      </button>
    </form>
  );
};