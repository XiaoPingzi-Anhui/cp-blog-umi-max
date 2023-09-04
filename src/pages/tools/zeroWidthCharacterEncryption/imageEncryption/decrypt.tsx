import { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import UploadImage from './components/uploadImage';
import { useMemoizedFn } from 'ahooks';
import { Image } from 'antd';
import { onDownloadImage } from '../utils';

export default function Decrypt() {
  const canvasRef = useRef(document.createElement('canvas'));
  const [dataUrl, setDataUrl] = useState('');

  const onUpload = useMemoizedFn((data) => {
    const ctx = canvasRef.current.getContext('2d');

    let decryptImageData: any = [];

    for (let i = 0; i < data.binaryList.length; i += 8) {
      let tempColorData = [];
      for (let j = 0; j < 8; j++) {
        tempColorData.push(data.binaryList[i + j][7]);
      }
      decryptImageData.length <
        Math.pow(Math.floor(Math.sqrt(2560000 / 32)), 2) * 4 &&
        decryptImageData.push([...tempColorData]);
    }
    decryptImageData = Uint8ClampedArray.from(decryptImageData, (z: any) => {
      z = parseInt(z.join(''), 2);
      return z;
    });
    console.log(decryptImageData, 'decryptImageData');
    //需要注意的是putImageData的data的长度必须为两个边的乘积的4的倍数
    ctx?.putImageData(
      new ImageData(
        decryptImageData,
        Math.floor(Math.sqrt(2560000 / 8 / 4)),
        Math.floor(Math.sqrt(2560000 / 8 / 4)),
      ),
      0,
      0,
    );
    setDataUrl(canvasRef.current?.toDataURL());
  });

  const onDownload = useMemoizedFn(() => onDownloadImage(dataUrl));

  return (
    <PageContainer>
      <UploadImage
        preText={'请选择要解密的图片：'}
        onUpload={onUpload}
        decrypt
      />
      {dataUrl && (
        <>
          <button onClick={onDownload} style={{ marginRight: '10px' }}>
            下载解密图片
          </button>
          <Image height={200} src={dataUrl} />
        </>
      )}
    </PageContainer>
  );
}
