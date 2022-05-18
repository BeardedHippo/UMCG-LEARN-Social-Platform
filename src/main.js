import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueRouter from 'vue-router'
import Routes from './routes'
var VueScrollTo = require('vue-scrollto');

Vue.use(Vuelidate);
Vue.prototype.$http = axios
Vue.use(VueRouter);
Vue.use(VueScrollTo)
Vue.config.productionTip = true

const router = new VueRouter({
  routes: Routes,
  mode:'history'
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})