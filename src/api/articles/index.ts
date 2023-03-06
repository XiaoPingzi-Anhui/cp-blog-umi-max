import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import { verifyToken, prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'GET':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        const allArticles = await prisma.article.findMany({
          include: { author: true },
        });
        if (allArticles) res.status(200).json(allArticles);
        else res.status(404).json({ error: 'Article not found.' });
      });
      break;

    case 'POST': {
      if (!req.cookies?.token) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      const authorId = (await verifyToken(req.cookies.token)).id;
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        const { title, content, tags, categories } = req.body;
        const newPost = await prisma.article.create({
          data: {
            title: title,
            content: content,
            createdAt: new Date(),
            authorId,
            tags: tags.join(','),
            categories: categories.join(','),
          },
        });
        res.status(200).json(newPost);
      });

      break;
    }
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the GET/POST method is supported!',
      });
  }
}
