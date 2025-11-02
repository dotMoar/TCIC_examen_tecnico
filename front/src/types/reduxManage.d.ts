export interface ReduxPostStateManage<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}