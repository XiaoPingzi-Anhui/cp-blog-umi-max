import { styled } from '@umijs/max';
import { useMemoizedFn, useEventListener, useMount } from 'ahooks';
import { isEqual } from 'lodash';
import { memo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getRandomColor } from '@/utils/format';

const colors = ['#ffff00', '#66ffff', '#3399ff', '#99ff00', '#ff9900'];
const timeoutList: NodeJS.Timeout[] = []; // 计时器列表-用于后续清理计时器

const StarCanvas = () => {
  const [starAry, setStarAry] = useState<Record<string, any>[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 封装绘制一个五角星函数
  // x是圆心横坐标，y是圆心纵坐标，其实就是鼠标位置（x ，y）
  // r是里面小圆半径 ，l是大圆半径
  // rot是初始旋转角度
  const star = useMemoizedFn((x, y, r, l, rot) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      // 循环5次，因为5个点
      for (let i = 0; i < 5; i++) {
        //先绘制小圆上一个点
        ctx.lineTo(
          Math.cos(((18 + i * 72 - rot) * Math.PI) / 180) * r + x,
          -Math.sin(((18 + i * 72 - rot) * Math.PI) / 180) * r + y,
        );
        //连线到大圆上一个点
        ctx.lineTo(
          Math.cos(((54 + i * 72 - rot) * Math.PI) / 180) * l + x,
          -Math.sin(((54 + i * 72 - rot) * Math.PI) / 180) * l + y,
        );
      }
      ctx.closePath();
    }
  });

  // 绘制一堆星星
  const draw = useMemoizedFn(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      //循环数组
      for (let i = 0; i < starAry.length; i++) {
        let temp = starAry[i];
        //调用绘制一个星星函数
        star(temp.x, temp.y, temp.r, temp.r * 3, temp.rot);
        //星星颜色
        ctx.fillStyle = temp.color;
        //星星边框颜色
        ctx.strokeStyle = temp.color;
        //线宽度
        ctx.lineWidth = 0.1;
        //角有弧度
        ctx.lineJoin = 'round';
        // 填充
        ctx.fill();
        // 绘制路径
        ctx.stroke();
      }
    }
  });
  //更新动画
  const update = useMemoizedFn(() => {
    const newAry = starAry.reduce((pre: Record<string, any>[], cur) => {
      const { r, x, dx, y, dy, rot, td } = cur;
      if (r > 0) {
        pre.push({
          ...cur,
          x: x + dx,
          y: y + dy,
          rot: rot + td,
          r: r - 0.015,
        });
      }
      return pre;
    }, []);
    if (!isEqual(newAry, starAry)) {
      setStarAry(newAry);
    }
  });
  // 添加当前位置星星数据
  const addStarts = useMemoizedFn((e) => {
    // 每移动触发一次事件给arr数组添加一个星星
    setStarAry((preState) => {
      return [
        ...preState,
        {
          // x是初始横坐标
          x: e.clientX,
          //y是初始纵坐标
          y: e.clientY,
          //r是星星里面那个小圆半径，哪来的小圆等会说
          r: Math.random() * 0.5 + 1.5,
          //运动时旋转的角度
          td: Math.random() * 4 - 2,
          // X轴移动距离
          dx: Math.random() * 2 - 1,
          // y轴移动距离
          dy: Math.random() * 1 + 1,
          // 初始的旋转角度
          rot: Math.random() * 90 + 90,
          // 颜色
          color: getRandomColor(),
        },
      ];
    });
  });

  // 让画布自适应窗口大小，这个复制即可
  const resizeCanvas = useMemoizedFn(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  });

  useEventListener('resize', () => {
    resizeCanvas();
  });

  useMount(() => {
    resizeCanvas();
  });

  useEventListener('mousemove', (e) => {
    // 添加星星数据
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      addStarts(e);

      //设置 动画 内效果
      for (let index = 0; index < 200; index++) {
        if (index === 0 && timeoutList.length > 0) {
          for (const timeoutName of timeoutList) {
            clearTimeout(timeoutName);
          }
        }
        timeoutList[index] = setTimeout(() => {
          //清屏
          ctx.clearRect(
            0,
            0,
            canvasRef.current?.width || 0,
            canvasRef.current?.height || 0,
          );
          //绘制
          draw();
          //更新
          update();
        }, index * 15);
      }
    }
  });

  return createPortal(<MyCanvas ref={canvasRef} />, document.body);
};

export default memo(StarCanvas);

const MyCanvas = styled.canvas`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  pointer-events: none;
`;
