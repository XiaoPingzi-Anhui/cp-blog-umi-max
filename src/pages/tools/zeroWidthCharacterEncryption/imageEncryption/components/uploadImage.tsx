import { useState, useRef, useEffect, FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { fabric } from 'fabric';
import { Image } from 'antd';
import { evenNum } from '../../utils';
import shortid from 'shortid';

export interface MyImageData extends ImageData {
  binaryList: string[][];
}
interface Props {
  preText: string;
  onUpload: (imageData: MyImageData | string) => void;
  dataUrlChange?: boolean;
  decrypt?: boolean;
}

export const SIZE = 800;
const WRAPPER_STYLE = {
  height: '160px',
  display: 'flex',
  alignItems: 'center',
};

const UploadImage: FC<Props> = ({
  preText,
  onUpload,
  dataUrlChange = false,
  decrypt = false,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = useMemoizedFn((e) => {
    if (e.target!.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      fabric.Image.fromURL(url, (img) => {
        const height = img.height;
        const width = img.width;
        if (height && width) {
          let scale = height > width ? SIZE / width : SIZE / height;
          const canvas = new fabric.Canvas(shortid(), {
            height: SIZE,
            width: SIZE,
            isDrawingMode: false, //自由绘画模式
            selection: false,
            hoverCursor: 'pointer',
          });
          const ctx = canvas.getContext();
          if (ctx) {
            img.set({
              left: SIZE / 2, //距离左边的距离
              originX: 'center', //图片在原点的对齐方式
              originY: 'center',
              top: SIZE / 2,
              scaleX: scale, //横向缩放
              scaleY: scale, //纵向缩放
              selectable: false, //可交互
            });

            img.on('added', (e) => {
              //这里有个问题,added后获取的是之前的画布像素数据,其他手动触发的事件,不会有这种问题
              //故用一个异步解决
              setTimeout(() => {
                if (dataUrlChange) {
                  onUpload(canvas.toDataURL('image/png' as any));
                } else {
                  let imageData: any = ctx.getImageData(0, 0, SIZE, SIZE);
                  if (decrypt) {
                    imageData.binaryList = Array.from(
                      imageData.data,
                      (color: any, index) => {
                        color = color.toString(2).padStart(8, '0').split('');
                        return color;
                      },
                    );
                  } else {
                    imageData.binaryList = Array.from(
                      imageData.data,
                      (color: any, index) => {
                        imageData.data[index] = evenNum(imageData.data[index]);
                        color = evenNum(color)
                          .toString(2)
                          .padStart(8, '0')
                          .split('');
                        return color;
                      },
                    );
                  }
                  onUpload(imageData);
                }
              }, 500);
            });
            canvas.add(img);
          }
        }
      });
    }
  });

  return (
    <div style={WRAPPER_STYLE}>
      {preText}
      <input
        ref={inputRef}
        onChange={onChange}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
      />
      {imageUrl && <Image height={150} src={imageUrl} />}
    </div>
  );
};

export default UploadImage;
