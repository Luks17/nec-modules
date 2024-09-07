import { QueryFailedError } from "typeorm";
import { ServerError } from "./ServerError";
import { logger } from "../logger";

export function mapAndTraceError(e: any) {
  let msg = "Erro Interno do Servidor";

  if (e instanceof QueryFailedError) {
    if (e.driverError.code === "ER_DUP_ENTRY") msg = "Erro: Entidade já existe";
  } else if (e instanceof ServerError) {
    if (e.code === "INV_PASSWD" || e.code === "INV_USER")
      msg = "Erro: Usuário ou Senha Inválido";
    else if (e.code === "NO_AUTH")
      msg = "Erro: Você não tem autorização para acessar esse recurso";
    else if (e.code === "NOT_FOUND") msg = "Erro: Recurso não encontrado";
  }

  logger.error(e.toString() + " | Sent Client Error: '" + msg + "'");

  return {
    success: false,
    data: {
      message: msg,
    },
  };
}
