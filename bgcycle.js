/* 四张实景图轮流当背景，每张停 HOLD，换的时候先雾化 FADE 秒、再显现 FADE 秒。

   要调就调下面三个常数，不必重跑生成脚本（HTML 只是引用这个档）。
   顺序是「先全雾掉、再显现下一张」，不是交叉淡入——林子策 08-27 指定的就是这个。 */
(function () {
  var IMGS = ['bg/bg1.jpg', 'bg/bg2.jpg', 'bg/bg3.jpg', 'bg/bg4.jpg'];
  var HOLD = 15000;   // 每张停多久（毫秒）
  var FADE = 2000;    // 雾化 / 显现各自多久（毫秒）
  var OPACITY = 0.22; // 背景浓度：0 全白，1 原图

  var el = document.createElement('div');
  el.className = 'bgfx';
  el.style.setProperty('--bgfx-op', OPACITY);
  el.style.setProperty('--bgfx-fade', FADE + 'ms');
  el.style.backgroundImage = 'url("' + IMGS[0] + '")';
  document.body.insertBefore(el, document.body.firstChild);

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || IMGS.length < 2) return;   // 定在第一张就好

  // 先把四张都拉下来。不预载的话换图那一刻图还没解码，会闪一下白。
  IMGS.forEach(function (src) { var im = new Image(); im.src = src; });

  var i = 0;
  function step() {
    el.classList.add('fog');                       // 雾化 FADE 秒
    setTimeout(function () {
      i = (i + 1) % IMGS.length;
      el.style.backgroundImage = 'url("' + IMGS[i] + '")';
      el.classList.remove('fog');                  // 显现 FADE 秒
      setTimeout(step, HOLD + FADE);               // 显现走完再停 HOLD
    }, FADE);
  }
  setTimeout(step, HOLD);

  // 供验收脚本读的实测口径，免得断言去猜这几个数
  window.__bgfx = { imgs: IMGS, hold: HOLD, fade: FADE, opacity: OPACITY, el: el };
})();
