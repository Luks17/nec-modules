import { validateRequest } from "@/lib/auth/Session";
import type { TiposAuxilios, TiposProblemas } from "@/lib/enums/Solicitacao";
import { ServerError } from "@/lib/error/ServerError";
import type { SolicitacaoAuxilioFormData } from "@/lib/ui/forms/solicitacao-auxilio/schema";
import { generateId } from "lucia";
import type { NextRequest } from "next/server";

export class CreateSolicitacaoDTO {
  private constructor(
    public id: string,
    public usuario_id: string,
    public descriminador: TiposAuxilios,
    public tipo_problema: TiposProblemas,
    public descricao_problema: string,
    public numero_vagas_creche?: number,
    public numero_vagas_escola?: number,
    public quantidade_cestas?: number,
    public vl_auxilio_medicamento?: number
  ) {}

  static async fromFormData(data: SolicitacaoAuxilioFormData) {
    const { user } = await validateRequest();

    if (!user) {
      throw new ServerError("NO_AUTH", "Not a valid session!");
    }

    return new this(
      generateId(36),
      user.id,
      data.tipo_auxilio,
      data.tipo_problema,
      data.descricao_problema,
      data.qtd_vagas_creche,
      data.qtd_vagas_escola,
      data.qtd_cestas_basica,
      data.vl_auxilio_medicamento
    );
  }

  static async fromRequest(request: NextRequest) {
    const { user } = await validateRequest();

    if (!user) {
      throw new ServerError("NO_AUTH", "Not a valid session!");
    }

    const data: SolicitacaoAuxilioFormData = await request.json();
    return await this.fromFormData(data);
  }
}
