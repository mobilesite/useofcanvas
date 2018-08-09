<template>
  <div class="page page--drawaxis">
    <h1 class="page-title" ref="page-title">{{ title }}</h1>
    <canvas class="drawimage-canvas" ref="drawimage-canvas"></canvas>
  </div>
</template>

<script>
import { getRatio } from '../../utils/index';

export default {
  data() {
    return {
      title: 'transform',
    };
  },
  mounted() {
    const canvas = this.$refs['drawimage-canvas'];
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

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();

      // ctx.transform(1, 0, 0, 1, 200, -300); // 位移
      ctx.transform(
        Math.cos(15 * Math.PI / 180),
        Math.sin(15 * Math.PI / 180),
        -Math.sin(15 * Math.PI / 180),
        Math.cos(15 * Math.PI / 180),
        200,
        -350,
      ); // 旋转
      // ctx.rotate(25 * Math.PI / 180);
      // ctx.transform(
      //   1,
      //   0.2,
      //   0,
      //   1,
      //   0,
      //   0,
      // ); // skew

      // ctx.transform(
      //   0.5,
      //   0,
      //   0,
      //   0.5,
      //   0,
      //   0,
      // ); // 缩放


      const img = new Image();

      img.onload = () => {
        const w = img.width;
        const h = img.height;
        const rt = w / h;

        ctx.strokeStyle = 'red';
        if (canvasWidth / canvasHeight > rt) {
          const left = Math.ceil((canvasWidth - canvasHeight * rt) / 2);
          ctx.drawImage(
            img, 
            left, 
            0, 
            canvasHeight * rt, 
            canvasHeight,
          );
          ctx.strokeRect(left, 0, canvasHeight * rt, canvasHeight);
        } else {
          ctx.drawImage(
            img, 
            0,
            Math.ceil((canvasHeight - canvasWidth / rt) / 2), 
            canvasWidth, 
            canvasWidth / rt,
          );
          ctx.strokeRect(0, 0, canvasWidth * rt, canvasWidth / rt);
        }

        ctx.restore();
      };
      img.src = 'http://www.100tal.com/skin/img/banner3.jpg';
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
</style>
