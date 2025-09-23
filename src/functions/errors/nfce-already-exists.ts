import { BaseError } from './base-error';
import { getStatus, NFCE_ALREADY_EXISTS } from './constants/messages';
import { ErrorInterface } from './types';

export class NfceAlreadyExistsError extends BaseError implements ErrorInterface {
  public code = NFCE_ALREADY_EXISTS.code;

  public message = NFCE_ALREADY_EXISTS.message;

  public status = getStatus(NFCE_ALREADY_EXISTS.statusCode);

  public statusCode = NFCE_ALREADY_EXISTS.statusCode;

  constructor() {
    super();
    this.name = 'NfceAlreadyExistsError';
  }
}