import { measurandAirRouter } from "../router";

describe("topic router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "post" }];
    routes.forEach((route) => {
      const match = measurandAirRouter.stack.find(
        (stackElement) => stackElement.route.path === route.path && stackElement.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
