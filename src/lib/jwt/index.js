import { verifyToken } from '../prisma';

export async function jwtAuthToken(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized: No token provided', status: 401 };
  }
  const token = authHeader.split(' ')[1];

  try {
    const isValidToken = await verifyToken(token);

    if (!isValidToken) {
      return { error: 'Unauthorized: Invalid token', status: 401 };
    }

    return { tokenPayload: isValidToken, token };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { error: 'Unauthorized: Token verification failed', status: 401 };
  }
}
