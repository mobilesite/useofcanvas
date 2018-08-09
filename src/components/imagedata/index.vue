<template>
  <div class="page page--drawaxis">
    <h1 class="page-title" ref="page-title">{{ title }}</h1>
    <button class="imagedata-copy" ref="imagedata-copy">拷贝</button>
    <canvas class="imagedata-canvas" ref="imagedata-canvas"></canvas>
  </div>
</template>

<script>
import { getRatio } from '../../utils/index';

export default {
  data() {
    return {
      title: '图像处理',
    };
  },
  mounted() {
    const canvas = this.$refs['imagedata-canvas'];
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

      const img = new Image();
      img.crossOrigin = '';
      img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/pie.png';

      let w;
      let h;
      let left;
      let top;

      img.onload = () => {
        w = img.width;
        h = img.height;

        left = Math.ceil((canvasWidth - w) / 2);
        top = 200;

        ctx.drawImage(
          img, 
          left, 
          top, 
          w, 
          h,
        );
      };

      const copy = this.$refs['imagedata-copy'];
      copy.addEventListener('click', () => {
        this.copy(ctx, left, top, w, h);
      });
    },
    copy(ctx, left, top, w, h) {
      const imgData = ctx.getImageData(left, top, w, h);
      console.log(imgData);

      for (let i = 0; i < imgData.height; i += 1) {
        for (let j = 0; j < imgData.width; j += 1) {
          // imagedata读取的像素数据存储在data属性里，是从上到下，从左到右的，每个像素需要占用4位数据，分别是r,g,b,alpha透明通道
          const x = i * 4 * imgData.width + 4 * j;
          const r = imgData.data[x];
          const g = imgData.data[x + 1];
          const b = imgData.data[x + 2];

          // 透明度
          imgData.data[x + 3] = 255; 
          // 反相
          imgData.data[x] = 255 - r;
          imgData.data[x + 1] = 255 - g;
          imgData.data[x + 2] = 255 - b; 
        }
      }

      ctx.putImageData(
        imgData, 
        left, 
        top + h + 100,
      );
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
.imagedata-copy{
  border: 1px solid red;
  margin: 40px;
  padding: 10px 40px;
  appearance: none;
}
</style>
