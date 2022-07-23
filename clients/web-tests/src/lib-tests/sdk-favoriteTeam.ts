import {
  ApiResponseType,
  FavoriteTeamSDK,
  ListResponseMetaType,
  TeamsViewModel,
} from '@ultras/core-api-sdk';

const sdk = new FavoriteTeamSDK('dev');

export const runTest = () => {
  const params = {
    search: 'colombia',
  };

  return sdk
    .getFavoriteTeams(params)
    ?.then((favoriteTeams: ApiResponseType<TeamsViewModel, ListResponseMetaType>) => {
      console.log('FavoriteTeamSDK.getFavoriteTeams():', {
        params,
        result: favoriteTeams,
      });
    })
    ?.catch((err: any) => {
      console.error('FavoriteTeamSDK.getFavoriteTeams():', {
        params,
        error: err,
      });
    });
};
