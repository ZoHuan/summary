//浏览器窗口大小改变时，改变字体大小
(function (doc, win) {
  const docEl = doc.documentElement;
  // 当DOM加载后执行
  doc.addEventListener("DOMContentLoaded", Resize, false);
  // 当屏幕发生变化时执行
  win.addEventListener("resize", debounce(Resize, 500), false);
  Resize();

  function Resize() {
    docEl.style.fontSize = docEl.clientWidth / 96 + "px"; //屏幕宽度为1920时 font-size = 20px;
  }

  // 防抖
  function debounce(fn: () => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function () {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
  }
})(document, window);
