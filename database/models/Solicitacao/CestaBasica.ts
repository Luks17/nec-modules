import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";
import { TiposAuxilios } from "@/lib/enums/Solicitacao";

@ChildEntity(TiposAuxilios["Cesta Básica"])
export class CestaBasica extends Solicitacao {
  @Column("int")
  quantidade_cestas: number;
}
