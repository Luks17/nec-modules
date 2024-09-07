import {
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Column, Table } from "@tanstack/react-table";
import type { ObjectLiteral } from "typeorm";
import NumberFilter from "./filters/NumberFilter";
import TextFilter from "./filters/TextFilter";
import EnumFilter from "./filters/EnumFilter";
import CheckboxFilter from "./filters/CheckboxFilter";
import DateRangeFilter from "./filters/DateRangeFilter";

interface Props<T extends ObjectLiteral> {
  table: Table<T>;
  column: Column<T, any>;
}

function FilterContent<T extends ObjectLiteral>({ table, column }: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue() as any;

  function getFilterType() {
    const meta = column.columnDef.meta;
    let content: React.JSX.Element | null = null;
    const props = { column, columnFilterValue };

    if (meta) {
      if (meta.type === "array") {
        content = <CheckboxFilter {...props} />;
      } else if (meta.type === "enum") {
        content = <EnumFilter {...{ ...props, enumToFilter: meta.enum }} />;
      } else if (meta.type === "date") {
        content = <DateRangeFilter {...props} />;
      }
    } else {
      content =
        typeof firstValue === "number" ? (
          <NumberFilter {...props} />
        ) : (
          <TextFilter {...props} />
        );
    }

    return content;
  }

  return (
    <div className="z-10 dropdown-content bg-base-200 p-3 rounded-sm">
      <div className="flex items-center gap-x-1 ">
        <span className="text-base-content py-1 px-2">Organizar</span>
        {!column.getIsSorted() || column.getIsSorted() === "desc" ? (
          <button
            type="button"
            onClick={() => column.toggleSorting(false)}
            className="btn btn-xs"
          >
            <ArrowDownIcon className="w-3" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => column.toggleSorting(true)}
            className="btn btn-xs"
          >
            <ArrowUpIcon className="w-3" />
          </button>
        )}
        <button
          type="button"
          disabled={!column.getIsSorted()}
          onClick={() => column.clearSorting()}
          className="btn btn-xs"
        >
          <XMarkIcon className="w-3" />
        </button>
      </div>
      <FilterContainer>{getFilterType()}</FilterContainer>
    </div>
  );
}

function FilterContainer({ children }: { children: React.ReactNode | null }) {
  if (!children) {
    return null;
  }

  return (
    <>
      <div className="divider my-1"></div>
      <div className="flex flex-col gap-y-2 items-center">
        <span className="text-base-content">Filtrar</span>
        {children}
      </div>
    </>
  );
}

export default FilterContent;
