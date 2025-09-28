import { ErrorInterface, Status } from "./types";

type BaseErrorParams = {
  name: string;
  message: string;
  status: Status;
  statusCode: number;
};

export class BaseError extends Error implements ErrorInterface {
  public status: Status;
  public statusCode: number;

  constructor({ name, message, status, statusCode }: BaseErrorParams) {
    super(message);
    this.name = name;
    this.status = status;
    this.statusCode = statusCode;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
