"use client";

import { useEffect, useState } from "react";
import type { FieldError } from "react-hook-form";
import Error from "../Error";

interface Props {
  mask: string;
  value: string;
  onChange: Function;
  label: string;
  size?: number;
  icon?: React.JSX.Element;
  placeholder?: string;
  showLabel?: boolean;
  required?: boolean;
  error?: FieldError;
}

function InputMask({
  mask,
  value,
  onChange,
  label,
  icon,
  placeholder,
  size = 30,
  showLabel = true,
  required = true,
  error,
}: Props) {
  const [inputValue, setInputValue] = useState<string>(value);
  const [maskIndex, setMaskIndex] = useState(0);

  function applyMask(newInput: string) {
    if (newInput.length < inputValue.length) {
      setMaskIndex((old) => (old <= 0 ? 0 : old - 1));
      return newInput;
    }

    let maski = maskIndex;
    let maskedNewInput = inputValue;
    const subject = newInput[maski];

    while (/^[\.\-\(\)\+\s]$/.test(mask[maski])) {
      maskedNewInput += mask[maski];
      maski++;
    }
    if (
      (mask[maski] === "a" && /^[a-zA-Z]*$/.test(subject)) ||
      (mask[maski] === "9" && /^[0-9]*$/.test(subject)) ||
      (mask[maski] === "*" && /^[a-zA-Z0-9]*$/.test(subject))
    ) {
      maskedNewInput += subject;
      maski++;
    }

    setMaskIndex(maski);

    return maskedNewInput;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const maskedInput = applyMask(e.currentTarget.value);
    setInputValue(maskedInput);
  }

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <div className="form-control">
      {showLabel && <span>{label + (required ? "*" : "")}</span>}
      <label
        className={`input input-bordered w-fit flex items-center gap-x-2 ${error ? "input-error" : "input-bordered"}`}
      >
        {icon}
        <input
          onChange={handleInputChange}
          className={`bg-base-100 w-full`}
          placeholder={placeholder}
          value={inputValue}
          size={size}
        />
      </label>

      <Error error={error} />
    </div>
  );
}

export default InputMask;
