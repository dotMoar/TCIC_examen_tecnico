interface PostFormProps {
  form: {
    name: string;
    description: string;
  };
  errors: {
    name?: string;
    description?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}