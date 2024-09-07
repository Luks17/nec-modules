import { ChildEntity, Column } from "typeorm";
import { Solicitacao } from "../Solicitacao";
import { TiposAuxilios } from "@/lib/enums/Solicitacao";

@ChildEntity(TiposAuxilios["Auxílio Medicamento"])
export class AuxilioMedicamento extends Solicitacao {
  @Column("int")
  vl_auxilio_medicamento: number;
}
