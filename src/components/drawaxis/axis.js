/* eslint-disable import/prefer-default-export */
export class Axis {
  constructor(ctx, ratio, padding, arrowHeadLength, arrowAngle, strokeColor, tickMarkSpacing,
    smallTickMarkLength, largeTickMarkLength) {
    if (!ctx || !ratio || (typeof padding !== 'number' && typeof padding !== 'object')) {
      return;
    }

    if (typeof padding === 'number') {
      padding = {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      };
    }

    if (typeof padding.top !== 'number'
      || typeof padding.right !== 'number'
      || typeof padding.bottom !== 'number'
      || typeof padding.left !== 'number') {
      return;
    }

    this.ctx = ctx;
    this.ratio = ratio;
    this.padding = padding;
    this.arrowHeadLength = arrowHeadLength;
    this.arrowAngle = arrowAngle;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.originX = this.padding.left;
    this.originY = this.canvasHeight - this.padding.bottom;
    this.strokeColor = strokeColor;
    this.tickMarkSpacing = tickMarkSpacing;
    this.smallTickMarkLength = smallTickMarkLength;
    this.largeTickMarkLength = largeTickMarkLength;
  }

  draw() {
    const { ctx, strokeColor, arrowLineLength, arrowAngle,
      tickMarkSpacing, smallTickMarkLength, largeTickMarkLength } = this;
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    this.drawArrows(arrowLineLength, arrowAngle);
    this.drawTickMark(tickMarkSpacing, smallTickMarkLength, largeTickMarkLength);
    ctx.restore();
  }

  drawArrows(arrowHeadLength, arrowAngle) {
    const { originX, originY, padding, canvasWidth } = this;

    const maxX = canvasWidth - padding.right;
    this.drawArrow(originX, originY, maxX, originY, arrowHeadLength, arrowAngle);

    const minY = padding.top;
    this.drawArrow(originX, originY, originX, minY, arrowHeadLength, arrowAngle);
  }

  drawArrow(fromX, fromY, toX, toY, arrowHeadLength = 10, arrowAngle = 30) {
    const { ctx } = this;
    const angle = Math.atan2(fromY - toY, fromX - toX) * (180 / Math.PI);
    const angle1 = (angle + arrowAngle) * (Math.PI / 180);
    const angle2 = (angle - arrowAngle) * (Math.PI / 180);
    const topX = arrowHeadLength * Math.cos(angle1);
    const topY = arrowHeadLength * Math.sin(angle1);
    const botX = arrowHeadLength * Math.cos(angle2);
    const botY = arrowHeadLength * Math.sin(angle2);

    ctx.beginPath();

    let arrowX;
    let arrowY;

    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);

    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);

    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);

    ctx.stroke();
  }

  drawTickMark(tickMarkSpacing, smallTickMarkLength, largeTickMarkLength) {
    const { ctx, originX, originY, padding, canvasWidth } = this;

    ctx.beginPath();
    ctx.font = '18px Arial';

    let i = 1;
    while (((i + 5) * tickMarkSpacing) + originX < canvasWidth - padding.right) {
      const length = i % 5 === 0 ?
        largeTickMarkLength : smallTickMarkLength;
      const currentX = originX + (i * tickMarkSpacing);
      ctx.moveTo(currentX, originY);
      ctx.lineTo(currentX, originY - length);
      ctx.fillStyle = this.strokeColor;

      if (i % 5 === 0) {
        const text = i * tickMarkSpacing;
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, currentX - (textWidth / 2), originY - length - 5);
      }

      i += 1;
    }
    ctx.stroke();

    ctx.beginPath();
    let j = 1;
    while (originY - ((j + 5) * tickMarkSpacing) > padding.top) {
      const length = j % 5 === 0 ?
        largeTickMarkLength : smallTickMarkLength;
      const currentY = originY - (j * tickMarkSpacing);
      ctx.moveTo(originX, currentY);
      ctx.lineTo(originX + length, currentY);

      if (j % 5 === 0) {
        const text = j * tickMarkSpacing;
        const textHeight = ctx.measureText('w').width * (1 + (1 / 6));
        ctx.fillText(text, originX + length + 5, currentY + (textHeight / 2));
      }

      j += 1;
    }

    ctx.stroke();
  }
}
