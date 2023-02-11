import { Domain } from "qanary-lubw-data";

/**
 * Checks if the lubw domain is valid
 * @param domain the lubw domain to check
 * @returns true if the domain is valid, false otherwise
 */
export const isDomain = (domain: Domain): boolean => {
  return Object.values(Domain).includes(domain);
};
