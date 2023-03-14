import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import { signToken, prismaErrorCatch } from '@/utils/jwt';
import { ACCESS_TOKEN } from '@/constants';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'POST':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        const {
          email,
          authority,
          password,
          username,
          avatarUrl,
          sex,
          phoneNumber,
        } = req.body;
        const user = await prisma.user.create({
          data: {
            email,
            authority,
            passwordHash: password,
            username,
            sex,
            phoneNumber,
            avatarUrl,
            likeArticlesId: '',
          },
        });
        res
          .status(201)
          .setCookie(
            ACCESS_TOKEN,
            await signToken(user as unknown as API.UserInfo),
          )
          .json({ ...user, passwordHash: undefined });
      });
      break;
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the POST method is supported!',
      });
  }
}
