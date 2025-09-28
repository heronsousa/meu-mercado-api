import { BaseError } from './base-error';
import { getStatus, NFCE_KEY_NOT_PROVIDED } from "./constants/messages";

export class NfceKeyNotProvidedError extends BaseError {
  constructor() {
    super({
      name: "NfceKeyNotProvidedError",
      message: NFCE_KEY_NOT_PROVIDED.message,
      status: getStatus(NFCE_KEY_NOT_PROVIDED.statusCode),
      statusCode: NFCE_KEY_NOT_PROVIDED.statusCode,
    });
  }
}