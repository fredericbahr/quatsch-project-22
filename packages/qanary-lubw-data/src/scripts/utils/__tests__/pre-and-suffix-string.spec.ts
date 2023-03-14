import preAndSuffixString from "../pre-and-suffix-string";

describe("#Component preAndSuffixString", () => {
  it("should return the base string with added prefix and suffix", async () => {
    const generatedString = preAndSuffixString("base", "pre-", "-suff");
    expect(generatedString).toStrictEqual("pre-base-suff");
  });

  it("should return the base string with added prefix and no suffix", async () => {
    const generatedString = preAndSuffixString("base", "pre-", undefined);
    expect(generatedString).toStrictEqual("pre-base");
  });

  it("should return the base string with added suffix and no prefix", async () => {
    const generatedString = preAndSuffixString("base", undefined, "-suff");
    expect(generatedString).toStrictEqual("base-suff");
  });

  it("should return undefined if no base string provided", async () => {
    const generatedString = preAndSuffixString(undefined, "pre-", "-suff");
    expect(generatedString).toBeUndefined();
  });
});
