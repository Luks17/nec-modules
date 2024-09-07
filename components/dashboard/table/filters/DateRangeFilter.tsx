import type { Column } from "@tanstack/react-table";
import type { ObjectLiteral } from "typeorm";

interface Props<T extends ObjectLiteral> {
  column: Column<T, any>;
  columnFilterValue: string;
}

function DateRangeFilter<T extends ObjectLiteral>({
  column,
  columnFilterValue,
}: Props<T>) {
  return (
    <div className="flex gap-x-2">
      <label className="flex flex-col gap-y-1">
        <span className="text-base-content text-center">Início</span>
        <input
          className="form-control text-secondary"
          value={columnFilterValue?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: typeof columnFilterValue) => [
              e.target.value,
              old?.[1],
            ])
          }
          type="date"
        />
      </label>
      <label className="flex flex-col gap-y-1">
        <span className="text-base-content text-center">Fim</span>
        <input
          className="form-control text-secondary"
          value={columnFilterValue?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: typeof columnFilterValue) => [
              old?.[0],
              e.target.value,
            ])
          }
          type="date"
        />
      </label>
    </div>
  );
}

export default DateRangeFilter;
