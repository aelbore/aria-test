#!/usr/bin/env node

require('ts-node').register({
  ignore: []
})
require('./cli.ts').run()