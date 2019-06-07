# aria-test
Simple testing tools, provides pre define configuration

Installation
------------

  ```
    npm install --save-dev aria-test
  ```

  ### Setup
  * create `karma.conf.ts` in your root folder of your app
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
  * add npm scripts
    ```json
    "test": "karma start"
    ```
  * Run your test
    ```
    npm test
    ```