import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-dev-shm-usage");
        }
        return launchOptions;
      });
      return config;
    },
    specPattern: "cypress/stepsDefinitions/**/*.step.ts",
    reporter: "junit",
    reporterOptions: {
      mochaFile: "results/Cypress-Testes-QA-[hash].xml",
      attachments: true,
      attachmentsPath: "./cypress/screenshots",
    },
    // retries: 1,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 5000,
    requestTimeout: 10000,
    supportFile: "cypress/supports/e2e.ts",
  },
});