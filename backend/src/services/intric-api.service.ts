import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';
import { intricApiURL } from '@/utils/util';
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import ApiTokenService from './api-token.service';
import IntricApiTokenService from './intric-api-token.service';

class IntricApiResponse<T> {
  data: T;
  message: string;
}

class IntricApiService {
  private apiTokenService = new ApiTokenService();
  private intricApiTokenService = new IntricApiTokenService();
  private async request<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    // const token = await this.intricApiTokenService.getToken();

    const defaultHeaders = {
      // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const defaultParams = {};

    const preparedConfig: AxiosRequestConfig = {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
      params: { ...defaultParams, ...config.params },
      url: intricApiURL(config.url),
    };
    console.log(preparedConfig);
    try {
      const res = await axios<T>(preparedConfig);
      return { data: res.data, message: 'success' };
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 404) {
        throw new HttpException(404, 'Not found');
      }
      // NOTE: did you subscribe to the API called?
      console.log(error);
      logger.error('Error:', (error as AxiosError).message);
      throw new HttpException(500, 'Internal server error from gateway');
    }
  }

  public async get<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    console.log('GET to url', config.url);
    console.log('with headers:', JSON.stringify(config.headers));
    return this.request<T>({ ...config, method: 'GET' });
  }

  public async post<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    console.log('POST to url', config.url);
    return this.request<T>({ ...config, method: 'POST' });
  }

  public async patch<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  public async put<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  public async delete<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default IntricApiService;
