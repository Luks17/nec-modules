"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FunnelIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactNode, useRef, useState } from "react";
import type { ObjectLiteral } from "typeorm";
import FilterContent from "./table/FilterContent";

interface Props<T extends ObjectLiteral> {
  initialData: T[];
  columns: ColumnDef<T, any>[];
}

function Table<T extends ObjectLiteral>({ initialData, columns }: Props<T>) {
  const modalContainer = useRef<HTMLDialogElement | null>(null);

  const [currentModalTitle, setCurrentModalTitle] = useState("");
  const [currentModalElement, setCurrentModalElement] = useState<ReactNode>([]);

  const [data, _] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  function showModal(
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    element: ReactNode
  ) {
    e.preventDefault();

    setCurrentModalTitle(title);
    setCurrentModalElement(element);

    modalContainer.current!.showModal();
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    meta: { showModal },
  });

  return (
    <>
      <div className="w-full py-12 bg-base-200 rounded-2xl form-control items-center px-2 sm:px-4">
        <div className="overflow-x-auto w-full rounded-sm max-w-full min-h-40">
          <table className="table table-zebra border-neutral border-b">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-secondary text-secondary-content"
                >
                  {headerGroup.headers.map((header) =>
                    header.id !== "actions" ? (
                      <th key={header.id}>
                        <div className="dropdown">
                          <div
                            tabIndex={0}
                            className="cursor-pointer flex gap-x-1"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <FunnelIcon className="w-3" />
                          </div>
                          <FilterContent column={header.column} table={table} />
                        </div>
                      </th>
                    ) : (
                      <th key={header.id}>Ações</th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getPrePaginationRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b-neutral bg-base-300">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="pl-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="border-b-neutral bg-base-300">
                  <td colSpan={table.getFlatHeaders().length}>
                    Nenhum item encontrado!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col-reverse gap-y-4 mt-5 md:grid md:grid-cols-12 items-center md:w-full">
          <button
            type="button"
            disabled={columnFilters.length === 0}
            onClick={() => setColumnFilters([])}
            className="md:col-start-2 2xl:col-start-3 md:col-end-6 btn btn-error btn-outline bg-base-100 w-fit md:w-4/6"
          >
            <TrashIcon className="w-3" />
            Limpar filtros
          </button>
          <div className="join md:col-start-8 md:col-end-10">
            <button
              type="button"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
              className="join-item btn"
            >
              <ChevronDoubleLeftIcon className="w-4" />
            </button>
            <button
              type="button"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className="join-item btn"
            >
              <ChevronLeftIcon className="w-4" />
            </button>
            <button
              type="button"
              className="join-item btn"
            >{`Página ${table.getState().pagination.pageIndex + 1}/${table.getPageCount() === 0 ? 1 : table.getPageCount()}`}</button>
            <button
              type="button"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className="join-item btn"
            >
              <ChevronRightIcon className="w-4" />
            </button>
            <button
              type="button"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className="join-item btn"
            >
              <ChevronDoubleRightIcon className="w-4" />
            </button>
          </div>
        </div>
      </div>
      <dialog ref={modalContainer} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-5">{currentModalTitle}</h3>
          <div className="flex flex-col gap-y-2">{currentModalElement}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">close</button>
        </form>
      </dialog>
    </>
  );
}

export default Table;
