import { FC } from 'react';
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import { HOME_LINK } from '@/constants/url';

const NotFoundPage: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push(HOME_LINK)}>
        Back Home
      </Button>
    }
  />
);

export default NotFoundPage;
