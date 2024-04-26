const acron = require('acorn');
// import { createAcron } from 'acron';

/**
 * 利用acorn库进行词法分析
 * @param {*} code 代码
 * @param {*} ecmaVersion ECMAScript的标准版本
 * @returns
 */
export const getToken = (code: string, ecmaVersion = '11') => {
  return [
    ...acron.tokenizer(code, {
      ecmaVersion,
      locations: true,
    }),
  ];
};

/**
 * 利用acorn库进行语法解析
 * @param {*} code 代码
 * @returns
 */
export const getAST = (code: string) => {
  return acron.parse(code);
};
