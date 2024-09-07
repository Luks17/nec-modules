"use client";

import { useEffect, useRef, useState } from "react";

export default function MultiInput({
  value,
  onChange,
  onBlur,
  label,
  required = true,
}: {
  value: string[];
  onChange: Function;
  onBlur: Function;
  label: string;
  required?: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>(value);
  const inputContainer = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange(chips);
  }, [chips]);

  function addChip(value: string) {
    value = value.trim();

    if (value !== "" && !chips.includes(value)) {
      setChips([...chips, value]);
    }

    setInputValue(" ");
  }

  function handleComponentClick() {
    inputContainer.current!.focus();
    onBlur();
  }

  function handleMenuClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const target = e.currentTarget.value;
    inputContainer.current!.focus();

    addChip(target);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleInputSpecialKeys(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    if (key === "Backspace" && inputValue.length === 0) {
      setChips(chips.slice(0, -1));
    } else if (key === "Enter") {
      e.preventDefault();
      addChip(inputValue);
    }
  }

  function handleMenuSpecialKeys(e: React.KeyboardEvent<HTMLButtonElement>) {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();

      const target = e.currentTarget.value;
      inputContainer.current!.focus();

      addChip(target);
    }
  }

  function handleDelete(chipIndex: number) {
    const updatedChips = chips.filter((_, i) => i !== chipIndex);
    setChips(updatedChips);
  }

  return (
    <label className="form-control">
      <span className="mb-1">{label + (required ? "*" : "")}</span>
      <div className="dropdown static">
        <div
          onClick={handleComponentClick}
          className="input cursor-text input-bordered h-fit p-3 flex flex-wrap w-72 gap-x-0.5 items-center overflow-hidden"
        >
          {chips.map((chip, i) => (
            <div key={i} className="badge badge-secondary px-3 py-4">
              <span>{chip}</span>
              <div
                onClick={() => handleDelete(i)}
                className="ml-1 cursor-pointer focus:outline-none"
              >
                x
              </div>
            </div>
          ))}
          <input
            ref={inputContainer}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputSpecialKeys}
            size={inputValue.length + 1}
            className="bg-transparent w-fit"
          />
        </div>

        <ul className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <button
              value="Covid"
              onClick={handleMenuClick}
              onKeyDown={handleMenuSpecialKeys}
            >
              Covid
            </button>
          </li>
          <li>
            <button
              value="Dengue"
              onClick={handleMenuClick}
              onKeyDown={handleMenuSpecialKeys}
            >
              Dengue
            </button>
          </li>
        </ul>
      </div>
    </label>
  );
}
