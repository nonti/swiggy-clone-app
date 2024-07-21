import * as jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/environment';
import * as Crypto from 'crypto';

export class Jwt {
  static jwtSign(payload, userId, expires_in: string = '1h') {
    //JwT Token generation is used once, only change if a token is know by another user
    // Jwt.gen_secret_key();
    return jwt.sign(
      payload,
      getEnvironmentVariables().jwt_secret_key,
      {
        expiresIn: expires_in,
        audience: userId.toString(),
        issuer: 'nonty',
      }
    );
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error('User is not Authorized.'));
          else resolve(decoded);
        }
      );
    });
  }

  static jwtSignRefreshToken(payload, userId, expires_in: string = '1y') {
    return jwt.sign(
      payload,
      getEnvironmentVariables().jwt_refresh_secret_key,
      {
        expiresIn: expires_in,
        audience: userId.toString(),
        issuer: 'nonty',
      }
    );
  }

  static jwtVerifyRefreshToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnvironmentVariables().jwt_refresh_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error('User is not Authorized.'));
          else resolve(decoded);
        }
      );
    });
  }

  private static gen_secret_key() {
    const DEV_access_token_secret_key = Crypto.randomBytes(32).toString('hex');
    const DEV_refresh_token_secret_key = Crypto.randomBytes(32).toString('hex');

    const PROD_access_token_secret_key = Crypto.randomBytes(32).toString('hex');
    const PROD_refresh_token_secret_key = Crypto.randomBytes(32).toString('hex');

    console.table(
      {
        DEV_access_token_secret_key,
        DEV_refresh_token_secret_key,
        PROD_access_token_secret_key,
        PROD_refresh_token_secret_key
      }
    );
  }
}
