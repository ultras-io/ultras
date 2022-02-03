export type Interceptor = <T = any>(body: T, headers?: Record<string, any>) => T;
