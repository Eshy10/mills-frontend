import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInput;
