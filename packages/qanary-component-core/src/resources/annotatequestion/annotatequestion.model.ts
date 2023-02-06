import { QanaryComponentApi } from "api";

/** the request handler type of the qanary component core */
export type IQanaryComponentMessageHandler = (
  message: QanaryComponentApi.IQanaryMessage,
) => Promise<QanaryComponentApi.IQanaryMessage>;
