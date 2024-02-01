export const CARDS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const FLOWER_CARDS = ['J', 'Q', 'K'];

export const ALL_CARDS = CARDS.reduce(
  (pre, cur) => [...pre, ...new Array(4).fill(cur)],
  [] as string[],
);

console.log('length', ALL_CARDS.length);

/**
 * 获取牌对应的大小
 * @param card
 * @returns 牌值
 */
const getNumber = (card: string) => {
  const i = CARDS.findIndex((item) => item === card) + 1;
  return i > 10 ? 10 : i;
};

/**
 *
 * @param cards
 */
export const getResults = (cards: string[]) => {
  /* 校验牌 */
  if (cards.length !== 5) return '未满五张牌！';
  const illegalCard: string[] = [];
  const filterCards = Array.from(new Set(cards));
  cards.forEach((card) => !CARDS.includes(card) && illegalCard.push(card));

  if (illegalCard.length || filterCards.length < 2)
    return `非法牌${illegalCard.join(' ')}`;

  const numbers = cards.map((card) => getNumber(card));

  if (
    numbers.every((card) => card < 5) &&
    numbers.reduce((pre, cur) => pre + cur, 0) < 10
  )
    return '五小牛，10倍！';

  if (
    filterCards.length === 2 &&
    [1, 4].includes(cards.filter((card) => card === filterCards[0]).length)
  )
    return '炸弹，6倍！';

  const flowerCount = cards.reduce(
    (pre, cur) => (FLOWER_CARDS.includes(cur) ? ++pre : pre),
    0,
  );

  if (flowerCount === 5) return '五花牛，5倍！';

  if (flowerCount === 4 && cards.includes('10')) return '四花牛，4倍！';

  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 4; j++) {
      for (let k = j + 1; k < 5; k++) {
        if ((numbers[i] + numbers[j] + numbers[k]) % 10 === 0) {
          const last = [0, 1, 2, 3, 4].filter(
            (item) => ![i, j, k].includes(item),
          );
          const modNumber = (numbers[last[0]] + numbers[last[1]]) % 10;
          return `(${cards[i]} ${cards[j]} ${cards[k]}) | (${cards[last[0]]} ${
            cards[last[1]]
          }), 牛${modNumber === 0 ? '牛' : modNumber}， ${
            modNumber === 0 ? 3 : modNumber === 9 ? 2 : 1
          }倍！`;
        }
      }
    }
  }

  return '没牛，下次加油！';
};

/**
 * 生成一个 [ min, max ] 范围内的随机整数
 * @param min
 * @param max
 * @returns
 */
export const getRangeRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 生成 num 个 [ min, max ] 范围内的随机整数,且不重复
 * @param num
 * @param min
 * @param max
 */
export const getUniqueRandoms = (num: number, min: number, max: number) => {
  const results = new Set<number>();

  while (results.size < num) {
    results.add(getRangeRandom(min, max));
  }
  return Array.from(results);
};
