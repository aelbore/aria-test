# aria-test

Installation
------------

  ```
    npm install --save-dev aria-test
  ```

  ### Setup
  ```typescript
  import { karmaConfig } from 'aria-test'
  import { alias } from 'aria-build'
  
  const vue = require('rollup-plugin-vue')

  export default karmaConfig({ 
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
    }
  })
  ```