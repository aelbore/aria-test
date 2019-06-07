import * as path from 'path'
import { globFiles } from 'aria-build'
import { Server } from 'karma'

export async function run() {
  const program = require('commander')
  const pkg = require('../package.json')

  program
    .version(pkg.version)
    .arguments('[command] [dir]')
    .option('-t, --target [target]', 'javascript frameworks or library')
    .action(action)

  async function action(command, dir = 'src', options) {
    if (command) {
      await execute({ 
        command, dir, options })
    }
  }

  async function execute({ command, dir, options }) {
    if (options) {
      const { join } = path
      dir = dir ? dir: 'src'

      const patterns = [ 
        join(dir, '**/*.spec.ts'), 
        join(dir, '**/*.spec.js'),
        join(dir, '**/*.test.ts'), 
        join(dir, '**/*.test.js') 
      ]

      const files = await globFiles(patterns)
      const preprocessors = patterns.reduce(function(acc, cur, i) {
        acc[cur] = ['rollupNode']
        return acc
      }, {})

      const config = await import(`./${options.target}`)
      const server = new Server(config({ 
        files: files.filter(file => file), 
        preprocessors 
      }))
      server.start()
    }
  }

  program.parse(process.argv);                                                                                                                                                                                                                                                                                                                                                                                        
}