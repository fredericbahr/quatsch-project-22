import { INTENTS } from "../enums/intents";
import { SuccessRasaResponse } from "./http";
import { ILUBWData } from "./lubw";

/** the handler type for an intent */
export type IIntentHandler = (lubwData: ILUBWData) => Promise<SuccessRasaResponse>;

/** type of the intent handler map */
export type IIntentHandlerMap = Map<INTENTS, IIntentHandler>;
