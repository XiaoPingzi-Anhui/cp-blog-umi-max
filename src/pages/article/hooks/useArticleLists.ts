import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { getAllArticles } from '@/services/article';

export type ArticleListsType = Record<string, API.ArticleInfo[]>;

export interface ArticleInfosType {
  articleLists: ArticleListsType;
  allCategories: string[];
  allLabels: string[];
}

export default function useArticleLists() {
  const { setAllArticles, setFilterArticles, setAllLabels, setAllCategories } =
    useModel(
      'article.model',
      ({
        setAllArticles,
        setFilterArticles,
        setAllLabels,
        setAllCategories,
      }) => ({
        setAllArticles,
        setFilterArticles,
        setAllLabels,
        setAllCategories,
      }),
    );

  const { error, loading } = useRequest(getAllArticles, {
    onSuccess: (data) => {
      if (data?.data) {
        let allLabels: string[] = [];
        const articleLists = data.data
          /* 按发布时间倒序排列 */
          .sort((a, b) =>
            dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1,
          )
          .reduce((pre, cur) => {
            if (cur.labels) allLabels = allLabels.concat(cur.labels.split(','));
            const curCategory = cur.category ? cur.category : '其他';
            if (pre[curCategory]) pre[curCategory].push(cur);
            else pre[curCategory] = [cur];
            return pre;
          }, {} as ArticleListsType);

        setAllArticles(articleLists);
        setFilterArticles(articleLists);
        setAllCategories(Object.keys(articleLists));
        setAllLabels(Array.from(new Set(allLabels)));
      }
    },
  });

  return { loading, error };
}
