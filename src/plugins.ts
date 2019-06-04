import { createPreprocessor } from './karma-rollup'

export const karmaPlugins = [
  'karma-mocha',
  'karma-chai',
  'karma-mocha-reporter',
  'karma-chrome-launcher',
  'karma-coverage-istanbul-reporter',
  { 
    "preprocessor:rollup": [
      "factory", createPreprocessor
    ] 
  }
]