import { thresholdRouter } from "../threshold.router";

describe("#Measurand threshold router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];

    routes.forEach((route) => {
      const match = thresholdRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
