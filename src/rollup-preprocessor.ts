import { typescript2, createTSConfig, nodeResolve, commonjs } from 'aria-build'
const istanbul = require('rollup-plugin-istanbul')

export function createRollupPreprocessor(opitions: { plugins?: any[], custom?: boolean }) {
  const { plugins, custom } = opitions
  
  const pluginOptions = {
    plugins: [
      typescript2(createTSConfig()),
      nodeResolve(),
      istanbul({ 
        exclude: [
          'tests/**/*.spec.js', 
          "node_modules/**/*"
        ] 
      }),
      commonjs(),
      ...(plugins || [])
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
              opitions: { ...pluginOptions }
            }
          } 
      } 
      : { rollupPreprocessor: { ...pluginOptions }}
    )
  }
}