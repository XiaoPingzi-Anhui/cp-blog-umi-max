import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import { prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'GET':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        const user = await prisma.user.findUnique({
          where: { userId: +req.params.userId },
        });
        if (user) res.status(200).json(user);
        else res.status(404).json({ error: 'User not found.' });
      });
      break;
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the GET method is supported!',
      });
  }
}
