import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../types/post";
import { fetchHandler } from "../../utils/fetchHelper";
import { ApiError } from "../../types/apiResponse";

const API_URL = "http://localhost:3000/posts";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (_, { rejectWithValue }) => {
    const res = await fetchHandler.get<Post[]>("/posts");
    if (!res.ok) return rejectWithValue(res.error);
    return res.data!;
});

export const createPost = createAsyncThunk<Post, Post, { rejectValue: ApiError }>(
    "posts/create",
    async (newPost, { rejectWithValue }) => {
        const res = await fetchHandler.post<Post>("/posts", newPost);
        if (!res.ok) return rejectWithValue(res.error!);
        return res.data!;
    }
);

export const updatePost = createAsyncThunk("posts/update", async (updated: Post, { rejectWithValue }) => {
    const res = await fetchHandler.put<Post>(`/posts/${updated.id}`, updated);
    if (!res.ok) return rejectWithValue(res.error);
    return res.data!;
});

export const deletePostAction = createAsyncThunk("posts/delete", async (id: string, { rejectWithValue }) => {
    const res = await fetchHandler.delete(`/posts/${id}`);
    if (!res.ok) return rejectWithValue(res.error);
    return id;
});
