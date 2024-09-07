import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";
import { TiposAuxilios } from "@/lib/enums/Solicitacao";

@ChildEntity(TiposAuxilios["Vaga para Creche"])
export class VagaCreche extends Solicitacao {
  @Column("int")
  numero_vagas_creche: number;
}
