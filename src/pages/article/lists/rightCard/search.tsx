import { useMemo, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useMemoizedFn } from 'ahooks';
import { AutoComplete, Input, Empty } from 'antd';
import searchPng from '@/assets/images/search.png';
import { ArticleListsType } from '../../hooks/useArticleLists';

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  .count-text {
    color: #0171f6;
  }
  .highlight-text {
    color: #fe3a2f;
  }
  p {
    margin-bottom: 0;
    line-height: 24px;
  }
`;

const MyInput = styled(Input)`
  box-shadow: none !important;
`;

export default function Search({
  onChange,
  searchKey,
  articleLists,
  setFilterArticles,
}: {
  onChange: (value: string) => void;
  searchKey: string;
  articleLists: ArticleListsType;
  setFilterArticles: Dispatch<SetStateAction<ArticleListsType>>;
}) {
  const options = useMemo(() => {
    const articleAry = Object.entries(articleLists);
    const articleCount = articleAry.reduce(
      (pre, cur) => pre + cur[1].length,
      0,
    );
    return searchKey
      ? [
          {
            value: `${searchKey}(查看所有结果)`,
            key: 'allOrEmpty',
            checkedArticle: articleLists,
            label:
              articleAry.length === 0 ? (
                <Empty />
              ) : (
                <ListItem>
                  <p>
                    共<span className="count-text">{articleCount}</span>条结果
                  </p>
                </ListItem>
              ),
          },
        ].concat(
          articleAry.map(([category, lists]) => ({
            value: `${searchKey}(查看${category}分类中的结果)`,
            key: category,
            checkedArticle: { [category]: lists },
            label: (
              <ListItem>
                <p>
                  在<span className="highlight-text">{category}</span>中有
                  <span className="count-text">{lists.length}</span>条结果
                </p>
              </ListItem>
            ),
          })),
        )
      : [];
  }, [articleLists, searchKey]);

  const onSelect = useMemoizedFn((value, option) => {
    setFilterArticles(option.checkedArticle);
  });

  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={options}
      onSelect={onSelect}
      onSearch={onChange}
      autoFocus
    >
      <MyInput
        placeholder="请输入关键字并点击下拉结果查看"
        prefix={<img src={searchPng} alt="" />}
        autoFocus
        allowClear
        bordered
      />
    </AutoComplete>
  );
}
