import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/base.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')