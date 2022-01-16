import config from 'screens';

export default {
  NETWORK_SERVICE: {
    ERRORS: {
      INVALID_REQUEST_PARAMS: 'Invalid request parameters.',
      INVALID_RESPONSE_DATA: 'Invalid Response Data',
      SERVER_IS_UNAVAILABLE: 'The server is unavailable.',
      RESPONSE_PARSING_ERROR: 'Unable to parse response.',
    },
    REQUEST_METHODS: {
      DELETE: 'delete',
      PATCH: 'patch',
      POST: 'post',
      PUT: 'put',
      GET: 'get',
    },
  },
  API_URL: config.apiURL,
};
