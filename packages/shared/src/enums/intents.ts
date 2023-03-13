/**
 * Enum for the intents that the webhook receives
 */
export enum INTENTS {
  ACTION_DEFAULT_QANARY = "action_default_qanary",
  ACTION_MEASURAND_COMPLETE = "action_measurand_complete",
  ACTION_MEASURAND_MAX = "action_measurand_max",
  ACTION_MEASURAND_MIN = "action_measurand_min",
  ACTION_MEASURAND_THRESHOLD = "action_measurand_threshold",
  ACTION_MEASURAND_SEASON = "action_measurand_season",
  ACTION_REFINE_MEASURAND = "action_refine_measurand",
  ACTION_REFINE_STATION = "action_refine_station",
  ASK_AFFIRMATION = "action_default_ask_affirmation",
}
