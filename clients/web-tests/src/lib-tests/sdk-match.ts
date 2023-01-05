import {
  ApiResponseType,
  ListResponseMetaType,
  MatchesViewModel,
  MatchSDK,
} from '@ultras/core-api-sdk';

const sdk = new MatchSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    date: '2022-01-12',
  };

  return sdk
    .getMatches(params)
    ?.then((matches: ApiResponseType<MatchesViewModel, ListResponseMetaType>) => {
      console.log('MatchSDK.getMatches():', {
        params,
        result: matches,
      });
    })
    ?.catch((err: any) => {
      console.error('MatchSDK.getMatches():', {
        params,
        error: err,
      });
    });
};
