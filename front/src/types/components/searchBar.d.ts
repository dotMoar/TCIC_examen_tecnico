interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
  onReset: (e: React.FormEvent) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}