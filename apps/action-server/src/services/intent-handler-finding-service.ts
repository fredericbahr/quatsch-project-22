import { IIntentHandler, IIntentHandlerMap, ILUBWDefaultDataTime, INTENTS } from "shared";

import { NoIntentHandlerError } from "../errors/NoIntentHandlerError";
import { abstractIntentHandler } from "../resources/measurand/abstract/abstract.intent-handler";
import { thresholdIntentHandler } from "../resources/measurand/threshold/threshold.intent-handler";
import { StoringService } from "./storing-service";

export class IntentHandlerFindingService {
  /** Map of all intent handlers */
  private static intentHandlerMap: IIntentHandlerMap = new Map<INTENTS, IIntentHandler>([
    [INTENTS.ACTION_MEASURAND_COMPLETE, abstractIntentHandler],
    [INTENTS.ACTION_MEASURAND_MAX, abstractIntentHandler],
    [INTENTS.ACTION_MEASURAND_MIN, abstractIntentHandler],
    [INTENTS.ACTION_MEASURAND_THRESHOLD, thresholdIntentHandler],
  ]);

  /**
   * Finds the intent handler for the given intent
   * @param intent intent to find the handler for
   * @returns the intent handler for the given intent or undefined if no handler was found
   */
  public static findIntentHandlerByIntent(intent: INTENTS): IIntentHandler {
    const intentHander: IIntentHandler | undefined = this.intentHandlerMap.get(intent as INTENTS);

    if (!intentHander) {
      throw new NoIntentHandlerError(`No intent handler found for intent ${intent}`);
    }

    return intentHander;
  }

  /**
   * Finds the intent handler for the intent in the state
   * @param senderId the sender id to find the intent in the state
   * @returns tje intent handler for the found intent in the state
   */
  public static async findIntentHandlerInState(senderId: string | undefined): Promise<IIntentHandler> {
    const intent: INTENTS = await this.getIntent(senderId);

    return this.getIntentHandler(intent);
  }

  /**
   * Gets the intent form the state
   * Throws an {@link NoIntentHandlerError} if no intent was found
   * @param senderId the sender id to find the intent
   * @returns the found intent
   */
  private static async getIntent(senderId: string | undefined): Promise<INTENTS> {
    const lastIntent: string | undefined = (await StoringService.getStateEntry(senderId, "latestIntent")) as string;

    if (!lastIntent) {
      throw new NoIntentHandlerError("No intent found");
    }

    return lastIntent as INTENTS;
  }

  /**
   * Finds the intent handler for the given intent
   * Throws an {@link NoIntentHandlerError} if no intent handler was found
   * @param intent intent to find the handler for
   * @returns the intent handler for the given intent or undefined if no handler was found
   */
  private static getIntentHandler(intent: INTENTS): IIntentHandler {
    const intentHander: IIntentHandler | undefined = this.intentHandlerMap.get(intent as INTENTS);

    if (!intentHander) {
      throw new NoIntentHandlerError(`No intent handler found for intent ${intent}`);
    }

    return intentHander;
  }
}
