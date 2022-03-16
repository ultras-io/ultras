import { FanClubSDK } from '@ultras/core-api-sdk';

const sdk = new FanClubSDK('dev');

export const runTest = () => {
  const params = {
    teamId: 23,
  };

  return sdk
    .getFanClubs(params)
    ?.then((fanClubs: any) => {
      console.log('FanClubSDk.getFanClubs():', {
        params,
        result: fanClubs,
      });
    })
    ?.catch((err: any) => {
      console.error('FanClubSDk.getFanClubs():', {
        params,
        error: err,
      });
    });
};
