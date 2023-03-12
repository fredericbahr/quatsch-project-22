/**
 * Generates a string out of a given input base string and a prefix and suffix.
 * @param baseString base string to be extended
 * @param prefix
 * @param suffix
 * @returns a pre- and suffixed string or undefined
 */
const preAndSuffixString = (baseString?: string, prefix = "", suffix = ""): string | undefined => {
  return baseString ? `${prefix}${baseString}${suffix}` : undefined;
};

export default preAndSuffixString;
