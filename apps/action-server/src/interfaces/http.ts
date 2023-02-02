import { Request, Response } from "express";
import { actionServerApi } from "api";

export type RasaRequest = Request<never, never, actionServerApi.CallActionRequest>;

export type RasaResponse = Response<
  actionServerApi.CallAction200Response | actionServerApi.CallAction400Response | actionServerApi.CallAction500Response
>;
