import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { CheckoutFormFields } from "../types/checkout";

interface FormInputProps {
  label: string;
  name: keyof CheckoutFormFields;
  register: UseFormRegister<CheckoutFormFields>;
  error?: FieldError;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
}) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      {...register(name)}
      type={type}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

export default FormInput;
