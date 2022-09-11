import { EventMemberViewModel, EventMemberSDK } from '@ultras/core-api-sdk';
import { generateCRUD } from '../generateCRUD';

import type {
  FilterType,
  LoadAllParams,
  ParamType,
  TCreateEventMember,
  TDeleteEventMember,
} from './types';

const sdk = new EventMemberSDK('dev');

const buildEventMembersStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    EventMemberViewModel,
    EventMemberViewModel,
    TCreateEventMember,
    EventMemberViewModel,
    TDeleteEventMember,
    FilterType,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: LoadAllParams) => {
      return sdk.getMembers(filter.eventId, {
        ...filter,
      });
    },

    create: (data: TCreateEventMember) => {
      return sdk.join(data.eventId);
    },

    remove: (data: TDeleteEventMember) => {
      return sdk.leave(data.eventId);
    },
  });
};

export default buildEventMembersStore;
