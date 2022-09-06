export class HttpError extends Error {
  status: string;
  statusCode: number;

  constructor(statusCode: number, status: string) {
    super();
    this.name = 'HttpError';
    this.status = status;
    this.statusCode = statusCode;
  }

}