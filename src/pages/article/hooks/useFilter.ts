import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { FilterWay } from '../lists/filter/filter';
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
}

export default function useFilter({
  checkedCategory,
  checkedLabel,
  titleKey,
  type,
}: Props) {
  const { allArticles, setSearchArticles, setFilterArticles } = useModel(
    'article.model',
    ({ allArticles, setSearchArticles, setFilterArticles }) => ({
      allArticles,
      setSearchArticles,
      setFilterArticles,
    }),
  );

  useEffect(() => {
    const getCategory = (lists: any[]) =>
      lists.reduce((pre, cur) => {
        const curCategory = cur.category ? cur.category : '其他';
        if (pre[curCategory]) pre[curCategory].push(cur);
        else pre[curCategory] = [cur];
        return pre;
      }, {} as ArticleListsType);

    const articles = Object.values(allArticles).flat();
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
