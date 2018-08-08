/* eslint-disable import/prefer-default-export */
export class Clock {
  constructor(ctx, ratio, originX, originY, r, color, tickMarkSpacing, 
    smallTickMarkLength, largeTickMarkLength, handLength) {
    if (!ctx || !ratio) {
      return;
    }

    this.ctx = ctx;
    this.ratio = ratio;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.originX = originX;
    this.originY = originY;
    this.r = r;
    this.color = color;
    this.tickMarkSpacing = tickMarkSpacing;
    this.smallTickMarkLength = smallTickMarkLength;
    this.largeTickMarkLength = largeTickMarkLength;
    this.handLength = handLength;
  }

  draw() {
    const { ctx, canvasWidth, canvasHeight, originX, originY, r, color, 
      // tickMarkSpacing, smallTickMarkLength, largeTickMarkLength 
    } = this;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    this.drawCircle(originX, originY, r);
    ctx.restore();

    // ctx.save();
    // this.drawTickMark(tickMarkSpacing, smallTickMarkLength, largeTickMarkLength);
    // ctx.restore();

    this.drawNumerals();
    this.drawCenter();
    this.drawHands();
  }

  drawCircle(originX, originY, r) {
    const { ctx } = this;

    ctx.beginPath();
    ctx.arc(originX, originY, r, 0, 2 * Math.PI, true); // 最后一个参数表示逆时针

    ctx.stroke();
  }

  // drawTickMark(tickMarkSpacing, smallTickMarkLength, largeTickMarkLength) {
  //   const { ctx, originX, originY, r } = this;
  //   ctx.beginPath();
  //   ctx.font = '20px Arial';
   
  //   for (let i = 0; i < 12; i += 1) {
  //     ctx.translate(originX + r, originY);
  //     ctx.rotate((i * (30 * Math.PI)) / 180);
  //     ctx.moveTo(r, 0);
  //     ctx.lineTo(r, largeTickMarkLength);
  //   }

  //   ctx.stroke();
  // }

  drawNumerals() {
    const { ctx, originX, originY, handLength, color } = this;
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let theta = 0;
    let numeralWidth = 0;

    ctx.save();
    ctx.beginPath();
    ctx.font = '18px Arial';
    ctx.fillStyle = color;

    numerals.forEach((numeral) => {
      theta = (numeral - 3) * (2 * Math.PI) / 12; // 3点钟是0度
      numeralWidth = ctx.measureText(numeral).width;
      ctx.fillText(
        numeral, 
        originX + Math.cos(theta) * (handLength) - (numeralWidth / 2),
        originY + Math.sin(theta) * (handLength) + 5,
      );
    });

    ctx.restore();
  }

  drawCenter() {
    const { ctx, originX, originY, color } = this;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(originX, originY, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
  }

  drawHands() {
    const date = new Date();
    let hh = date.getHours();
    hh = hh > 12 ? hh - 12 : hh;
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    this.drawHand(hh * 5 + (mm / 60) * 5, true);
    this.drawHand(mm, false);
    this.drawHand(ss, false);
  }

  drawHand(value, isHour) {
    const { ctx, originX, originY, handLength, color } = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    const angle = value * (Math.PI * 2 / 60) - Math.PI / 2; // 从三点钟方向开始为0度

    const length = isHour ? handLength * 2 / 3 : handLength;
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + Math.cos(angle) * length, originY + Math.sin(angle) * length);
    ctx.stroke();
    ctx.restore();
  }
}
