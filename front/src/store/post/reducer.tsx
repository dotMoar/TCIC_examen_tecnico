import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPost, deletePost, fetchPosts } from "./thunk";
import { ReduxPostStateManage } from "../../types/reduxManage";
import { initialState } from "./initialState";

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.items = action.payload.data; // 👈 los posts
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePost.pending, (state, action) => {
        const id = action.meta.arg;
        const item = state.items.find((p) => p.id === id);
        if (item) item.loadingDelete = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((p) => p.id !== id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        const id = action.meta.arg;
        const item = state.items.find((p) => p.id === id);
        if (item) item.loadingDelete = false;
        state.error = "Error al eliminar el post"; // TODO: revisar porq no funciona action.payload.message
      })

      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;