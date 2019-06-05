const external = [
  'aria-build',
  'rollup',
  'rollup-plugin-istanbul'
]

export default [
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