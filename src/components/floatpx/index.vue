<template>
  <div class="page page--drawaxis">
    <h1 class="page-title" ref="page-title">{{ title }}</h1>
    <canvas class="drawaxis-canvas" ref="drawaxis-canvas"></canvas>
    <div class="drawaxis-compare">对比盒子</div>
  </div>
</template>

<script>
import { getRatio } from '../../utils/index';
import { Axis } from './axis';

export default {
  data() {
    return {
      title: '绘制坐标轴',
    };
  },
  mounted() {
    const canvas = this.$refs['drawaxis-canvas'];
    const ctx = canvas.getContext('2d');
    const ratio = getRatio(ctx);

    this.render(canvas, ratio);

    window.addEventListener('resize', () => {
      this.render(canvas, ratio);
    });
  },
  methods: {
    render(canvas, ratio) {
      const padding = 80.5; // 时间轴距离canvas边缘的距离
      const strokeColor = '#ff0000'; // 时间轴颜色
      const arrowHeadLength = 10; // 时间轴箭头的长度
      const arrowAngle = 30; // 时间轴箭头两侧线之间夹角的一半
      const tickMarkSpacing = 10; // 刻度间隔
      const smallTickMarkLength = 6; // 小刻度线的长度
      const largeTickMarkLength = 16; // 大刻度线的高度

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

      // ctx.rotate(-(10 * Math.PI) / 180);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const axis = new Axis(
        ctx,
        ratio,
        padding,
        arrowHeadLength,
        arrowAngle,
        strokeColor,
        tickMarkSpacing,
        smallTickMarkLength,
        largeTickMarkLength,
      );

      axis.draw();
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
.drawaxis-canvas {
  /* width: 100%; */
  background-color: #fff;
}
.drawaxis-compare{
  border: 1px solid red;
  margin: 0 80px 80px;
  padding: 20px;
}
</style>
