import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faShoppingCart,
  faPhone,
  faSignOutAlt,
  faUserCircle,
  faChalkboardTeacher,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './views/App/App.vue';
import store from './store';
import { router } from './router';

library.add(
  faHome,
  faSignOutAlt,
  faUserCircle,
  faShoppingCart,
  faPhone,
  faChalkboardTeacher,
  faIdBadge
);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
