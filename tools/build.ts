import * as path from 'path'
import { bundle, clean, globFiles, copyFiles } from 'aria-build'

(async function() {
  const binFiles = await globFiles('bin/**/*')
  const config = await import('./config')

  await clean('dist')
  await bundle(config.default)
  await Promise.all(binFiles.map(binFile => {
    return copyFiles(binFile, path.join('dist', 'bin'))
  }))
})()