import { UmiApiRequest, UmiApiResponse } from '@umijs/max';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken, prismaErrorCatch } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'POST':
      prismaErrorCatch(res, async (prisma: PrismaClient) => {
        console.log('req.body:', req.body);
        const user = await prisma.user.findUnique({
          where: { email: req.body.email },
        });
        console.log('user', user);
        if (
          !user ||
          !bcrypt.compareSync(req.body.password, user.passwordHash)
        ) {
          return res.status(401).json({
            message: 'Invalid email or password',
          });
        }
        res
          .status(200)
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
