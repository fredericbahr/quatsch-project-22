import { ActionServerApi } from "api";
import { Request, Response } from "express";

/** type of a request from rasa */
export type RasaRequest = Request<never, never, ActionServerApi.CallActionRequest>;

/** type of a general response to rasa */
export type RasaResponse = Response<
  ActionServerApi.CallAction200Response | ActionServerApi.CallAction400Response | ActionServerApi.CallAction500Response
>;

/** type of a success response to rasa */
export type SuccessRasaResponse = ActionServerApi.CallAction200Response;