import {
  RoomViewModel,
  RoomSDK,
  ResourceIdentifier,
  GetRoomsFilter,
} from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<RoomViewModel>;
type FilterType = Filterable<GetRoomsFilter>;

const sdk = new RoomSDK('dev');

const buildRoomsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    RoomViewModel,
    RoomViewModel,
    null,
    null,
    ResourceIdentifier,
    FilterType,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetRoomsFilter>) => {
      return sdk.getRooms({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getRoom(id);
    },
  });
};

export default buildRoomsStore;
