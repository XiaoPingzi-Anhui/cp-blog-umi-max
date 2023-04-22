// import { UmiApiResponse } from '@umijs/max';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import { TOKEN_VALIDITY_PERIOD } from '@/constants';

const secret = process.env.JWT_SECRET;

export function signToken(userInfo: API.UserInfo) {
  if (!secret)
    throw new Error('Environment variable JWT_SECRET is not defined!');
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { userInfo },
      secret,
      { expiresIn: TOKEN_VALIDITY_PERIOD },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      },
    );
  });
}

export function verifyToken(token: string) {
  if (!secret)
    throw new Error('Environment variable JWT_SECRET is not defined!');
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err || !payload || !payload) return reject(err);
      resolve(payload as jwt.JwtPayload);
    });
  });
}

/* export async function prismaErrorCatch(
  res: UmiApiResponse,
  run: (prisma: PrismaClient) => void,
) {
  try {
    let prisma = new PrismaClient();
    run(prisma);
    await prisma.$disconnect();
  } catch (error) {
    return res.status(500).json({
      message: JSON.stringify(error),
    });
  }
}
 */
