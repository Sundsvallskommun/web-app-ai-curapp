import qs from 'qs';
import axios from 'axios';
import { CLIENT_KEY, CLIENT_SECRET, INTRIC_API_BASE_URL, INTRIC_API_BASE_PATH } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@utils/logger';

export interface Token {
  access_token: string;
  expires_in: number;
}

interface JwtPayload {
  sub: string;
  username: string;
  iss: string;
  iat: number;
  exp: number;
}

// NOTE: save token in memory only for now
let c_access_token = '';
let c_token_expires = 0;

class IntricApiTokenService {
  public async getToken(): Promise<string> {
    if (Date.now() >= c_token_expires) {
      logger.info('Getting oauth API token');
      await this.fetchToken();
    }
    return c_access_token;
  }

  public async setToken(token: Token) {
    c_access_token = token.access_token;
    // NOTE: Set timestamp for when we need to refresh minus 10 seconds for margin
    const b64payload = c_access_token.split('.')[1];
    const payload: JwtPayload = JSON.parse(Buffer.from(b64payload, 'base64').toString());
    console.log(payload);
    console.log('expires at', new Date(payload.exp * 1000));
    c_token_expires = Date.now() + (payload.exp * 1000 - 10000);
    // c_token_expires = Date.now() + (token.expires_in * 1000 - 10000);

    logger.info(`Token valid for: ${payload.exp}`);
    // logger.info(`Token valid for: ${token.expires_in}`);
    logger.info(`Current time: ${new Date()}`);
    logger.info(`Token expires at: ${new Date(c_token_expires)}`);
  }

  public async fetchToken(): Promise<string> {
    const authString = Buffer.from(`${CLIENT_KEY}:${CLIENT_SECRET}`, 'utf-8').toString('base64');

    try {
      const { data } = await axios({
        timeout: 30000, // NOTE: milliseconds
        method: 'POST',
        headers: {
          // Authorization: 'Basic ' + authString,
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
        data: qs.stringify({
          grant_type: '',
          // username: INTRIC_USERNAME,
          // password: INTRIC_PASSWORD,
          scope: '',
          client_id: '',
          client_secret: '',
        }),
        url: `${INTRIC_API_BASE_URL}/${INTRIC_API_BASE_PATH}/users/login/token/`,
      });
      const token = data as Token;

      if (!token) throw new HttpException(502, 'Bad Gateway');
      console.log(token);
      this.setToken(token);

      return this.getToken();
    } catch (error) {
      logger.error(`Failed to fetch JWT access token: ${JSON.stringify(error)}`);
      throw new HttpException(502, 'Bad Gateway');
    }
  }
}

export default IntricApiTokenService;
