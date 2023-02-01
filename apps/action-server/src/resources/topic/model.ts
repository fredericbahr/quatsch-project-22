export enum Topic {
  None = "",
  Air = "air",
}

export interface ITopic {
  label: string;
  id: Topic;
}

export const topicModel: Record<Topic, ITopic> = {
  [Topic.None]: { label: "", id: Topic.None },
  [Topic.Air]: { label: "Luft", id: Topic.Air },
};
