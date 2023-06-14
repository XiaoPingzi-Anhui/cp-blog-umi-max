import { useMemo } from 'react';
import {
  CommentOutlined,
  CustomerServiceOutlined,
  QqOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { FloatButton, Popover, Image } from 'antd';
import qqImg from '@/assets/images/qq.png';
import weChartImg from '@/assets/images/weChart.png';
import S from './styles.module.less';

const SHOW_LIST = ['qq', 'weChart'];

export default function ContactWebmaster() {
  const showDom = useMemo(
    () =>
      SHOW_LIST.map((item, i) => (
        <Popover
          key={i}
          content={
            <div>
              <Image width={100} src={item === 'qq' ? qqImg : weChartImg} />
              <p>
                {`扫码添加作者${item === 'qq' ? 'QQ' : '微信'}，一起交流学习，`}
                <strong>
                  请添加备注，说明是通过《菜狗搬砖》小站途径添加！否则作者可能不会通过验证！
                </strong>
              </p>
            </div>
          }
          placement="leftBottom"
          overlayClassName={S['pop-overlay']}
        >
          <FloatButton
            icon={item === 'qq' ? <QqOutlined /> : <WechatOutlined />}
          />
        </Popover>
      )),
    [],
  );

  return (
    <FloatButton.Group
      className={S['float-button-group']}
      trigger="hover"
      shape="square"
      description="联系站长"
      icon={null}
      style={{ bottom: 96 }}
    >
      {showDom}
    </FloatButton.Group>
  );
}
