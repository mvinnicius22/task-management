import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VueAxios from 'vue-axios'
import alert from './assets/js/mixins/alert'
import './styles/app.css';

loadFonts()

axios.defaults.baseURL = 'http://localhost:8080/';

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueAxios, axios)
  .mixin(alert)
  .mount('#app')
