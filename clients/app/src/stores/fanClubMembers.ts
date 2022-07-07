import {
  FanClubMemberViewModel,
  FanClubMembershipSDK,
  // ResourceIdentifier,
  GetFanClubMembershipsFilter,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<FanClubMemberViewModel>;
type FilterType = Filterable<GetFanClubMembershipsFilter>;

type TDeleteFanClubMember = {
  fanClubId: ResourceIdentifier;
  membershipId: ResourceIdentifier;
};

interface LoadAllParams extends FullFilterable<GetFanClubMembershipsFilter> {
  fanClubId: number;
}

const sdk = new FanClubMembershipSDK('dev');

const buildFanClubMembersStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    FanClubMemberViewModel,
    FanClubMemberViewModel,
    ResourceIdentifier,
    FanClubMemberViewModel,
    TDeleteFanClubMember,
    FilterType,
    'list' | 'delete'
  >({
    keys: ['list', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: LoadAllParams) => {
      // return sdk.getAll(filter.fanClubId, {
      return sdk.getAll(3, {
        ...filter,
      });
    },

    // loadSingle: (id: ResourceIdentifier) => {
    //   return sdk.getFanClub(id);
    // },

    // create: (data: Partial<FanClubViewModel>) => {
    //   return sdk.create(data);
    // },

    remove: (data: TDeleteFanClubMember) => {
      return sdk.leaveFanClub(data.fanClubId, data.membershipId);
    },
  });
};

export default buildFanClubMembersStore;
