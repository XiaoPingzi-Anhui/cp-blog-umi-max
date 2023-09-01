import { useEffect, useState, useRef } from 'react';
import { styled } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import UploadImage, { SIZE } from './components/uploadImage';
import { useMemoizedFn, useMount } from 'ahooks';
import { fabric } from 'fabric';

export default function ImageEncryption() {
  const [showImage, setShowImage] = useState<any>();
  const [encryptImage, setEncryptImage] = useState<any>();
  const canvasRef = useRef<any>();
  const [showDownload, setShowDownload] = useState(false);

  useMount(() => {
    canvasRef.current = new fabric.Canvas('encryptCanvas', {
      isDrawingMode: false, //自由绘画模式
      selection: false,
      hoverCursor: 'pointer',
    });
  });

  useEffect(() => {
    if (showImage && encryptImage) {
      let bigHiddenList: any[] = [];
      for (let i = 0; i < encryptImage.binaryList.length; i++) {
        bigHiddenList.push(...encryptImage.binaryList[i]);
      }
      showImage.binaryList.forEach((item: any, index: number) => {
        bigHiddenList[index] && (item[7] = bigHiddenList[index]);
      });
      showImage.data.forEach((item: any, index: number) => {
        showImage.data[index] = parseInt(
          showImage.binaryList[index].join(''),
          2,
        );
      });

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = SIZE;
      tempCanvas.height = SIZE;
      let ctx = tempCanvas.getContext('2d');
      ctx?.putImageData(showImage, 0, 0);
      fabric.Image.fromURL(tempCanvas.toDataURL(), (i) => {
        canvasRef.current?.clear();
        canvasRef.current?.add(i);
        canvasRef.current?.renderAll();
      });
    }
  }, [showImage, encryptImage]);

  const onEncryptImageUpload = useMemoizedFn((src) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    //小画布的长宽=大画布的像素/8后再开平方
    //因为需要八个像素的最低位才可以表示一个小画布的像素的RGBA值
    tempCanvas.width = Math.floor(Math.sqrt((SIZE * SIZE) / 8));
    tempCanvas.height = Math.floor(Math.sqrt((SIZE * SIZE) / 8));
    var image = new Image();
    image.src = src;
    if (tempCtx) {
      image.onload = () => {
        //绘制图像到临时的小画布
        tempCtx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
        let hiddenData: any = tempCtx.getImageData(
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
        );
        hiddenData.binaryList = Array.from(hiddenData.data, (color: any) => {
          color = color.toString(2).padStart(8, '0').split('');
          return color;
        });
        setEncryptImage(hiddenData);
      };
    }
  });

  const onDownload = useMemoizedFn(() => {
    const dataURL = canvasRef.current.toDataURL({
      width: SIZE,
      height: SIZE,
      left: 0,
      top: 0,
      format: 'png',
    });
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  return (
    <PageContainer>
      <UploadImage
        preText={'请选择要加密的图片 ：'}
        onUpload={onEncryptImageUpload}
        dataUrlChange
      />

      <UploadImage preText={'请选择要加密的图片 ：'} onUpload={setShowImage} />
      {showDownload && (
        <>
          <button onClick={onDownload}>下载加密图片</button>
          <canvas
            id="encryptCanvas"
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
          ></canvas>
        </>
      )}
    </PageContainer>
  );
}

const TextWrapper = styled.div``;
