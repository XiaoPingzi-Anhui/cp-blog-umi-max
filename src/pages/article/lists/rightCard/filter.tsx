import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useMemoizedFn, useDebounceFn } from 'ahooks';
import { Segmented, Tag } from 'antd';
import categoryPgn from '@/assets/images/category.png';
import labelPng from '@/assets/images/label.png';
import searchPng from '@/assets/images/search.png';
import useFilter from '../../hooks/useFilter';
import Search from './search';

import {
  ArticleInfosType,
  ArticleListsType,
} from '../../hooks/useArticleLists';

export enum FilterWay {
  Category = '按分类筛选',
  Label = '按标签筛选',
  Title = '按标题搜索',
}

const FilterContent = styled.div`
  padding: 10px 0;
  height: 56px;
  .ant-tag {
    margin-bottom: 6px;
  }
  .ant-tag-checkabel-checked {
    background-color: #44cef6;
  }
  .ant-tag-checkabel:active {
    background-color: #177cb0;
  }
`;

const { CheckableTag } = Tag;

interface FilterProps extends ArticleInfosType {
  setFilterArticles: Dispatch<SetStateAction<ArticleListsType>>;
}

const Filter: FC<FilterProps> = ({
  articleLists,
  allCategories,
  allLabels,
  setFilterArticles,
}) => {
  const [segmentValue, setSegmentValue] = useState(FilterWay.Category);
  const [checkedCategory, setCheckedCategory] = useState(allCategories);
  const [checkedLabel, setCheckedLabel] = useState(allLabels);
  const [searchKey, setSearchKey] = useState('');
  const [searchArticles, setSearchArticles] =
    useState<ArticleListsType>(articleLists);

  useFilter({
    checkedCategory,
    checkedLabel,
    titleKey: searchKey,
    type: segmentValue,
    articleLists,
    setFilterArticles,
    setSearchArticles,
  });

  useEffect(() => {
    setCheckedCategory(allCategories);
    setCheckedLabel(allLabels);
  }, [allCategories, allLabels]);

  const selectTags = useMemoizedFn((type: FilterWay) => {
    let info = {
      allList: allCategories,
      checked: checkedCategory,
      setValue: setCheckedCategory,
    };
    if (type === FilterWay.Label)
      info = {
        allList: allLabels,
        checked: checkedLabel,
        setValue: setCheckedLabel,
      };
    const { allList, checked, setValue } = info;

    return allList.map((tag) => (
      <CheckableTag
        key={tag}
        checked={checked.includes(tag)}
        onChange={(value) => {
          if (value) setValue((pre) => [...pre, tag]);
          else {
            if (checked.length > 1)
              setValue((pre) => pre.filter((item) => item !== tag));
          }
        }}
      >
        {tag}
      </CheckableTag>
    ));
  });

  const { run: onChange } = useDebounceFn(
    (value: string) => setSearchKey(value),
    {
      wait: 500,
    },
  );

  return (
    <>
      <Segmented
        options={[
          {
            label: FilterWay.Category,
            value: FilterWay.Category,
            icon: <img src={categoryPgn} alt="" />,
          },
          {
            label: FilterWay.Label,
            value: FilterWay.Label,
            icon: <img src={labelPng} alt="" />,
          },
          {
            label: FilterWay.Title,
            value: FilterWay.Title,
            icon: <img src={searchPng} alt="" />,
          },
        ]}
        defaultValue={segmentValue}
        onChange={(value) => {
          setSegmentValue(value as FilterWay);
          setFilterArticles(articleLists);
        }}
      />
      {segmentValue === FilterWay.Title ? (
        <FilterContent>
          <Search
            onChange={onChange}
            searchKey={searchKey}
            articleLists={searchArticles}
            setFilterArticles={setFilterArticles}
          />
        </FilterContent>
      ) : (
        <FilterContent>{selectTags(segmentValue)}</FilterContent>
      )}
    </>
  );
};

export default Filter;
