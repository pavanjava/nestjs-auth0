import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import jwt from 'express-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { type } from 'os';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  exp: number;
  iss: string;
  aud: string;
  iat: number;
  cid: string;
  scp: string[];
};

@Injectable()
export class AuthorizationGuard extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI,
      }),
      issuer: process.env.ISS,
      audience: process.env.ISS,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
