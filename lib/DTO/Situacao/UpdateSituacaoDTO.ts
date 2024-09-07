import type { MoradiaEnum } from "@/lib/enums/Situacao";
import type { RegistrarSituacaoFormData } from "@/lib/ui/forms/registrar-situacao/schema";

export class UpdateSituacaoDTO {
  private constructor(
    public moradia: MoradiaEnum,
    public valor_aluguel: number | undefined,
    public total_adultos: number,
    public total_criancas: number,
    public renda_familiar: number
  ) {}

  public static fromFormData(formData: RegistrarSituacaoFormData) {
    return new this(
      formData.moradia,
      formData.valor_aluguel,
      formData.total_adultos,
      formData.total_criancas,
      formData.renda_familiar
    );
  }
}
