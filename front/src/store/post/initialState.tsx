import { Post } from "../../types/post";
import { ReduxPostStateManage } from "../../types/reduxManage";

export const initialState: ReduxPostStateManage<Post> = {
    message: "",
    error: null,
    loading: false,
    data: [] as Post[],
};