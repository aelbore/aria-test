import { typescript2, createTSConfig, nodeResolve, commonjs } from 'aria-build'
const istanbul = require('rollup-plugin-istanbul')

export { istanbul }

export function createRollupPreprocessor(opitions: { plugins?: any[], custom?: boolean }) {
  const { plugins, custom } = opitions
  
  const pluginOptions = {
    plugins: [
      ...(plugins || []),
      typescript2(createTSConfig()),
      nodeResolve(),
      istanbul({ 
        exclude: [
          'tests/**/*.spec.js', 
          "node_modules/**/*"
        ] 
      }),
      commonjs()
    ],
    output: {
      format: 'es',      
      sourcemap: false
    }
  }

  return {
    ...(custom ? {       
          customPreprocessors: {
            rollupNode: {
              base: 'rollup',
              options: { ...pluginOptions }
            }
          } 
      } 
      : { rollupPreprocessor: { ...pluginOptions }}
    )
  }
}