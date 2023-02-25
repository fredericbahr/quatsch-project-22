import { IIntentHandler, IIntentHandlerMap, INTENTS } from "shared";

import { measurandAirIntentHandler } from "../resources/measurand/air/measurand-air.intent-handler";

export class IntentHandlerFindingService {
  /** Map of all intent handlers */
  private static intentHandlerMap: IIntentHandlerMap = new Map<INTENTS, IIntentHandler>([
    [INTENTS.ACTION_CONTEXT_AIR_MEASURAND, measurandAirIntentHandler],
  ]);

  /**
   * Finds the intent handler for the given intent
   * @param intent intent to find the handler for
   * @returns the intent handler for the given intent or undefined if no handler was found
   */
  public static findIntentHandler(intent: INTENTS): IIntentHandler {
    const intentHander: IIntentHandler | undefined = this.intentHandlerMap.get(intent as INTENTS);

    if (!intentHander) {
      throw new Error(`No intent handler found for intent ${intent}`);
    }

    return intentHander;
  }
}
