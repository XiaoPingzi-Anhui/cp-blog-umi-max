export function encodeStr(showText: string, encryptText: string) {
  const tempStrArr = showText.split('');
  tempStrArr.splice(
    1,
    0,
    encryptText
      .split('')
      .map((char) => char.codePointAt(0)!.toString(2))
      .join(' ')
      .split('')
      .map((binaryNum) => {
        if (binaryNum === '1') return String.fromCharCode(8203); // 零宽空格符&#8203;
        if (binaryNum === '0') return String.fromCharCode(8204); // 零宽不连字符&#8204;
        return String.fromCharCode(8205); // 空格 -> 零宽连字符&#8205;
      })
      .join(String.fromCharCode(8206)),
  );
  return tempStrArr.join('');
}

export function decodeStr(cipherText: string) {
  const text = cipherText.replace(/[\u200b-\u200f\uFEFF\u202a-\u202e]/g, '');
  const encryptText = cipherText.replace(
    /[^\u200b-\u200f\uFEFF\u202a-\u202e]/g,
    '',
  );
  return {
    carrierText: text,
    hiddenText: encryptText.length
      ? encryptText
          .split(String.fromCharCode(8206))
          .map((char) => {
            if (char === String.fromCharCode(8203)) return '1';
            if (char === String.fromCharCode(8204)) return '0';
            return String.fromCharCode(8205);
          })
          .join('')
          .split(String.fromCharCode(8205))
          .map((binaryNum) => String.fromCharCode(parseInt(binaryNum, 2)))
          .join('')
      : '',
  };
}
