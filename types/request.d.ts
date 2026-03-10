type ApiRequest = {
  path: string[];
  /**
   * URL Parameters
   */
  params?: Record<string, string | number | boolean>;

  body?: unknown;

  headers?: Record<string, string>;

  /**
   * Timeout for this request in milliseconds. Overrides the client-level timeout.
   * @default 10_000
   */
  timeout?: number;
};
