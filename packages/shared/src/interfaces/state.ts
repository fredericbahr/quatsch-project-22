import { ILUBWData } from "./lubw";

/**
 * State that is stored in redis between questions.
 */
export interface IState extends Partial<ILUBWData> {
  /** the latest non fallback intent */
  latestIntent?: string;
}

/**
 * Interface for storing the current state in redis
 */
export interface IStoreState {
  /** the current senderId */
  senderId: string | undefined;
  /** the current non fallback intent */
  intent: string | undefined;
  /** the current lubwData */
  lubwData: Partial<ILUBWData>;
}
