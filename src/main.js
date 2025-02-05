import { mount } from 'svelte'

import './css/reset.css'
import './css/fonts.css'
import './css/style.css'

import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
