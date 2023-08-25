export const encodeStr = (showText: string, encryptText: string) => {
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
};

export const decodeStr = (cipherText: string) => {
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
};

let inputFile: HTMLElement;

const handleAttribute = (inputFile: Element, multiple: boolean) => {
  if (multiple) inputFile.setAttribute('multiple', 'multiple');
  else inputFile.removeAttribute('multiple');
};

// 创建input标签
const createInputFile = (multiple: boolean) => {
  inputFile = document.createElement('input');
  inputFile.setAttribute('id', 'myInput');
  inputFile.setAttribute('type', 'file');
  inputFile.setAttribute('accept', 'image/jpeg,image/jpg,image/png');
  inputFile.setAttribute('name', 'file');
  handleAttribute(inputFile, multiple);
  inputFile.setAttribute('style', 'display: none');
  document.body.appendChild(inputFile);
};

const pushFile = (e: any) => {
  const urlArr = [];
  for (let i = 0; i < e.target!.files.length; i += 1)
    urlArr.push(URL.createObjectURL(e.target.files[i]));
  return urlArr;
};

export const getFiles = (multiple = true): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
    if (document.getElementById('myInput')) {
      inputFile = document.getElementById('myInput')!;
      await handleAttribute(inputFile, multiple);
    } else createInputFile(multiple);
    inputFile.onchange = (e) => {
      const files: string[] = pushFile(e);
      files.length > 0 ? resolve(files) : reject(new Error('没有选择文件'));
    };
    inputFile.click();
  })

