import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
// import { Redis } from '@upstash/redis';
import { prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'GET': {
      /* const redis = Redis.fromEnv();
      let article = await redis.get('article-' + req.params.articlesId);
      if (article) {
        res.status(200).json(article);
        return;
      } */
      /* if (!article) { */
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        let article = await prisma.article.findUnique({
          where: { articlesId: +req.params.articlesId },
          include: { author: true },
        });
        if (article) res.status(200).json(article);
        else res.status(404).json({ error: 'Article not found.' });
        /* await redis.set(
          `article-${req.params.articlesId}`,
          JSON.stringify(article),
        ); */
      });
      /* } */
      break;
    }
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the GET method is supported!',
      });
  }
}
