import { Status } from "../types";
import { StatusCodes } from "./status-code";

export const getStatus = (statusCode: number): Status => {
  if (statusCode < 400) {
    return Status.success;
  }

  return statusCode < 500 ? Status.fail : Status.error;
};

export const NFCE_ALREADY_EXISTS = {
  message: "Nfce already exists.",
  statusCode: StatusCodes.CONFLICT,
};

export const ROUTE_NOT_FOUND = {
  message: "The requested endpoint does not exist.",
  statusCode: StatusCodes.NOT_FOUND,
};

export const INTERNAL_ERROR = {
  message: "The server encountered an internal error.",
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
};

export const NFCE_KEY_NOT_PROVIDED = {
  message: "Ncfe key was not provided.",
  statusCode: StatusCodes.BAD_REQUEST,
};