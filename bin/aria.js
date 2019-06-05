#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

/**
 * aread [command] --target [vue | wc | lit-element]
 * aria test --target vue
 * aria test --target wc
 * aria build --target vue
 * aria build --target lit-element
 */
program
  .version(pkg.version)
  .arguments('[command] [dir]')
  .option('-t, --target [target]', 'javascript frameworks or library')
  .action(function (command, dir, options) {
    if (command) {
      require(`./${command}`)({ command, dir, options })
    }
  })