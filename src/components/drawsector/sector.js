/* eslint-disable import/prefer-default-export */
export class Sector {
  constructor(ctx, ratio) {
    this.ctx = ctx;
    this.ratio = ratio;
  }

  draw(x, y, radius, startDegree, endDegree, fillColor) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = null;
    ctx.fillStyle = fillColor;

    ctx.save();

    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, radius, startDegree, endDegree, true); // 圆弧

    ctx.save();

    ctx.rotate(endDegree);
    ctx.moveTo(radius, 0);
    ctx.lineTo(0, 0);

    ctx.restore();

    ctx.rotate(startDegree);
    ctx.lineTo(radius, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    return ctx;
  }
}
