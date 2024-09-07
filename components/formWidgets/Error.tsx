import type { FieldError } from "react-hook-form";

export default function Error({ error }: { error?: FieldError }) {
  return (
    <>
      {error && <span className="text-error text-sm p-1">{error.message}</span>}
    </>
  );
}
