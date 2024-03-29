import {
  ApiResponseType,
  ListResponseMetaType,
  VenueSDK,
  VenuesViewModel,
} from '@ultras/core-api-sdk';

const sdk = new VenueSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    countryId: 328,
    name: 'arena',
  };

  return sdk
    .getVenues(params)
    ?.then((venues: ApiResponseType<VenuesViewModel, ListResponseMetaType>) => {
      console.log('VenueSDK.getVenues():', {
        params,
        result: venues,
      });
    })
    ?.catch((err: any) => {
      console.error('VenueSDK.getVenues():', {
        params,
        error: err,
      });
    });
};
