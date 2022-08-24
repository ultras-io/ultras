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

type ParamType<TScheme> = InitStoreParamsInterface<FanClubMemberViewModel, TScheme>;
type FilterType = Filterable<GetFanClubMembershipsFilter>;

type TDeleteEvent = {
  fanClubId: ResourceIdentifier;
  membershipId: ResourceIdentifier;
};

interface LoadAllParams extends FullFilterable<GetFanClubMembershipsFilter> {
  fanClubId: number;
}

const sdk = new FanClubMembershipSDK('dev');

const buildFanClubMembersStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    FanClubMemberViewModel,
    FanClubMemberViewModel,
    ResourceIdentifier,
    FanClubMemberViewModel,
    TDeleteEvent,
    FilterType,
    TScheme,
    'list' | 'delete'
  >({
    keys: ['list', 'delete'],
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

    // create: (data: Partial<FanClubViewModel>) => {
    //   return sdk.create(data);
    // },

    remove: (data: TDeleteEvent) => {
      return sdk.leaveFanClub(data.fanClubId, data.membershipId);
    },
  });
};

export default buildFanClubMembersStore;
