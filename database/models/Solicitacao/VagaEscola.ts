import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";
import { TiposAuxilios } from "@/lib/enums/Solicitacao";

@ChildEntity(TiposAuxilios["Vaga para Escola"])
export class VagaEscola extends Solicitacao {
  @Column("int")
  numero_vagas_escola: number;
}
