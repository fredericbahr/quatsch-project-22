import { ILUBWData, ILUBWDataKey } from "shared";

import { redisClient } from "../../redis/redis-client";
import { StoringService } from "../storing-service";

jest.mock("../../redis/redis-client", () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

describe("Storing Service", () => {
  const senderId = "senderId";
  const intent = "intent";
  let lubwData: Partial<ILUBWData> = {};

  describe("storeCurrentState", () => {
    it("should not store anything if no senderId is given", async () => {
      await StoringService.storeCurrentState({ senderId: undefined, intent, lubwData });

      expect(redisClient.set).not.toHaveBeenCalled();
    });

    it("should get the current state if a senderId is given", async () => {
      await StoringService.storeCurrentState({ senderId, intent, lubwData });

      expect(redisClient.get).toHaveBeenCalledWith(senderId);
    });

    it("should create a new state if no state was found", async () => {
      lubwData = {
        station: "station",
        measurand: "measurand",
      };

      await StoringService.storeCurrentState({ senderId, intent, lubwData });

      expect(redisClient.set).toHaveBeenCalledWith(senderId, JSON.stringify({ latestIntent: intent, ...lubwData }));
    });

    it("should update the state if a state was found", async () => {
      lubwData = {
        station: "new-station",
      };

      const currentState = {
        latestIntent: "old-intent",
        station: "old-station",
        measurand: "old-measurand",
      };

      (redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(currentState));

      await StoringService.storeCurrentState({ senderId, intent, lubwData });

      expect(redisClient.set).toHaveBeenCalledWith(
        senderId,
        JSON.stringify({
          latestIntent: "intent",
          station: "new-station",
          measurand: "old-measurand",
        }),
      );
    });
  });

  describe("storeState", () => {
    it("should store the state for the senderId", async () => {
      await StoringService.storeState(senderId, lubwData);

      expect(redisClient.set).toHaveBeenCalledWith(senderId, JSON.stringify(lubwData));
    });
  });

  describe("getCurrentState", () => {
    it("should return null if no senderId is given", async () => {
      const state = await StoringService.getCurrentState(undefined);

      expect(state).toBeNull();
    });

    it("should return null if no state was found", async () => {
      (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

      const state = await StoringService.getCurrentState(senderId);

      expect(state).toBeNull();
    });

    it("should return the state if a state was found", async () => {
      (redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(lubwData));

      const state = await StoringService.getCurrentState(senderId);

      expect(state).toEqual(lubwData);
    });
  });

  describe("changeStateEntry", () => {
    it("should not change anything if no senderId is given", async () => {
      await StoringService.changeStateEntry(undefined, ILUBWDataKey.Station, "value");

      expect(redisClient.set).not.toHaveBeenCalled();
    });

    it("should get the current state if a senderId is given", async () => {
      await StoringService.changeStateEntry(senderId, ILUBWDataKey.Station, "value");

      expect(redisClient.get).toHaveBeenCalledWith(senderId);
    });

    it("should create a new state if no state was found", async () => {
      await StoringService.changeStateEntry(senderId, ILUBWDataKey.Station, "value");

      expect(redisClient.set).toHaveBeenCalledWith(senderId, JSON.stringify({ station: "value" }));
    });

    it("should update the state if a state was found", async () => {
      const currentState = {
        station: "old-station",
        measurand: "old-measurand",
      };

      (redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(currentState));

      await StoringService.changeStateEntry(senderId, ILUBWDataKey.Station, "value");

      expect(redisClient.set).toHaveBeenCalledWith(
        senderId,
        JSON.stringify({ station: "value", measurand: "old-measurand" }),
      );
    });
  });

  describe("getStateEntry", () => {
    it("should return undefined if no senderId is given", async () => {
      const stateEntry = await StoringService.getStateEntry(undefined, ILUBWDataKey.Station);

      expect(stateEntry).toBeUndefined();
    });

    it("should return undefined if no state was found", async () => {
      (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

      const stateEntry = await StoringService.getStateEntry(senderId, ILUBWDataKey.Station);

      expect(stateEntry).toBeUndefined();
    });

    it("should return the state entry if a state was found", async () => {
      lubwData = {
        station: "station",
      };

      (redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(lubwData));

      const stateEntry = await StoringService.getStateEntry(senderId, ILUBWDataKey.Station);

      expect(stateEntry).toEqual(lubwData.station);
    });
  });
});
