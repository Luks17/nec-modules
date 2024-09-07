import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";
import type React from "react";

interface Props {
  register: UseFormRegisterReturn;
  label: string;
  showLabel?: boolean;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  size?: number;
  placeholder?: string;
  icon?: React.JSX.Element;
  error?: FieldError;
}

export default function Input({
  register,
  label,
  showLabel = true,
  type = "text",
  defaultValue = undefined,
  required = true,
  size = 30,
  placeholder,
  icon,
  error = undefined,
}: Props) {
  return (
    <div className="form-control">
      {showLabel && <span>{label + (required ? "*" : "")}</span>}
      <label
        className={`input input-bordered w-fit flex items-center gap-x-2 ${error ? "input-error" : "input-bordered"}`}
      >
        {icon}
        <input
          className="bg-base-100"
          {...register}
          defaultValue={defaultValue}
          placeholder={placeholder !== undefined ? placeholder : label}
          size={size}
          type={type}
        />
      </label>

      <Error error={error} />
    </div>
  );
}
