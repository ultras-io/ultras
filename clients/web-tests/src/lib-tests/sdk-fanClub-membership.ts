import {
  ApiResponseType,
  FanClubMembershipSDK,
  FanClubMembersViewModel,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

const sdk = new FanClubMembershipSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const fanClubId = 2;

  const params = {
    search: 'barcelona',
  };

  return sdk
    .getAll(fanClubId, params)
    ?.then(
      (memberships: ApiResponseType<FanClubMembersViewModel, ListResponseMetaType>) => {
        console.log('FanClubMembershipSDk.getAll():', {
          params,
          result: memberships,
        });
      },
    )
    ?.catch((err: any) => {
      console.error('FanClubMembershipSDk.getFanClubMemberships():', {
        params,
        error: err,
      });
    });
};
