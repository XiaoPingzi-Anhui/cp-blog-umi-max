// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

/**
 * 随机获得一个范围内的浮点数
 * @param start
 * @param end
 * @returns {*}
 */
function randFloat(start: number, end: number) {
  return start + Math.random() * (end - start);
}

/**
 * 随机获得一个范围内的整数
 * @param start
 * @param end
 * @returns {*}
 */
function randInt(start: number, end: number) {
  return Math.floor(Math.random() * (end - start)) + start;
}

export function createVerificationCode() {
  let selfWidth = 90,
    selfHeight = 30,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d')!,
    temp = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
    vCode = '',
    color = `rgb(${randInt(1, 120)},${randInt(1, 120)},${randInt(1, 120)})`;

  canvas.width = selfWidth;
  canvas.height = selfHeight;
  ctx.fillStyle = '#f3fbfe';
  ctx.fillRect(0, 0, selfWidth, selfHeight);
  ctx.globalAlpha = 0.8;
  ctx.font = '16px sans-serif';

  for (let _i = 0; _i < 10; _i++)
    ctx.fillStyle = `rgb(${randInt(150, 225)},${randInt(150, 225)},${randInt(
      150,
      225,
    )})`;

  ctx.font = 'bold 32px sans-serif';
  for (let i = 0; i < 4; i++) {
    let temp_index = randInt(0, temp.length);
    ctx.fillStyle = color;
    ctx.fillText(temp[temp_index], 5 + i * 23, 25);
    ctx.transform(
      randFloat(0.85, 1.0),
      randFloat(-0.04, 0),
      randFloat(-0.3, 0.3),
      randFloat(0.85, 1.0),
      0,
      0,
    );
    vCode += temp[temp_index];
  }

  ctx.beginPath();
  ctx.strokeStyle = color;
  let b = randFloat(selfHeight / 4, (3 * selfHeight) / 4),
    f = randFloat(selfHeight / 4, (3 * selfHeight) / 4),
    w = (2 * Math.PI) / randFloat(selfHeight * 1.5, selfWidth),
    linePoint = function (x: number) {
      return randFloat(10, selfHeight / 2) * Math.sin(w * x + f) + b;
    };

  ctx.lineWidth = 5;
  for (let x = -20; x < 200; x += 4) {
    ctx.moveTo(x, linePoint(x));
    ctx.lineTo(x + 3, linePoint(x + 3));
  }
  ctx.closePath();
  ctx.stroke();

  return {
    code: vCode.toLowerCase(),
    dataURL: canvas.toDataURL(),
  };
}
