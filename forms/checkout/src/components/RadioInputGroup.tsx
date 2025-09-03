import React from "react";

interface RadioInputGroupProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

const RadioInputGroup: React.FC<RadioInputGroupProps> = ({
  options,
  value,
  onChange,
}) => (
  <div className="flex flex-col mt-2">
    {options.map((opt) => (
      <label
        key={opt.value}
        className="inline-flex items-center cursor-pointer"
      >
        <input
          type="radio"
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          className="form-radio text-blue-600 h-4 w-4"
        />
        <span className="ml-2 text-gray-700">{opt.label}</span>
      </label>
    ))}
  </div>
);

export default RadioInputGroup;
