import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";
import type React from "react";

interface Props {
  register: UseFormRegisterReturn;
  label: string;
  showLabel?: boolean;
  defaultValue?: string | number;
  required?: boolean;
  size?: number;
  placeholder?: string;
  icon?: React.JSX.Element;
  error?: FieldError;
}

export default function TextArea({
  register,
  label,
  showLabel = true,
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
      {icon}
      <textarea
        className={`bg-base-100 textarea textarea-bordered ${error ? "textarea-error" : "textarea-bordered"}`}
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder !== undefined ? placeholder : label}
        rows={3}
        cols={size}
      />

      <Error error={error} />
    </div>
  );
}
