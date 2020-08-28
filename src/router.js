import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Catalogue from './views/Catalogue.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    // defino y asocio mis ruta a su respectivo componente
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/catalogo/:id',
      name: 'catalogo',
      component: Catalogue
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('---------');
  // console.log('to', to);
  // console.log('---------');

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // console.log('authRequired', authRequired);
  // console.log('loggedIn', loggedIn);

  // si intenta acceder a una pagina restringida y no esta loggeado
  // entonces lo debo redireccionar a la pagina del login
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
