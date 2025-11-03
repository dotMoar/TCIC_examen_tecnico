interface PostTableProps {
  items: Post[];
  loading: boolean;
  onDelete: (e: React.FormEvent) => void;
}