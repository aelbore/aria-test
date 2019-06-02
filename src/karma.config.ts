import * as path from 'path'
import { createRollupPreprocessor } from './rollup-preprocessor';

const COVERAGE_DEST_PATH = path.resolve(path.join('node_modules', '.tmp', 'coverage'))

export interface KarmaOptions {
  files?: Array<string | { pattern?: string }>;
  frameworks?: string[];
  plugins?: any[];
  rollup?: { plugins?: any[], custom?: boolean }
}

export function createKarmaConfig(options?: KarmaOptions) {
  const { files, frameworks, plugins, rollup } = options

  return function karmaConfig(config) {
    config.set({
      files,
      plugins,
      frameworks,

      reporters: ['mocha', 'coverage-istanbul'],

      ...createRollupPreprocessor(rollup),

      coverageIstanbulReporter: {
        reports: ['lcov', 'text-summary'],
        dir: COVERAGE_DEST_PATH,
        combineBrowserReports: true,
        skipFilesWithNoCoverage: true,
        thresholds: {
          global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
          }
        }
      },
  
      browsers: ['ChromeHeadlessNoSandbox'],
  
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },
  
      singleRun: true,
      concurrency: Infinity
    })
  }
}