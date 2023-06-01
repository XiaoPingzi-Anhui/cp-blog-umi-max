import { useMemo, FC } from 'react';
import { Collapse, Badge, Card, Tag, Col, Row } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { colorLists, tagColors } from '@/constants';
import { ARTICLE_DETAIL } from '@/constants/url';

const { Panel } = Collapse;

const MyCard = styled(Card)`
  .ant-card-head-title {
    font-size: larger;
  }
  svg {
    margin-right: 12px;
  }
`;

const MyCollapse = styled(Collapse)`
  .ant-collapse-header {
    font-size: large;
  }
  .ant-collapse-content-box {
    > div:nth-of-type(n + 2) {
      margin-top: 16px;
    }
  }
`;

const ArticleCollapse: FC<{
  filterArticles: Record<string, API.ArticleInfo[]>;
}> = ({ filterArticles }) => {
  const navigate = useNavigate();

  const articleAry = useMemo(
    () =>
      Object.entries(filterArticles).sort((a, b) =>
        b[0].localeCompare(a[0], 'zh'),
      ),
    [filterArticles],
  );

  return (
    <MyCollapse defaultActiveKey={articleAry?.[0]?.[0] ?? ''}>
      {articleAry.map(([category, articles], i) => (
        <Panel header={category} key={category}>
          {articles.map(
            ({ title, category, _id, readCount, labels, createdAt }) => (
              <Badge.Ribbon text={category} key={_id} color={colorLists[i]}>
                <MyCard
                  hoverable
                  title={title}
                  size="small"
                  onClick={() => navigate(`${ARTICLE_DETAIL}/${_id}`)}
                >
                  <Row>
                    <Col span={8}>
                      发布时间：{dayjs(createdAt).format('YYYY-MM-DD')}
                    </Col>
                    <Col span={14}>
                      {labels ? (
                        <>
                          标签：
                          {labels?.split(',')?.map((item, i) => (
                            <Tag
                              key={i}
                              color={
                                tagColors[
                                  Math.floor(Math.random() * tagColors.length)
                                ]
                              }
                            >
                              {item}
                            </Tag>
                          ))}
                        </>
                      ) : null}
                    </Col>
                    <Col span={2}>
                      <EyeOutlined />
                      {readCount}
                    </Col>
                  </Row>
                </MyCard>
              </Badge.Ribbon>
            ),
          )}
        </Panel>
      ))}
    </MyCollapse>
  );
};

export default ArticleCollapse;