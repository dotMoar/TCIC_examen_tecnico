export interface Post {
    id: string;
    title: string;
    description: string;
    authorId?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    isDeleted: boolean;
    temporary?: boolean; //TODO: hacer recilente
    loadingDelete?: boolean;
}
