import { BaseError } from "./base-error";
import { getStatus, ROUTE_NOT_FOUND } from "./constants/messages";

export class RouteNotFoundError extends BaseError {
  constructor() {
    super({
      name: "RouteNotFoundError",
      message: ROUTE_NOT_FOUND.message,
      status: getStatus(ROUTE_NOT_FOUND.statusCode),
      statusCode: ROUTE_NOT_FOUND.statusCode,
    });
  }
}