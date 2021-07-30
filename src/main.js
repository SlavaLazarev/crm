import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate"
import dateFilter from './filters/date.filter'
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from './directives/tooltips.directive'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugins'
import Loader from "./components/app/Loader";
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Paginate from 'vuejs-paginate'
import VueMeta from "vue-meta";



Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyA8c3BsD5NNZ4IUHLSTy82KfCXbepY1uFE",
  authDomain: "crmvue2-343ef.firebaseapp.com",
  projectId: "crmvue2-343ef",
  storageBucket: "crmvue2-343ef.appspot.com",
  messagingSenderId: "1047161768076",
  appId: "1:1047161768076:web:8438dff299724b649113a9"
})
let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

