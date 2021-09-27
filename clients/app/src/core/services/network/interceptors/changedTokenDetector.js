// @flow

import CacheService from '../../storage/CacheService';

export default (data: Object, headers: Object) => {
  const newToken = headers.get('token');
  const existingToken = CacheService.getAuthToken();
  if (newToken && newToken !== existingToken) {
    CacheService.setAuthToken(newToken);
  }

  return data;
};
