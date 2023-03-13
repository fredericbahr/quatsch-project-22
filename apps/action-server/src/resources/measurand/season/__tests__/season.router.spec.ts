import { seasonRouter } from "../season.router";

describe("#Measurand season router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];

    routes.forEach((route) => {
      const match = seasonRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
