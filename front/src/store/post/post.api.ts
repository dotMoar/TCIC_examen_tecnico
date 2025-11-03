import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreatePostDto, PostsService } from "../../api";
import { FetchPostsParams } from "@/types/fetchPostPaginateParams";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (params: FetchPostsParams = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const response = await PostsService.postsControllerFindAll(
        params.authorId || "",
        params.search,
        params.limit,
        params.page
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener los posts");
    }
  }
);

export const deletePost = createAsyncThunk<
  string,
  string,
  { rejectValue: { id: string; message: string } }
>(
  "posts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await PostsService.postsControllerRemove(id);
      return id;
    } catch (error: any) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (newPost: CreatePostDto, { rejectWithValue }) => {
    try {
      const response = await PostsService.postsControllerCreate(newPost);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al crear el post");
    }
  }
);