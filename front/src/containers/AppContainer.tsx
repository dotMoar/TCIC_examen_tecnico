import React, { useEffect, useState } from "react";

import { Palette, ErrorBanner, PostForm, Pagination, PostTable, SearchBar } from "@/components";
import { useAppDispatch, useAppSelector, useForm } from "@/hooks";
import { createPost, deletePost, fetchPosts } from "@/store";

export const AppContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, totalPages } = useAppSelector((state) => state.post);

  const { form, handleChange, resetForm, errors, validate } = useForm({
    name: "",
    description: "",
    search: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (form.search.trim() === "") return;
    setPage(1);
    dispatch(fetchPosts({ page: 1, limit, search: form.search }));
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(fetchPosts({ page: 1, limit, search: form.search }));
    }
  };

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const postId = target.id;
    dispatch(deletePost(postId));
  };

  const handleInsert = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    dispatch(
      createPost({
        title: form.name,
        description: form.description,
        authorId: "autor123",
      })
    );
    resetForm();
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    resetForm();
    setPage(1);
    dispatch(fetchPosts({ page: 1, limit }));
  };

  useEffect(() => {
    dispatch(fetchPosts({ page, limit }));
  }, [dispatch, page]);

  return (
    <>
      <SearchBar
        value={form.search}
        onChange={handleChange}
        onSearch={handleSearch}
        onReset={handleReset}
        onEnter={handleEnter}
      />
      <PostTable items={items} loading={loading} onDelete={handleDelete} />
      <div className="flex justify-center items-center h-[48px] mt-3">
        {totalPages! > 1 ? (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        ) : (
          <div className="h-[32px]" />
        )}
      </div>
      <PostForm form={form} errors={errors} onChange={handleChange} onSubmit={handleInsert} />
      <ErrorBanner message={error} />
      <Palette />
    </>
  );
};