import type { Column } from "@tanstack/react-table";
import type { ObjectLiteral } from "typeorm";

interface Props<T extends ObjectLiteral> {
  column: Column<T, any>;
  columnFilterValue: boolean;
}

function CheckboxFilter<T extends ObjectLiteral>({
  column,
  columnFilterValue,
}: Props<T>) {
  function handleToggle() {
    column.setFilterValue(!columnFilterValue ? true : undefined);
  }

  return (
    <label className="flex gap-x-2">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={columnFilterValue === undefined ? false : true}
      />
      <span className="text-base-content opacity-80">Contém</span>
    </label>
  );
}

export default CheckboxFilter;
