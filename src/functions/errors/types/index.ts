export enum Status {
  error = 'error',
  fail = 'fail',
  success = 'success',
}

export interface ErrorInterface {
  message: string;
  status: Status;
  statusCode: number;
}