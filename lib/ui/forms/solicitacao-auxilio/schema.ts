import * as yup from "yup";
import { enumValues } from "@/lib/enums/common";
import { TiposAuxilios, TiposProblemas } from "@/lib/enums/Solicitacao";

export const solicitacaoAuxilioSchema = yup.object({
  tipo_problema: yup
    .mixed<TiposProblemas>()
    .oneOf(enumValues(TiposProblemas))
    .required(),
  descricao_problema: yup.string().min(10).required(),
  tipo_auxilio: yup
    .mixed<TiposAuxilios>()
    .oneOf(enumValues(TiposAuxilios))
    .required(),
  qtd_cestas_basica: yup
    .number()
    .positive()
    .integer()
    .when("tipo_auxilio", {
      is: (val: TiposAuxilios) => val === TiposAuxilios["Cesta Básica"],
      then: (schema) => schema.required(),
    }),
  vl_auxilio_medicamento: yup
    .number()
    .positive()
    .when("tipo_auxilio", {
      is: (val: TiposAuxilios) => val === TiposAuxilios["Auxílio Medicamento"],
      then: (schema) => schema.required(),
    }),
  qtd_vagas_creche: yup
    .number()
    .positive()
    .integer()
    .when("tipo_auxilio", {
      is: (val: TiposAuxilios) => val === TiposAuxilios["Vaga para Creche"],
      then: (schema) => schema.required(),
    }),
  qtd_vagas_escola: yup
    .number()
    .positive()
    .integer()
    .when("tipo_auxilio", {
      is: (val: TiposAuxilios) => val === TiposAuxilios["Vaga para Escola"],
      then: (schema) => schema.required(),
    }),
});

export type SolicitacaoAuxilioFormData = yup.InferType<
  typeof solicitacaoAuxilioSchema
>;
