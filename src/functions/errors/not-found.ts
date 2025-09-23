import { BaseError } from "./base-error";
import { getStatus, ROUTE_NOT_FOUND } from "./constants/messages";
import { ErrorInterface } from "./types";

export class RouteNotFoundError extends BaseError implements ErrorInterface {
  public code = ROUTE_NOT_FOUND.code;

  public message = ROUTE_NOT_FOUND.message;

  public status = getStatus(ROUTE_NOT_FOUND.statusCode);

  public statusCode = ROUTE_NOT_FOUND.statusCode;

  constructor() {
    super();
    this.name = 'RouteNotFoundError';
  }
}