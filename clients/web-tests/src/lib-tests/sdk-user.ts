import {
  ApiResponseType,
  ListResponseMetaType,
  UserSDK,
  UsersViewModel,
} from '@ultras/core-api-sdk';

const sdk = new UserSDK('dev');

export const runTest = () => {
  const userId = 1;

  return sdk
    .getProfile(userId)
    ?.then((users: ApiResponseType<UsersViewModel, ListResponseMetaType>) => {
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