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

    const newStateWithData: IState = this.addLUBWData(currentState, lubwData);
    const newStateWithIntent: IState = this.addIntent(newStateWithData, intent);

    await this.storeState(senderId, newStateWithIntent);
  }

  /**
   * Stores the state for the senderId in redis.
   * @param senderId the current senderId
   * @param state the state to store
   */
  public static async storeState(senderId: string, state: IState): Promise<void> {
    await redisClient.set(senderId, JSON.stringify(state));
  }

  /**
   * Gets the current state for the senderId from redis.
   * @param senderId the current senderId
   * @returns the current state for the senderId or null if no state was found
   */
  public static async getCurrentState(senderId: string | undefined): Promise<IState | null> {
    if (!senderId) {
      return null;
    }

    const stateInRedis: string | null = await redisClient.get(senderId);

    if (!stateInRedis) {
      return null;
    }

    return JSON.parse(stateInRedis) as IState;
  }

  /**
   * Adds the lubwData to the current state.
   * @param currentState the current state
   * @param lubwData the lubwData to add
   * @returns the new state
   */
  private static addLUBWData(currentState: IState, lubwData: Partial<ILUBWData>): IState {
    return {
      ...currentState,
      ...lubwData,
    };
  }

  /**
   * Adds the intent to the current state.
   * @param currentState the current state
   * @param intent the intent to add
   * @returns the new state
   */
  private static addIntent(currentState: IState, intent: string | undefined): IState {
    return {
      ...currentState,
      latestIntent: intent,
    };
  }
}
