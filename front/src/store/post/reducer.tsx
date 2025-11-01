import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { createPost, deletePostAction } from "./thunk";
import { ApiError } from "../../types/apiResponse";

export const postSlice = createSlice({
	name: "posts",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createPost.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
			const apiError = action.payload as ApiError | undefined;
			state.message = apiError?.message || action.error.message || "Error desconocido";
		});

		builder.addCase(createPost.pending, (state, action) => {
			state.loading = true;
			state.error = false;
			state.message = "Creando post...";

			// 👇 Aquí puedes acceder al objeto que estás enviando al thunk
			const newPost = action.meta.arg;
			state.data = [
				...state.data,
				{
					...newPost,
					id: "temp-" + crypto.randomUUID(),
				},
			];

		});

		builder.addCase(deletePostAction.pending, (state, action) => {
			state.loading = true;
			state.error = false;
			state.message = "";

			const idToDelete = action.meta.arg;

			state.data = state.data.filter((post) => post.id !== idToDelete)
		});

		builder.addCase(deletePostAction.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
			state.message = action.error.message || "Error desconocido";

		});
	},
});

export const { } = postSlice.actions;
export default postSlice.reducer;
