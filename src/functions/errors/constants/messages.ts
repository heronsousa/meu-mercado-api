import { Status } from "../types";
import { StatusCodes } from "./status-code";

export const getStatus = (statusCode: number): Status => {
  if (statusCode < 400) {
    return Status.success;
  }

  return statusCode < 500 ? Status.fail : Status.error;
};

export const NFCE_ALREADY_EXISTS = {
  message: "A NFC-e já existe.",
  statusCode: StatusCodes.CONFLICT,
};

export const ROUTE_NOT_FOUND = {
  message: "O endpoint solicitado não existe.",
  statusCode: StatusCodes.NOT_FOUND,
};

export const INTERNAL_ERROR = {
  message: "O servidor encontrou um erro interno..",
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
};

export const NFCE_KEY_NOT_PROVIDED = {
  message: "A chave da NFC-e não foi fornecida.",
  statusCode: StatusCodes.BAD_REQUEST,
};

export const ERROR_GET_NFCE_DATA = {
  message: "Erro ao buscar dados da nota fiscal.",
  statusCode: StatusCodes.BAD_GATEWAY,
};