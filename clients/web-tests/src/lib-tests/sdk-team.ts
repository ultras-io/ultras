import {
  ApiResponseType,
  ListResponseMetaType,
  TeamSDK,
  TeamsViewModel,
} from '@ultras/core-api-sdk';

const sdk = new TeamSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    cityId: 61,
  };

  return sdk
    .getTeams(params)
    ?.then((teams: ApiResponseType<TeamsViewModel, ListResponseMetaType>) => {
      console.log('TeamSDK.getTeams():', {
        params,
        result: teams,
      });
    })
    ?.catch((err: any) => {
      console.error('TeamSDK.getTeams():', {
        params,
        error: err,
      });
    });
};
