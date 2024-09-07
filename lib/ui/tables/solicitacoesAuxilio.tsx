import type { Solicitacao } from "@/database/models/Solicitacao";
import { findKey } from "@/lib/enums/common";
import {
  EstadosSolicitacao,
  TiposAuxilios,
  TiposProblemas,
} from "@/lib/enums/Solicitacao";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { filterDateRange } from "./filtersFn";

const columnHelper = createColumnHelper<Solicitacao>();

export const columns: ColumnDef<Solicitacao, any>[] = [
  columnHelper.accessor("created_at", {
    header: "Data de criação",
    meta: { type: "date" },
    cell: ({ getValue }) => {
      return format(getValue(), "dd/MM/yyyy - HH:mm");
    },
    filterFn: filterDateRange,
  }),
  columnHelper.accessor("estado", {
    header: "Estado",
    meta: { type: "enum", enum: EstadosSolicitacao },
    cell: (estado) => findKey(EstadosSolicitacao, estado.getValue()),
  }),
  columnHelper.accessor("descriminador", {
    header: "Tipo de auxílio",
    meta: { type: "enum", enum: TiposAuxilios },
    cell: (descriminador) => findKey(TiposAuxilios, descriminador.getValue()),
  }),
  columnHelper.accessor("tipo_problema", {
    header: "Tipo de problema",
    meta: { type: "enum", enum: TiposProblemas },
    cell: (tipo_problema) => findKey(TiposProblemas, tipo_problema.getValue()),
  }),
  columnHelper.accessor("descricao_problema", {
    header: "Descrição do Problema",
    cell: ({ table, getValue, column }) => (
      <button
        type="button"
        className="btn btn-secondary btn-xs btn-outline"
        onClick={(e) =>
          table.options.meta?.showModal(
            e,
            column.columnDef.header as string,
            getValue()
          )
        }
      >
        Visualizar
      </button>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <Link
        className="btn btn-outline btn-xs btn-secondary"
        href={`/dashboard/solicitacao-auxilio/visualizar/${props.row.original.id}`}
      >
        Expandir
      </Link>
    ),
  }),
];
