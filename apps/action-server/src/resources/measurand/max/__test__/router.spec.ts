import { maxRouter } from "../max.router";

describe("#Max value router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];

    routes.forEach((route) => {
      const match = maxRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
