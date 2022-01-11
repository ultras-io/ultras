import { TeamSdk } from '@ultras/core-api-sdk';

const sdk = new TeamSdk('dev');

export const runTest = () => {
  const params = {
    cityId: 61,
  };

  sdk
    .getTeams(params)
    ?.then((teams: any) => {
      console.log('TeamSdk.getTeams():', {
        params,
        result: teams,
      });
    })
    ?.catch((err: any) => {
      console.error('TeamSdk.getTeams():', {
        params,
        error: err,
      });
    });
};
