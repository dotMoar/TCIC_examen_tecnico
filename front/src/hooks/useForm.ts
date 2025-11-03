import { useState, ChangeEvent } from "react";

//Nota: Este hook fue tomado de TocToc hecho por mi y a la vez tomado de un proyecto de Fernando Herrera, perdi la url, lo siento
export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

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

  const validate = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    const fieldsToValidate = ["name", "description"] as (keyof T)[];

    for (const key of fieldsToValidate) {
      const value = form[key];
      if (!value || value.trim() === "") {
        newErrors[key] = "Este campo es obligatorio";
      } else if (value.length < 3) {
        newErrors[key] = "Debe tener al menos 3 caracteres";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    form,
    errors,
    handleChange,
    resetForm,
    setFieldValue,
    validate,
    setForm,
  };
};
