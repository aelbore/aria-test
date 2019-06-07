import { KarmaOptions } from 'aria-test'
import { createVueKarmaConfig } from 'aria-vue'

module.exports = function karmaConfig(options?: KarmaOptions) {
  return createVueKarmaConfig(options)
}