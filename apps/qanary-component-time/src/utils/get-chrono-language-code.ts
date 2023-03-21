import * as chrono from "chrono-node";

export type LanguageCode = "de" | "fr" | "ja" | "pt" | "nl" | "zh" | "ru" | "es";

/**
 * Returns a matching language code, from a given code, in chrono
 * @param languageCode ISO 639-1 language code
 * @see https://en.wikipedia.org/wiki/ISO_639-1
 * @returns a ISO 639-1 language code as string
 */
export const getChronoLanguageCode = (languageCode: string | null): LanguageCode => {
  if (languageCode && Object.hasOwnProperty.call(chrono, languageCode)) {
    return languageCode as LanguageCode;
  }
  return "de";
};
