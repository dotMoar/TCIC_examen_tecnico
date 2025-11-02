import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostsService } from "../../api";
import { FetchPostsParams } from "../../types/fetchPostPaginateParams";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (params: FetchPostsParams = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const response = await PostsService.postsControllerFindAll(
        params.authorId,
        params.limit,
        params.page
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener los posts");
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await PostsService.postsControllerRemove(id);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al eliminar el post");
    }
  }
);