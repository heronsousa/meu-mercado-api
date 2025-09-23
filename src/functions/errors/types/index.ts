export enum Status {
  error = 'error',
  fail = 'fail',
  success = 'success',
}

export interface ErrorInterface {
  code: string;
  message: string;
  status: Status;
  statusCode: number;
}