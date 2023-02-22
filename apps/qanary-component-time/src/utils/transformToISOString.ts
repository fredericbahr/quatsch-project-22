import { ParsedComponents } from "chrono-node";

/**
 * Transforms a ParsedComponent to a date string
 * @param parsedComponents the given parsed component
 */
export const transformToISOString = (parsedComponents: ParsedComponents | undefined): string => {
  return parsedComponents?.date().toISOString();
};
