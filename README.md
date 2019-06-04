# aria-test

Installation
------------

  ```
    npm install --save-dev aria-test
  ```

  ### Setup
  ```typescript
  import { createKarmaConfig } from 'aria-test'
  import { alias } from 'aria-build'

  const vue = require('rollup-plugin-vue')

  export default createKarmaConfig({ 
    frameworks: ['mocha', 'chai'],
    files: [
      'tests/**/*.spec.js'
    ],
    rollup: {
      custom: true,
      plugins: [
        alias({
          vue: 'node_modules/vue/dist/vue.js'
        }),
        vue()
      ]
    },
    preprocessors: {
      'tests/**/*.spec.js': [ 'rollupNode' ]
    }
  })
  ```