<template>
  <div class="page page--drawclock">
    <h1 class="page-title" ref="page-title">{{ title }}</h1>
    <canvas class="drawclock-canvas" ref="drawclock-canvas"></canvas>
  </div>
</template>

<script>
import { getRatio, requestAnimationFrame as raf } from '../../utils/index';
import { Clock } from './clock';

export default {
  data() {
    return {
      title: '绘制时钟',
    };
  },
  mounted() {
    const canvas = this.$refs['drawclock-canvas'];
    const ctx = canvas.getContext('2d');
    const ratio = getRatio(ctx);

    this.render(canvas, ratio);

    window.addEventListener('resize', () => {
      this.render(canvas, ratio);
    });
  },
  methods: {
    render(canvas, ratio) {
      const r = 300;
      const color = '#ff0000'; // 时间轴颜色
      const tickMarkSpacing = 10; // 刻度间隔
      const smallTickMarkLength = 6; // 小刻度线的长度
      const largeTickMarkLength = 16; // 大刻度线的高度

      const ctx = canvas.getContext('2d');
      const canvasWidth = window.innerWidth * ratio;
      const canvasHeight =
        (window.innerHeight -
          this.$refs['page-title'].getBoundingClientRect().height) *
        ratio;
      const originX = canvasWidth / 2;
      const originY = canvasHeight / 2;
      const handLength = r - 30;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${canvasWidth / ratio}px`;
      canvas.style.height = `${canvasHeight / ratio}px`;

      const clock = new Clock(
        ctx,
        ratio,
        originX,
        originY,
        r,
        color,
        tickMarkSpacing,
        smallTickMarkLength,
        largeTickMarkLength,
        handLength,
      );

      (function animloop() {
        raf(animloop);
        clock.draw();
      })();
    },
  },
};
</script>

<style>
@import url('../../assets/style/reset.css');

.page-title {
  padding: 60px 0;
  font-size: 27px;
  color: #fff;
  text-align: center;
  background: url('../../assets/wood.jpg') repeat-x;
}
.drawclock-canvas {
  /* width: 100%; */
  background-color: #fff;
}
</style>
