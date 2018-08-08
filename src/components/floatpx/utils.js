function getRatio(ctx) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = 
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;

  return devicePixelRatio / backingStoreRatio;
}

const requestAnimationFrame = (() =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  })();

export {
  getRatio,
  requestAnimationFrame,
};
