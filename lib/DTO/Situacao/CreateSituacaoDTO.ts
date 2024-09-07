import type { MoradiaEnum } from "@/lib/enums/Situacao";
import type { RegistrarSituacaoFormData } from "@/lib/ui/forms/registrar-situacao/schema";

export class CreateSituacaoDTO {
  private constructor(
    public usuario_id: string,
    public moradia: MoradiaEnum,
    public valor_aluguel: number | undefined,
    public total_adultos: number,
    public total_criancas: number,
    public renda_familiar: number
  ) {}

  public static fromFormData(
    formData: RegistrarSituacaoFormData,
    usuario_id: string
  ) {
    return new this(
      usuario_id,
      formData.moradia,
      formData.valor_aluguel,
      formData.total_adultos,
      formData.total_criancas,
      formData.renda_familiar
    );
  }
}
