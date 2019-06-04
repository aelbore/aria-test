import * as path from 'path'
import { createRollupPreprocessor } from './rollup-preprocessor'
import { karmaPlugins } from './plugins'

const paths = ['node_modules', '.tmp', 'coverage']
const COVERAGE_DEST_PATH = path.resolve(path.join(...paths))

const generatePlugins = (plugins: any[] = []) => {
  return plugins.map(plugin => {
    if (typeof plugin === 'string') {
      plugin = require(plugin)
    }
    return plugin
  })
}

export interface KarmaOptions {
  files?: Array<string | { pattern?: string }>;
  frameworks?: string[];
  plugins?: any[];
  rollup?: { 
    plugins?: any[], 
    custom?: boolean 
  },
  preprocessors?: {   
    [key: string ]: any
  },
  coverageThresholds?: {
    statements?: number,
    branches?: number,
    functions?:number,
    lines?: number
  }
}

export function createKarmaConfig(options?: KarmaOptions) {
  const { files, frameworks, plugins, rollup, preprocessors, coverageThresholds } = options

  return function karmaConfig(config) {
    config.set({
      files,
      frameworks,
      preprocessors,

      plugins: generatePlugins([ ...karmaPlugins, ...(plugins || []) ]),

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
            ...(coverageThresholds || {})
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