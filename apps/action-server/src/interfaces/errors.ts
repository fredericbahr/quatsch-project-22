/** Action execution was rejected. This is the same as returning an `ActionExecutionRejected` event */
export interface ClientError {
  /** Name of the action which rejected its execution */
  action_name: string;
  /** The error message. */
  error: string;
}

/** The action server encountered an exception while running the action */
export interface ServerError {
  /** Json body of the incoming request that resulted in the error */
  request_body: object;
  /** The error message */
  error: string;
}
