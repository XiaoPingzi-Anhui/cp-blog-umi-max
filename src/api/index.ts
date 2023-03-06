import { UmiApiRequest, UmiApiResponse } from '@umijs/max';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  res.status(200).json({
    posts_url: req.headers.host + '/api/articles',
    article_detail_url: req.headers.host + '/api/articles/{article_id}',
    users_url: req.headers.host + '/api/users',
    user_detail_url: req.headers.host + '/api/users/{user_id}',
  });
}
