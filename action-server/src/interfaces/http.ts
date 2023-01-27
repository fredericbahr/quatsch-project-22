/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { RasaAction } from "./action";
import { Annotation } from "./annotation";
import { IEvent } from "./event";

interface IButton {
  /** The text on the button */
  title: string;
  /** Payload which is sent if the button is pressed */
  payload: string;
}

export type IResponse = IBasicResponse | ICustomProperties;

export interface IBasicResponse {
  /** The text which should be uttered. */
  text: string;
  /** Array of buttons */
  buttons?: IButton[];
  elements?: any[];
  custom?: object;
  image?: string;
  attachment?: string;
  /** Name of the template */
  template?: string;
  /** Name of the response */
  response_name?: string;
}

interface ICustomProperties {
  /** Keyword argument to fill the template */
  [key: string]: string;
}

export type RasaRequest = Request<never, never, RasaAction>;

export interface IRasaResponseBody {
  events: Array<any>;
  responses: Array<IResponse>;
}

export type RasaResponse = Response<IRasaResponseBody>;

export type AnnotationResponse = Response<Annotation>;
