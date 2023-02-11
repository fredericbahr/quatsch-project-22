import { Domain } from "qanary-lubw-data";

import { isDomain } from "../utils/check-domain";

describe("isDomain", () => {
  it("should return true if the domain is valid", () => {
    const domains: string[] = Object.values(Domain);

    for (const domain of domains) {
      expect(isDomain(domain as Domain)).toBe(true);
    }
  });

  it("should return false if the domain is invalid", () => {
    const domain = "blablabla";

    expect(isDomain(domain as Domain)).toBe(false);
  });
});
