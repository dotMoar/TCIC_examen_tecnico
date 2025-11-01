export interface ReduxPostStateManage<T> {
    message: string;
    error: boolean | null;
    loading: boolean
    data: T[];
}
