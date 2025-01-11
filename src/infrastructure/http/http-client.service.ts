import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

import { HttpClient } from '@domain/repositories/http-client.repository';

@Injectable()
export class HttpClientService implements HttpClient {
  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, options);
    return response.data;
  }
}
