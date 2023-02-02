import { webhookRouter } from "../webhook.router";

describe("#Webhook router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];

    routes.forEach((route) => {
      const match = webhookRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
