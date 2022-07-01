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

interface LoadAllParams extends FullFilterable<GetFanClubMembershipsFilter> {
  fanClubId: number;
}

const sdk = new FanClubMembershipSDK('dev');

const buildFanClubMembersStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    FanClubMemberViewModel,
    ResourceIdentifier,
    FanClubMemberViewModel,
    FilterType,
    'list'
  >({
    keys: ['list'],
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
  });
};

export default buildFanClubMembersStore;
