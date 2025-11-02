import { useState, ChangeEvent } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    const newValue =
      event.target instanceof HTMLInputElement &&
      event.target.type === "checkbox"
        ? event.target.checked
        : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => setForm(initialState);

  return {
    form,
    handleChange,
    resetForm,
    setFieldValue,
    setForm,
  };
};
