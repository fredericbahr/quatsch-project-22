/**
 * Returns a word stem like text by trimming a number of chars at the end given string
 * @param word the word whose root is to be found
 */
export const getWordStem = (word: string): string => {
  const minWordLength = 5;
  const trimLength = -2;
  if (word.length > minWordLength) {
    return word.slice(0, trimLength);
  }
  return word;
};

/**
 * Returns true if an element exists in a model
 * @param model the model to be searched
 * @param searchValue the search value
 */
export const isEntryInModel = (model: Record<string, { label: string }>, searchValue: string): boolean => {
  console.log(getWordStem(searchValue));
  return Object.values(model).some((entry) => entry.label.includes(getWordStem(searchValue)));
};

/**
 * Returns an element if it exists in a model
 * @param model the model to be searched
 * @param searchValue the search value
 */
export const findEntryInModel = <T extends { label: string }>(
  model: Record<string, T>,
  searchValue: string,
): T | undefined => {
  return Object.values(model).find((knownStation) => knownStation.label.includes(getWordStem(searchValue)));
};
