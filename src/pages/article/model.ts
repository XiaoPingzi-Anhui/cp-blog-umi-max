import { useState } from 'react';

export type ArticlesObj = Record<string, API.ArticleInfo[]>;

export default function ArticleModel() {
  const [allArticles, setAllArticles] = useState<ArticlesObj>({});
  const [filterArticles, setFilterArticles] = useState<ArticlesObj>({});
  const [searchArticles, setSearchArticles] = useState<ArticlesObj>({});
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  return {
    allArticles,
    filterArticles,
    searchArticles,
    allLabels,
    allCategories,
    setAllArticles,
    setFilterArticles,
    setSearchArticles,
    setAllLabels,
    setAllCategories,
  };
}
