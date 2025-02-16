import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number;
  }
  
  const InputField = ({ 
    label, 
    type, 
    value, 
    onChange, 
    required, 
    minLength 
  }: InputFieldProps) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
          required={required}
          minLength={minLength}
        />
      </div>
    );
  };
  
  export default InputField;