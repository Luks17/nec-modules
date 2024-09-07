import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  passwd: yup.string().required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
