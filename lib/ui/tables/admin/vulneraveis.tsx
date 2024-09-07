import type { Usuario } from "@/database/models/Usuario";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

const columnHelper = createColumnHelper<Usuario>();

export const columns: ColumnDef<Usuario, any>[] = [
  columnHelper.accessor("nome", { header: "Nome" }),
  columnHelper.accessor("cpf", { header: "CPF" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("phone", { header: "Telefone" }),
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <div className="flex gap-x-1">
        <Link
          className="btn btn-outline btn-xs btn-secondary"
          href={`/dashboard/administrar-vulneraveis/situacao/visualizar/${props.row.original.id}`}
        >
          Situação
        </Link>
        <Link
          className="btn btn-outline btn-xs btn-secondary"
          href={`/dashboard/administrar-vulneraveis/solicitacoes-auxilio/listar/${props.row.original.id}`}
        >
          Solicitações
        </Link>
      </div>
    ),
  }),
];
