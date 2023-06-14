import { useMount, useKeyPress } from 'ahooks';

/**
 * 反调试
 */
export default function useDisableDebugger() {
  const isProduction = process.env.NODE_ENV === 'production';

  useKeyPress(
    ['ctrl.u', 'ctrl.shift.i', 'f12'],
    (event) => isProduction && event.preventDefault(),
    { useCapture: isProduction },
  );

  useMount(() => {
    function check() {
      if (
        window.outerHeight - window.innerHeight > 200 ||
        window.outerWidth - window.innerWidth > 200
      ) {
        document.body.innerHTML = '检测到非法调试,请关闭后刷新重试!';
      }
      setInterval(() => {
        Function('debugger')();
      }, 50);
    }
    try {
      isProduction && check();
    } catch (err) {}
  });
}
