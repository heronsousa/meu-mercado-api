import { BaseError } from './base-error';
import { getStatus, ERROR_GET_NFCE_DATA } from "./constants/messages";

export class ErrorGetNfceDataError extends BaseError {
  constructor() {
    super({
      name: "ErrorGetNfceDataError",
      message: ERROR_GET_NFCE_DATA.message,
      status: getStatus(ERROR_GET_NFCE_DATA.statusCode),
      statusCode: ERROR_GET_NFCE_DATA.statusCode,
    });
  }
}