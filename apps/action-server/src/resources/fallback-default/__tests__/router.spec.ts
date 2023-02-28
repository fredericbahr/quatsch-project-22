import { fallbackRouter } from "../fallback.router";

describe("#Fallback router", () => {
  test("has crud routes", () => {
    const routes = [
      { path: "/", method: "post" },
      { path: "/affirmation", method: "post" },
    ];

    routes.forEach((route) => {
      const match = fallbackRouter.stack.find(
        (fallbackElement) => fallbackElement.route.path === route.path && fallbackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
