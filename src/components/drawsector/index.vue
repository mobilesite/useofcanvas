<template>
  <div class="page page--drawsector">
    <h1 class="page-title" ref="page-title">{{ title }}</h1>
    <canvas class="drawsector-canvas" ref="drawsector-canvas"></canvas>
  </div>
</template>

<script>
import { getRatio } from '../../utils/index';
import { Sector } from './sector';

export default {
  data() {
    return {
      title: '绘制扇形',
    };
  },
  mounted() {
    const canvas = this.$refs['drawsector-canvas'];
    const ctx = canvas.getContext('2d');
    const ratio = getRatio(ctx);

    this.render(canvas, ratio);

    window.addEventListener('resize', () => {
      this.render(canvas, ratio);
    });
  },
  methods: {
    render(canvas, ratio) {
      const ctx = canvas.getContext('2d');
      const canvasWidth = window.innerWidth * ratio;
      const canvasHeight =
        (window.innerHeight -
          this.$refs['page-title'].getBoundingClientRect().height) *
        ratio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${canvasWidth / ratio}px`;
      canvas.style.height = `${canvasHeight / ratio}px`;

      this.draw(ctx, ratio, canvasWidth, canvasHeight);
    },
    draw(ctx, ratio, canvasWidth, canvasHeight) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const sector = new Sector(
        ctx,
        ratio,
      );

      const x = canvasWidth / 2;
      const y = canvasHeight / 2;
      const radius = 300;

      sector.draw(x, y, radius, 0, -Math.PI / 3, '#ff0000');

      // let i = 6;
      // const colorArr = [
      //   'red',
      //   'orange',
      //   'yellow',
      //   'green',
      //   'blue',
      //   'pink',
      // ];
      // while (i) {
      //   sector.draw(x, y, radius, 0, -i * Math.PI / 3, colorArr[i - 1]);
      //   i -= 1;
      // }
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
.drawsector-canvas {
  /* width: 100%; */
  background-color: #fff;
}
.drawsector-compare{
  border: 1px solid red;
  margin: 0 80px 80px;
  padding: 20px;
}
</style>
