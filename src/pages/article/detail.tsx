import { useParams } from '@umijs/max';

const ArticleDetail = () => {
  const params = useParams();
  console.log('params:', params);
  return <>ArticleDetail</>;
};

export default ArticleDetail;
