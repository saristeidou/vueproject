import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import Edit from '@/views/Edit';
import AddDetails from '@/views/AddDetails';
import Account from '@/views/Account';
import Password from '@/views/Password';
import Calendar from '@/views/Calendar';
import Reports from '@/views/Reports';

Vue.use(Router);
// Link the pages 
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/details',
      name: 'Details',
      component: AddDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/password',
      name: 'Password',
      component: Password,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
// makes the login the first page when you enter the website
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//if the authentication is true it 
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
