import type { Column } from "@tanstack/react-table";
import type { ObjectLiteral } from "typeorm";
import DebouncedInput from "../DebouncedInput";

interface Props<T extends ObjectLiteral> {
  column: Column<T, any>;
  columnFilterValue: string;
}

function TextFilter<T extends ObjectLiteral>({
  column,
  columnFilterValue,
}: Props<T>) {
  return (
    <DebouncedInput
      type="text"
      size={10}
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Pesquisar..."
      className="input input-xs text-base-content form-control"
    />
  );
}

export default TextFilter;
