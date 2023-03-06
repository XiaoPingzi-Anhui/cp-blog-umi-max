import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken, prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'POST':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        console.log('req.body:', req.body);
        console.log('prisma.body:', prisma);
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
            passwordHash: bcrypt.hashSync(password, 8),
            username,
            sex,
            phoneNumber,
            avatarUrl,
            likeArticlesId: '',
          },
        });
        res
          .status(201)
          .setCookie('token', await signToken(user.userId))
          .json({ ...user, passwordHash: undefined });
      });
      break;
    default:
      res.status(405).json({
        error: 'Method not allowed,Only the POST method is supported!',
      });
  }
}
