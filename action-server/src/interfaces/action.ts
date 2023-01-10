import { IEvent } from "./event";

/** Slot values */
interface ISlot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/** parsed entity */
interface IEntity {
  /** char offset of the start */
  start: number;
  /** char offset of the end */
  end: number;
  /** found value for entity */
  value: string;
  /** type of the entity */
  entity: string;
  /** confidence for found entity */
  confidence: number;
}

/** intent of the text */
interface IMessageIntent {
  /** name of the intent */
  name: string;
  /** confidence for found intent */
  confidence: number;
}

interface ILatestMessage {
  /** parsed entities */
  entities: IEntity[];
  /** intent of the text */
  intent: IMessageIntent;
  /** scores of all intents */
  intent_ranking: IMessageIntent[];
  /** text of the message */
  text: string;
}

interface ILatestAction {
  /** latest action name */
  action_name: string;
  /** text of last bot utterance */
  action_text: string;
}

interface IActiveLoop {
  /** name of the active loop */
  name: string;
}

/** conversation tracker which stores the conversation state. */
interface ITracker {
  /** ID of the conversation */
  conversation_id: string;
  /** Slot values */
  slots: ISlot;
  /** NLU parser information. If set, message will not be passed through NLU, but instead this parsing information will be used. */
  latest_message: ILatestMessage;
  /** Most recent event time */
  latest_event_time: number;
  /** Deterministic scheduled next action */
  followup_action: string;
  /** Bot is paused */
  paused: boolean;
  /** Event history */
  events: IEvent[];
  /** Communication channel */
  latest_input_channel: string;
  /** Name of last bot action */
  latest_action_name: string;
  /** Latest bot action */
  latest_action: ILatestAction;
  /** Name of the active loop */
  active_loop: IActiveLoop;
}

interface IConfig {
  /** Store all entites as slot when found */
  store_entities_as_slots: boolean;
}

interface IDomainIntent {
  [key: string]: {
    /** Use entities for this intent */
    use_entities: boolean;
  };
}

interface IDomainSlot {
  [key: string]: {
    auto_fill: boolean;
    initial_value: string | null;
    type: string;
    values: string[];
  };
}

interface IResponse {
  [key: string]: Array<{ text: string }>;
}

interface IDomain {
  /** Addional option */
  config: IConfig;
  /** All intent names and properties */
  intents: IDomainIntent[];
  /** All entity names */
  entities: string[];
  /** Slot names and configuration */
  slots: IDomainSlot;
  /** Bot response templates */
  respones: IResponse;
  /** Available action names */
  actions: string[];
}

export interface RasaAction {
  /** The name of the action which should be executed */
  next_action: string;
  /** Unique id of the user who is having the current conversation */
  sender_id: string;
  /** Conversation tracker which stores the conversation state */
  tracker: ITracker;
  /** The bot's domain */
  domain: IDomain;
}
