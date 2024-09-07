import type { Row } from "@tanstack/react-table";
import {
  isWithinInterval,
  parse,
  parseISO,
  setHours,
  setMinutes,
} from "date-fns";

export function filterDateRange(
  row: Row<any>,
  columnId: string,
  filterValue: string
) {
  if (!filterValue[0] || !filterValue[1]) return true;

  return isWithinInterval(parseISO(row.getValue(columnId)), {
    start: setMinutes(
      setHours(parse(filterValue[0], "yyyy-MM-dd", new Date()), 0),
      0
    ),
    end: setMinutes(
      setHours(parse(filterValue[1], "yyyy-MM-dd", new Date()), 23),
      59
    ),
  });
}
