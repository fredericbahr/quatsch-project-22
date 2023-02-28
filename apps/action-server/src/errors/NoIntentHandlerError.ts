/**
 * Custom no intent handler error that should be thrown if the latest intent or intent handler can not be found.
 */
export class NoIntentHandlerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoIntentHandlerError";
  }
}
