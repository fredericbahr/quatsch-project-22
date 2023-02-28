import { ILUBWData, IState, IStoreState } from "shared";

import { redisClient } from "../redis/redis-client";

/**
 * Service for storing data/state in redis.
 */
export class StoringService {
  /**
   * Stores the current state for the senderId in redis.
   * @param senderId the current senderId
   * @param intent the current non fallback intent
   * @param lubwData the current lubwData
   */
  public static async storeCurrentState({ senderId, intent, lubwData }: IStoreState): Promise<void> {
    if (!senderId) {
      return;
    }

    const currentState: IState | null = await this.getCurrentState(senderId);

    if (!currentState) {
      const state: IState = {
        latestIntent: intent,
        ...lubwData,
      };

      await this.storeState(senderId, state);
      return;
    }

    const newState: IState = {
      ...currentState,
      ...lubwData,
      latestIntent: intent,
    };

    await this.storeState(senderId, newState);
  }

  /**
   * Stores the state for the senderId in redis.
   * @param senderId the current senderId
   * @param state the state to store
   */
  public static async storeState(senderId: string, state: Partial<IState>): Promise<void> {
    await redisClient.set(senderId, JSON.stringify(state));
  }

  /**
   * Gets the current state for the senderId from redis.
   * @param senderId the current senderId
   * @returns the current state for the senderId or null if no state was found
   */
  public static async getCurrentState(senderId: string | undefined): Promise<Partial<IState> | null> {
    if (!senderId) {
      return null;
    }

    const stateInRedis: string | null = await redisClient.get(senderId);

    if (!stateInRedis) {
      return null;
    }

    return JSON.parse(stateInRedis) as Partial<IState>;
  }

  /**
   * Changes one entry of the state for a specific senderId in redis.
   * If no state was found for the senderId, a new state will be created.
   * @param senderId the current senderId
   * @param property the property to change
   * @param value the new value
   */
  public static async changeStateEntry(
    senderId: string | undefined,
    property: keyof IState,
    value: string | undefined,
  ): Promise<void> {
    if (!senderId) {
      return;
    }

    const currentState: IState | null = await this.getCurrentState(senderId);

    if (!currentState) {
      const state: Partial<IState> = {
        [property]: value,
      };
      await this.storeState(senderId, state);
      return;
    }

    const newStateWithData: IState = {
      ...currentState,
      [property]: value,
    };

    await this.storeState(senderId, newStateWithData);
  }

  /**
   * Gets the current state for the senderId from redis.
   * @param senderId the current senderId
   * @param property the property to get
   * @returns the curent value of the property or undefined if no state/property was found
   */
  public static async getStateEntry(senderId: string | undefined, property: keyof IState): Promise<string | undefined> {
    if (!senderId) {
      return undefined;
    }

    const currentState: IState | null = await this.getCurrentState(senderId);

    if (!currentState) {
      return undefined;
    }

    return currentState[property];
  }
}
