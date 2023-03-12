import { getPort } from "../getPort";

describe("#Component getPort", () => {
  it("should return next free port", async () => {
    const PORT = 40500;

    const resultPort = await getPort(PORT);

    expect(resultPort).toStrictEqual(PORT);
  });
});
