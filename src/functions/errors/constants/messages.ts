import { Status } from "../types";
import { StatusCodes } from "./status-code";

export const getStatus = (statusCode: number): Status => {
  if (statusCode < 400) {
    return Status.success;
  }

  return statusCode < 500 ? Status.fail : Status.error;
};

export const NFCE_ALREADY_EXISTS = {
  code: 'NFCE_ALREADY_EXISTS',
  message: 'Nfce already exists.',
  statusCode: StatusCodes.CONFLICT,
};

export const ROUTE_NOT_FOUND = {
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.',
  statusCode: StatusCodes.NOT_FOUND,
};
