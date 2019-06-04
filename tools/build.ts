import { bundle, clean, TSRollupConfig } from 'aria-build'

(async function() {

  const external = [
    'aria-build',
    'rollup',
    'rollup-plugin-istanbul'
  ]

  const options: TSRollupConfig[] = [
    {
      input: './src/index.ts',
      external,
      output: {
        format: 'es',
        file: './dist/aria-test.es.js'
      },
      tsconfig: {
        compilerOptions: {
          declaration: true
        }
      }
    },
    {
      input: './src/index.ts',
      external,
      output: {
        format: 'cjs',
        file: './dist/aria-test.js'
      }
    }
  ]

  await clean('dist')
  await bundle(options)
})()