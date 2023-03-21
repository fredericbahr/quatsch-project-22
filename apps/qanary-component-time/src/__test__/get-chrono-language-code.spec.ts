import { getChronoLanguageCode, LanguageCode } from "../utils/get-chrono-language-code";

describe("#Component getChronoLanguageCode", () => {
  it("should getChronoLanguageCode find langauge codes", async () => {
    const languageCodes = ["de", "fr", "ja", "pt", "nl", "zh", "ru", "es"];

    for (const languageCode in languageCodes) {
      const chronoLangaugeCode: LanguageCode = getChronoLanguageCode(languageCodes[languageCode]);
      expect(chronoLangaugeCode).toStrictEqual(languageCodes[languageCode]);
    }
  });

  it("should getChronoLanguageCode not find langauge codes", async () => {
    const languageCodes = [null, "mauz"];

    for (const languageCode in languageCodes) {
      const chronoLangaugeCode: LanguageCode = getChronoLanguageCode(languageCodes[languageCode]);
      expect(chronoLangaugeCode).toStrictEqual("de");
    }
  });
});
