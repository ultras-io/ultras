export type Interceptor = <T>(data: T, headers?: Object) => T;

export enum HttpRequestMethods {
  'GET' = 'GET',
  'PUT' = 'PUT',
  'HEAD' = 'HEAD',
  'POST' = 'POST',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
  'OPTION' = 'OPTION',
}

export type RequestOptions = {
  method?: HttpRequestMethods;
};
