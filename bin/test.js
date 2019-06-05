
const Server = require('karma').Server

const TARGET = Object.freeze({
  VUE: 'vue',
  WEB_COMPONENTS: 'wc',
  REACT: 'react'
})

module.exports = async function execute({ command, dir, options }) {
  if (options) {
    switch(options.target) {
      case TARGET.VUE: 
        
        break
    }

    const server = new Server()
    server.start() 
  }
}