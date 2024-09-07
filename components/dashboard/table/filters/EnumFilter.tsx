import type { Column } from "@tanstack/react-table";
import type { ObjectLiteral } from "typeorm";
import { enumEntries } from "@/lib/enums/common";

interface Props<T extends ObjectLiteral, U extends Record<string, string>> {
  column: Column<T, any>;
  columnFilterValue: string;
  enumToFilter: U;
}

function EnumFilter<T extends ObjectLiteral, U extends Record<string, string>>({
  column,
  columnFilterValue,
  enumToFilter,
}: Props<T, U>) {
  const entries = enumEntries(enumToFilter);
  const options = [{ key: "Tudo", value: "" }, ...entries];

  return (
    <>
      <select
        value={columnFilterValue ?? ""}
        onChange={(e) => column.setFilterValue(e.currentTarget.value)}
        className="select select-xs select-secondary select-bordered text-secondary w-full max-w-xs"
      >
        {options.map((item, i) => (
          <option key={i} value={item.value}>
            {item.key}
          </option>
        ))}
      </select>
    </>
  );
}

export default EnumFilter;
