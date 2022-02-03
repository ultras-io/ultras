import { Interceptor } from '../types';

const AuthTokenInterceptor: Interceptor = (body: any, headers: any) => {
  console.log({ body, headers });
  return body;
};

export default AuthTokenInterceptor;
