import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
// import {RouteRecordRaw} from 'vue-router';

const routes = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: '/history',
    name: 'History',
    component: () => import("../views/History.vue")
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import("../views/Contacts.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;