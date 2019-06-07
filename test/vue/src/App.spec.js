import Vue from 'vue'
import App from './App.vue'

describe('App', () => {
  let Constructor

  beforeEach(() => {
    Constructor = Vue.extend(App);
  })

  afterEach(() => {
    Constructor = null
  })
  
  it('should have h1 element', () => {
    const component =  new Constructor().$mount()
    expect(component.$el.querySelector('h1')).not.undefined
  })

  it('should render props [message] as its text content.', async () => {
    const expected = 'Hello'

    const component = new Constructor().$mount()
    component.message = expected

    await Vue.nextTick()
    expect(component.$el.innerHTML).to.eq(expected)
  })

})