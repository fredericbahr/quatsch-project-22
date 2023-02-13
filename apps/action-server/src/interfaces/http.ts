import { ActionServerApi } from "api";
import { Request, Response } from "express";

export type RasaRequest = Request<never, never, ActionServerApi.CallActionRequest>;

export type RasaResponse = Response<
  ActionServerApi.CallAction200Response | ActionServerApi.CallAction400Response | ActionServerApi.CallAction500Response
>;
