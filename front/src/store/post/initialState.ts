import { Post } from "../../types/Post";
import { ReduxPostStateManage } from "../../types/reduxManage";

export const initialState: ReduxPostStateManage<Post> = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};