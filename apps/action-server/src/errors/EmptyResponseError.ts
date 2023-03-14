/**
 * Custom empty response error that should be thrown if the response is empty.
 */
export class EmptyResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmptyResponseError";
  }
}
