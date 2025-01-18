import { mount } from 'svelte'

import './css/reset.css'
import './css/fonts.css'
import './css/style.css'
import './css/header/header.css'
import './css/header/header-m.css'
import './css/mobile.css'

import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
