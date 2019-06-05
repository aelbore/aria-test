import * as path from 'path'
import * as util from 'util'
import { exec } from 'child_process'
import { symlinkDir, clean, bundle } from 'aria-build'

(async function() {
  delete process.env.APP_ROOT_PATH

  const execute = util.promisify(exec)

  const rootDirs = [
    './packages/vue'
  ]

  const config = await import('./config')

  await clean('dist')
  await bundle(config.default)
  await symlinkDir(
    path.resolve('dist'),
    path.resolve(path.join('node_modules', 'aria-test'))
  )

  await Promise.all(rootDirs.map(async rootDir => {
    process.env.APP_ROOT_PATH = path.resolve(rootDir)
    await symlinkDir(
      path.resolve('node_modules'), 
      path.join(process.env.APP_ROOT_PATH, 'node_modules')
    ) 
    await execute(`npm run build --prefix ${rootDir}`)
  }))

})()