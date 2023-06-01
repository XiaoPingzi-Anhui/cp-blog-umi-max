import { useState } from 'react';
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
  const [articleInfos, setArticleInfos] = useState<ArticleInfosType>({
    articleLists: {},
    allCategories: [],
    allLabels: [],
  });

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

        setArticleInfos({
          articleLists,
          allCategories: Object.keys(articleLists),
          allLabels: Array.from(new Set(allLabels)),
        });
      }
    },
  });

  return { articleInfos, loading, error };
}
