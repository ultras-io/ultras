const ENVS = {
  production: 'production',
  staging: 'staging',
  development: 'development',
  test: 'test',
};

const HTTP_STATUS_METHODS = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  serviceNotAvailable: 503,
};

export { ENVS, HTTP_STATUS_METHODS };
