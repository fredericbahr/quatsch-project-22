import { QanaryComponentAbout } from "../about.model";

describe("#Component QanaryComponentAbout", () => {
  it("should create new QanaryComponentAbout instance with default data", async () => {
    const pkg = {};
    jest.mock(`${process.cwd()}/package.json`, () => pkg);

    const aboutComponent = await QanaryComponentAbout.create();

    expect(aboutComponent).not.toBeNull();
    expect(aboutComponent.name).toStrictEqual("");
    expect(aboutComponent.description).toStrictEqual("");
    expect(aboutComponent.version).toStrictEqual("");
  });
});
