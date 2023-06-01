import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterWay } from '../lists/rightCard/filter';
import { ArticleListsType } from './useArticleLists';

interface Props {
  /** 选中的分类 */
  checkedCategory: string[];
  /** 选中的标签 */
  checkedLabel: string[];
  /** 标题搜索关键字 */
  titleKey: string;
  /** 筛选的分类 */
  type: FilterWay;
  articleLists: ArticleListsType;
  setFilterArticles: Dispatch<SetStateAction<ArticleListsType>>;
  setSearchArticles: Dispatch<SetStateAction<ArticleListsType>>;
}

export default function useFilter({
  checkedCategory,
  checkedLabel,
  titleKey,
  type,
  articleLists,
  setFilterArticles,
  setSearchArticles,
}: Props) {
  useEffect(() => {
    const getCategory = (lists: any[]) =>
      lists.reduce((pre, cur) => {
        const curCategory = cur.category ? cur.category : '其他';
        if (pre[curCategory]) pre[curCategory].push(cur);
        else pre[curCategory] = [cur];
        return pre;
      }, {} as ArticleListsType);

    const articles = Object.values(articleLists).flat();
    switch (type) {
      case FilterWay.Category:
        setFilterArticles(
          getCategory(
            articles.filter((item) => checkedCategory.includes(item.category)),
          ),
        );
        break;
      case FilterWay.Label:
        setFilterArticles(
          getCategory(
            articles.filter((item) =>
              item.labels
                ? item.labels
                    .split(',')
                    .some((label) => checkedLabel.includes(label))
                : false,
            ),
          ),
        );
        break;
      case FilterWay.Title:
        setSearchArticles(
          getCategory(
            titleKey
              ? articles.filter((item) => item.title.includes(titleKey))
              : [],
          ),
        );
        break;
      default:
        break;
    }
  }, [type, checkedCategory, checkedLabel, titleKey]);
}
