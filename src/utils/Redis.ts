import { create } from 'domain';
import { createClient } from 'redis';
import { getEnvironmentVariables } from '../environments/environment';

export const client = createClient(
      {
        // url: 'redis://' + getEnvironmentVariables().redis.host + ':' + getEnvironmentVariables().redis.port,
        username: getEnvironmentVariables().redis.username,
        password: getEnvironmentVariables().redis.password,
        socket: {
          host: getEnvironmentVariables().redis.host,
          port: getEnvironmentVariables().redis.port
        }
      }
    );

export class Redis {

  static  connectToRedis() {
    // this.client.on('err', (e) => console.log('Redis Client err', e));
    client.connect().then(() => {
      console.log('Connected to Redis');
    }
    ).catch((e) => {
      throw (e)
    });
  }

  static async setValue(key: string, value: string, expires_at?) {
    try {
      let options: any = {};
      if (expires_at) {
        options = {
          EX: expires_at,
        };
      }
      await client.set(key, value, options);
      return;
    } catch(e) {
      console.log(e);
      // throw new eor ('Server not connected! Please try again');
      throw ('Server not connected! Please try again');
    }
  }

  static async getValue(key: string) {
    try {
      const value = await client.get(key);
      return value;
    } catch(e) {
      console.log(e);
      // throw new eor ('User is not authorised');
      throw ('User is not authorised');
    }
  }

  static async deleteKey(key: string) {
    try {
      await client.del(key);
    } catch (e) {
      console.log(e);
      // throw new eor ('Server not connected! Please try again');
      throw ('Server not connected! Please try again');
    }
  }
}