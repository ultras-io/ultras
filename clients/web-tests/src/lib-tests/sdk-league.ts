import {
  ApiResponseType,
  LeagueSDK,
  LeaguesViewModel,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

const sdk = new LeagueSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    countryId: 494,
  };

  return sdk
    .getLeagues(params)
    ?.then((leagues: ApiResponseType<LeaguesViewModel, ListResponseMetaType>) => {
      console.log('LeagueSDK.getLeagues():', {
        params,
        result: leagues,
      });
    })
    ?.catch((err: any) => {
      console.error('LeagueSDK.getLeagues():', {
        params,
        error: err,
      });
    });
};
