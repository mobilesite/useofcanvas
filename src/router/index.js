import Vue from 'vue';
import Router from 'vue-router';
import drawaxis from '@/components/drawaxis/index';
import floatpx from '@/components/floatpx/index';
import drawclock from '@/components/drawclock/index';
import drawsector from '@/components/drawsector/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/drawaxis',
      component: null,
    },
    {
      path: '/drawaxis',
      name: 'drawaxis',
      component: drawaxis,
    },
    {
      path: '/floatpx',
      name: 'floatpx',
      component: floatpx,
    },
    {
      path: '/drawclock',
      name: 'drawclock',
      component: drawclock,
    },
    {
      path: '/drawsector',
      name: 'drawsector',
      component: drawsector,
    },
  ],
});

