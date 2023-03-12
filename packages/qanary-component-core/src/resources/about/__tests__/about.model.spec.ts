import { QanaryComponentAbout } from "../about.model";

describe("#Component QanaryComponentAbout", () => {
  it("should create new QanaryComponentAbout instance from package info", async () => {
    const pkg = {
      name: "test-name",
      description: "test-description",
      version: "test-version",
    };
    jest.mock(`${process.cwd()}/package.json`, () => pkg);

    const aboutComponent = await QanaryComponentAbout.create();

    expect(aboutComponent).not.toBeNull();
    expect(aboutComponent.name).toStrictEqual(pkg.name);
    expect(aboutComponent.description).toStrictEqual(pkg.description);
    expect(aboutComponent.version).toStrictEqual(pkg.version);
  });
});
