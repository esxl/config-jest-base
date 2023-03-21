import type { Config } from "@jest/types";
import { ECMA_EXTENSIONS, Extensions } from "@esxl/constants";
import { createRequire } from "module";

const require$ = createRequire(import.meta.url);
const ECMA_EXTENSIONS_GROUP = `(${ECMA_EXTENSIONS.join("|")})`;

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    `src/**/*.${ECMA_EXTENSIONS_GROUP}`,
    // DO NOT collect coverage from TypeScript type definition files
    "!**/*.d.ts",
    // DO NOT collect coverage from files within a `__fixtures__` directory
    "!**/__fixtures__/**",
    // DO NOT collect coverage from files within a `__tests__` directory
    "!**/__tests__/**",
  ],
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  errorOnDeprecated: true,
  extensionsToTreatAsEsm: [
    Extensions.TypeScript,
    Extensions.TypeScript_JSX,
    Extensions.JSX,
  ].map((extension) => `.${extension}`),
  /**
   * Place the extensions most commonly used first per Jest's recommendation.
   *
   * @see https://jestjs.io/docs/configuration#modulefileextensions-arraystring
   */
  moduleFileExtensions: [
    Extensions.TypeScript,
    Extensions.TypeScript_JSX,
    Extensions.JavaScript,
    Extensions.JSX,
    Extensions.JSON,
    Extensions.CommonJS,
    Extensions.ECMAScriptModule,
    Extensions.WebAssemblyBinary,
    Extensions.Node,
  ],
  resetMocks: true,
  roots: ["<rootDir>/src"],
  testMatch: [`<rootDir>/src/**/__tests__/**/*.test.${ECMA_EXTENSIONS_GROUP}`],
  testPathIgnorePatterns: ["__fixtures__", "/node_modules/"],
  testRunner: require$.resolve("jest-circus/runner"),
  watchPlugins: [
    require$.resolve("jest-watch-typeahead/filename"),
    require$.resolve("jest-watch-typeahead/testname"),
  ],
};

export default config;
