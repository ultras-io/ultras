import {
  FanClubMemberViewModel,
  GetFanClubMembershipsFilter,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from './generateCRUD';
import { buildFanClubMembershipSDK } from './sdkBuilder/sdkBuilder';

type ParamType<TScheme> = IInitStoreParams<FanClubMemberViewModel, TScheme>;
type FilterType = Filterable<GetFanClubMembershipsFilter>;

type TDeleteFanClubMember = {
  fanClubId: ResourceIdentifier;
  membershipId?: ResourceIdentifier;
};
type TCreateFanClubMember = {
  fanClubId: ResourceIdentifier;
};
type TUpdateFanClubMember = {
  type: 'accept-invitation' | 'reject-invitation';
};

interface LoadAllParams extends FullFilterable<GetFanClubMembershipsFilter> {
  fanClubId: number;
}

const sdk = buildFanClubMembershipSDK();

const buildFanClubMembersStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    FanClubMemberViewModel,
    FanClubMemberViewModel,
    TCreateFanClubMember,
    TUpdateFanClubMember,
    TDeleteFanClubMember,
    FilterType,
    TScheme,
    'list' | 'add' | 'update' | 'delete'
  >({
    keys: ['list', 'add', 'update', 'delete'],
    ...(params as ParamType<TScheme>),

    loadAll: (filter: LoadAllParams) => {
      // return sdk.getAll(filter.fanClubId, {
      return sdk.getAll(3, {
        ...filter,
      });
    },

    // loadSingle: (id: ResourceIdentifier) => {
    //   return sdk.getFanClub(id);
    // },

    create: (data: TCreateFanClubMember) => {
      return sdk.requestJoin(data.fanClubId);
    },

    updateData: (fanClubId: ResourceIdentifier, data: TUpdateFanClubMember) => {
      if (data.type === 'accept-invitation') {
        return sdk.acceptInvitation(fanClubId);
      }
      if (data.type === 'reject-invitation') {
        return sdk.rejectInvitation(fanClubId);
      }
    },

    remove: (data: TDeleteFanClubMember) => {
      return sdk.leaveFanClub(data.fanClubId, data.membershipId);
    },
  });
};

export default buildFanClubMembersStore;
