import { TeamSdk } from '@ultras/core-api-sdk';

const sdk = new TeamSdk('dev');

export const runTest = () => {
  sdk
    .getTeams({ cityId: 61 })
    ?.then((teams: any) => {
      console.log('TeamSdk.getTeams({ cityId: 61 }):', teams);
    })
    ?.catch((err: any) => {
      console.error('TeamSdk.getTeams({ cityId: 61 }):', err);
    });
};
