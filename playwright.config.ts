import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000, // ms
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000, // ms
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Amount of parallel workers */
  workers: "75%",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["list"], ["html", { open: "never", outputFolder: "./e2e-test-report" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* do not run headless, so we see  */
    headless: !!process.env.CI,
    /** keeps recored video if the test failes */
    video: "retain-on-failure",
    /** saves a screenshot if test fails */
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "e2e-test-out/",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "ng serve showcase --host=0.0.0.0 --port=8181 --no-live-reload",
  //   timeout: 15 * 60 * 1000, // ms
  //   url: "http://localhost:8181",
  //   reuseExistingServer: !process.env.CI,
  // },
};

export default config;
