import { Divider, Space, Popover, Image } from 'antd';

import { QqOutlined, WechatOutlined } from '@ant-design/icons';
import qqImg from '@/assets/images/qq.png';
import weChartImg from '@/assets/images/weChart.png';
import S from './login.less';

const showList = ['qq', 'weChart'];

export default function Actions() {
  return (
    <div className={S['action-wrapper']}>
      <Divider plain>
        <span
          style={{ color: '#141414', fontWeight: 'normal', fontSize: 14 }}
          onClick={() => {
            fetch('/api/users1');
          }}
        >
          联系站长
        </span>
      </Divider>

      <Space /* size={24} */>
        {showList.map((item, i) => (
          <Popover
            key={i}
            content={
              <div>
                <Image width={100} src={item === 'qq' ? qqImg : weChartImg} />
                <p>
                  请妥善保管自己的账号密码！本站暂不提供找回密码功能，如需找回密码请联系菜狗站长！
                  {`扫码添加作者${
                    item === 'qq' ? 'QQ' : '微信'
                  }，一起交流学习，`}
                  <strong>
                    请添加备注，说明是通过《菜狗搬砖》小站途径添加！否则作者可能不会通过验证！
                  </strong>
                </p>
              </div>
            }
            trigger="hover"
            overlayClassName={S['pop-overlay-wrapper']}
          >
            {item === 'qq' ? (
              <QqOutlined className={S['contact-icon']} />
            ) : (
              <WechatOutlined className={S['contact-icon']} />
            )}
          </Popover>
        ))}
      </Space>
    </div>
  );
}
