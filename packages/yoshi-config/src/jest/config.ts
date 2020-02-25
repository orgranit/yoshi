// eslint-disable-next-line import/no-extraneous-dependencies
import { LaunchOptions } from 'puppeteer';
import { InitialOptions } from '@jest/types/build/Config';

interface BootstrapSetupOptions {
  globalObject: any;
  getPort: () => number;
  staticsUrl: string;
  appConfDir: string;
  appLogDir: string;
  appPersistentDir: string;
}

interface BootstrapTeardownOptions {
  globalObject: any;
}

interface BootstrapOptions {
  setup?: (options: BootstrapSetupOptions) => Promise<any>;
  teardown?: (options: BootstrapTeardownOptions) => Promise<any>;
}

type WhitelistedSpecOptions = Pick<
  InitialOptions,
  'globals' | 'testURL' | 'moduleNameMapper' | 'resetMocks'
>;
type WhitelistedE2EOptions = Pick<InitialOptions, 'moduleNameMapper'>;

type WhitelistedGlobalOptions = Pick<
  InitialOptions,
  | 'collectCoverage'
  | 'collectCoverageFrom'
  | 'coverageReporters'
  | 'coverageDirectory'
  | 'coveragePathIgnorePatterns'
  | 'coverageThreshold'
>;

export type Config = Partial<WhitelistedGlobalOptions> & {
  puppeteer?: LaunchOptions;
  bootstrap?: BootstrapOptions;
  server?: {
    command: string;
    port: number;
  };
  specOptions?: WhitelistedSpecOptions;
  e2eOptions?: WhitelistedE2EOptions;
};
