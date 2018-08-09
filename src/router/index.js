import Vue from 'vue';
import Router from 'vue-router';
import drawaxis from '@/components/drawaxis/index';
import floatpx from '@/components/floatpx/index';
import drawclock from '@/components/drawclock/index';
import drawsector from '@/components/drawsector/index';
import drawimage from '@/components/drawimage/index';
import imagedata from '@/components/imagedata/index';
import transform from '@/components/transform/index';

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
    {
      path: '/drawimage',
      name: 'drawimage',
      component: drawimage,
    },
    {
      path: '/imagedata',
      name: 'imagedata',
      component: imagedata,
    },
    {
      path: '/transform',
      name: 'transform',
      component: transform,
    },
  ],
});

