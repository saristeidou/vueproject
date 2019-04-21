import Vue from 'vue';
import './firebase';
import { authentication } from './firebase';
import App from './App.vue';
import router from './router';
import VueFire from 'vuefire';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee,faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueGoogleCharts from 'vue-google-charts'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'


import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
//import jsPDF from 'jsPDF';

library.add(faCoffee,faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueFire);
Vue.use(Vuetify);
//Vue.use(jsPDF);
Vue.use(BootstrapVue);
Vue.use(VueGoogleCharts);
Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});
Vue.config.productionTip = false;


let ap = '';

authentication.onAuthStateChanged(() => {
  if (!ap) {
    /* eslint-disable no-new */
    ap = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});


