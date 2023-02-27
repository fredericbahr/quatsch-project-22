import { fallbackStationRouter } from "../fallback-station.router";

describe("#Fallback station router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];

    routes.forEach((route) => {
      const match = fallbackStationRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
