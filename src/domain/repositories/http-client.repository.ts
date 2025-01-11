export interface HttpClient {
  get<T>(url: string, options?: unknown): Promise<T>;
}
