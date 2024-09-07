import type { ObjectLiteral } from "typeorm";
import DebouncedInput from "../DebouncedInput";
import type { Column } from "@tanstack/react-table";

interface Props<T extends ObjectLiteral> {
  column: Column<T, any>;
  columnFilterValue: [number, number];
}

function NumberFilter<T extends ObjectLiteral>({
  column,
  columnFilterValue,
}: Props<T>) {
  return (
    <div className="flex gap-x-1">
      <DebouncedInput
        type="number"
        size={5}
        value={columnFilterValue?.[0] ?? ""}
        placeholder="min"
        onChange={(value) =>
          column.setFilterValue((old: typeof columnFilterValue) => [
            value,
            old?.[1],
          ])
        }
        className="input input-xs text-base-content form-control"
      />
      <DebouncedInput
        type="number"
        size={5}
        value={columnFilterValue?.[1] ?? ""}
        placeholder="max"
        onChange={(value) =>
          column.setFilterValue((old: typeof columnFilterValue) => [
            old?.[0],
            value,
          ])
        }
        className="input input-xs text-base-content form-control"
      />
    </div>
  );
}

export default NumberFilter;
