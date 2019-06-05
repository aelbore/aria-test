import { bundle, clean } from 'aria-build'

(async function() {
  const config = await import('./config')

  await clean('dist')
  await bundle(config.default)
})()