import xior, {
  isXiorError,
  type XiorError,
  type XiorInstance,
  type XiorInterceptorRequestConfig,
  type XiorRequestConfig,
} from 'xior';
import errorRetryPlugin from 'xior/plugins/error-retry';
import { rateLimitPlugin } from '@/utils/retry';

export class ApiError extends Error {
  url?: string;
  statusCode?: number;
  data?: unknown;

  constructor(err: XiorError) {
    super(err.message);
    this.url = (err.config?.baseURL ?? '') + (err.config?.url ?? '');
    this.statusCode = err.response?.status;
    this.data = err.response?.data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiClient {
  private httpClient: XiorInstance;
  private readonly baseURL: string;

  constructor(
    baseURL: string,
    config?: {
      timeout?: number;
      headers?: Record<string, string>;
      retryTimes?: number;
    },
  ) {
    this.baseURL = baseURL;
    this.httpClient = xior.create({
      baseURL: this.baseURL,
      timeout: config?.timeout ?? 10_000,
      headers: config?.headers,
    });

    this.httpClient.plugins.use(rateLimitPlugin(2, 334));

    this.httpClient.plugins.use(
      errorRetryPlugin({
        retryTimes: config?.retryTimes ?? 3,
        retryInterval: 1000,
        onRetry: (_config, error) => {
          const status = error.response?.status;
          return status === 429 || (!!status && status >= 500);
        },
      }),
    );
  }

  private async request<TResponse>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    req: ApiRequest,
  ): Promise<TResponse> {
    const xiorRequest: XiorRequestConfig = {
      method,
      url: `/${req.path.join('/')}`,
      headers: req.headers ?? {},
      params: req.params,
    };

    if (req.timeout) xiorRequest.timeout = req.timeout;

    if (req.body) {
      xiorRequest.data = req.body;
    }

    try {
      const res = await this.httpClient.request<TResponse>(xiorRequest);
      return res.data;
    } catch (err: unknown) {
      if (isXiorError(err)) {
        throw new ApiError(err);
      }
      throw err;
    }
  }

  public async get<TResponse = unknown>(req: ApiRequest): Promise<TResponse> {
    return this.request<TResponse>('GET', req);
  }

  public async post<TResponse = unknown>(req: ApiRequest): Promise<TResponse> {
    return this.request<TResponse>('POST', req);
  }

  public async put<TResponse = unknown>(req: ApiRequest): Promise<TResponse> {
    return this.request<TResponse>('PUT', req);
  }

  public async delete<TResponse = unknown>(
    req: ApiRequest,
  ): Promise<TResponse> {
    return this.request<TResponse>('DELETE', req);
  }

  public onRequest(
    fn: (
      config: XiorInterceptorRequestConfig,
    ) => Promise<XiorInterceptorRequestConfig> | XiorInterceptorRequestConfig,
  ): void {
    this.httpClient.interceptors.request.use(fn);
  }
}
