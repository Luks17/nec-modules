import * as yup from "yup";

export const signupSchema = yup.object({
  nome: yup.string().min(2).required(),
  email: yup.string().email("E-mail com formato incorreto").required(),
  cpf: yup.string().required(),
  phone: yup.string().required(),
  passwd: yup.string().min(6).required(),
  confirmPasswd: yup
    .string()
    .required()
    .oneOf([yup.ref("passwd")], "Senha não é igual"),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;
