import { Injectable } from '@nestjs/common';
import { HttpClient } from '@domain/repositories/http-client.repository';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService implements HttpClient {
  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, options);
    return response.data;
  }
}
