import { ApiResponseType, UserSDK, UserViewModel } from '@ultras/core-api-sdk';

const sdk = new UserSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const userId = 1;

  return sdk
    .getProfile(userId)
    ?.then((users: ApiResponseType<UserViewModel>) => {
      console.log('UserSDK.getProfile():', {
        userId,
        result: users,
      });
    })
    ?.catch((err: any) => {
      console.error('UserSDK.getUsers():', {
        userId,
        error: err,
      });
    });
};
