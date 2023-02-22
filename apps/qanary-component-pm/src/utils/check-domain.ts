import { Domain } from "shared";

/**
 * Filters the time domain from the domain enum
 * @param domain the domain to check
 * @returns true if the domain is not the time domain, false otherwise
 */
const filterTimeDomain = (domain: Domain): boolean => {
  return domain !== Domain.Time;
};

/**
 * Checks if the lubw domain is valid
 * @param domain the lubw domain to check
 * @returns true if the domain is valid, false otherwise
 */
export const isDomain = (domain: Domain): boolean => {
  return Object.values(Domain).filter(filterTimeDomain).includes(domain);
};
