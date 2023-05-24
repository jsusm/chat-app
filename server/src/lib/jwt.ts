import { User } from "../types.js";
import * as jose from 'jose'

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'secret')

export async function signJWT(user: User) {
  return await new jose.SignJWT({name: user.name})
    .setProtectedHeader({'alg': 'HS256' })
    .setSubject(user.id.toString())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(jwtSecret)
}

export async function verifyJWT(token: string) {
  const jwt = await jose.jwtVerify(token, jwtSecret);
  const userId = jwt.payload.sub;
  const userName = jwt.payload.name;
  if (!userId || typeof userName !== "string" || userName === "") {
    throw new jose.errors.JWTInvalid("invalid claims");
  }
  return { jwt, user: { id: parseInt(userId), name: userName } };
}
