import { BaseError } from './base-error';
import { getStatus, NFCE_ALREADY_EXISTS } from "./constants/messages";

export class NfceAlreadyExistsError extends BaseError {
  constructor() {
    super({
      name: "NfceAlreadyExistsError",
      message: NFCE_ALREADY_EXISTS.message,
      status: getStatus(NFCE_ALREADY_EXISTS.statusCode),
      statusCode: NFCE_ALREADY_EXISTS.statusCode,
    });
  }
}