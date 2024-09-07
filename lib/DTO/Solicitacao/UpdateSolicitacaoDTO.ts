import type { TiposAuxilios, TiposProblemas } from "@/lib/enums/Solicitacao";
import type { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";

export class UpdateSolicitacaoDTO {
  private constructor(
    public descriminador: TiposAuxilios,
    public tipo_problema: TiposProblemas,
    public descricao_problema: string,
    public numero_vagas_creche?: number,
    public numero_vagas_escola?: number,
    public quantidade_cestas?: number,
    public vl_auxilio_medicamento?: number
  ) {}

  static async fromFormData(data: SolicitacaoAuxilioFormData) {
    return new this(
      data.tipo_auxilio,
      data.tipo_problema,
      data.descricao_problema,
      data.qtd_vagas_creche,
      data.qtd_vagas_escola,
      data.qtd_cestas_basica,
      data.vl_auxilio_medicamento
    );
  }
}
