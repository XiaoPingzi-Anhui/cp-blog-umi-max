import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import { prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'GET':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        const allUsers = await prisma.user.findMany({
          select: {
            userId: true,
            username: true,
            email: true,
            passwordHash: false,
          },
        });
        res.status(200).json(allUsers);
      });
      break;
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the GET method is supported!',
      });
  }
}
