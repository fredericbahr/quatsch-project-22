import { INTENTS } from "shared";

import { NoIntentHandlerError } from "../../errors/no-intent-handler-error";
import { IntentHandlerFindingService } from "../intent-handler-finding-service";
import { StoringService } from "../storing-service";

jest.mock("../storing-service", () => ({
  StoringService: {
    getStateEntry: jest.fn(),
  },
}));

describe("Intent Handler Finding Service", () => {
  const senderId = "senderId";

  describe("findIntentHandlerByIntent", () => {
    const intent = INTENTS.ACTION_MEASURAND_COMPLETE;

    it("should return the intent handler for the given intent", () => {
      const intentHandler = IntentHandlerFindingService.findIntentHandlerByIntent(intent);

      expect(intentHandler).toEqual(expect.any(Function));
    });

    it("should throw an error if no intent handler was found", () => {
      expect(() => IntentHandlerFindingService.findIntentHandlerByIntent("invalidIntent" as INTENTS)).toThrowError();
      expect(() => IntentHandlerFindingService.findIntentHandlerByIntent("invalidIntent" as INTENTS)).toThrow(
        NoIntentHandlerError,
      );
    });
  });

  describe("findIntentHandlerInState", () => {
    it("should return the intent handler for the intent in the state", async () => {
      (StoringService.getStateEntry as jest.Mock) = jest.fn().mockResolvedValue(INTENTS.ACTION_MEASURAND_COMPLETE);

      const intentHandler = await IntentHandlerFindingService.findIntentHandlerInState(senderId);

      expect(intentHandler).toEqual(expect.any(Function));
    });

    it("should throw an error if no intent was found", async () => {
      (StoringService.getStateEntry as jest.Mock) = jest.fn().mockResolvedValue(undefined);

      await expect(IntentHandlerFindingService.findIntentHandlerInState(senderId)).rejects.toThrowError();
      await expect(IntentHandlerFindingService.findIntentHandlerInState(senderId)).rejects.toThrow(
        NoIntentHandlerError,
      );
    });

    it("should throw an error if no intent handler was found", async () => {
      (StoringService.getStateEntry as jest.Mock) = jest.fn().mockResolvedValue(INTENTS.ACTION_DEFAULT_QANARY);

      await expect(IntentHandlerFindingService.findIntentHandlerInState(senderId)).rejects.toThrowError();
      await expect(IntentHandlerFindingService.findIntentHandlerInState(senderId)).rejects.toThrow(
        NoIntentHandlerError,
      );
    });
  });
});
