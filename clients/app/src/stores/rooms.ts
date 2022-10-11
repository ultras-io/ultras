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
  IInitStoreParams,
} from './generateCRUD';

type ParamType<TScheme> = IInitStoreParams<RoomViewModel, TScheme>;
type FilterType = Filterable<GetRoomsFilter>;

const sdk = new RoomSDK('dev');

const buildRoomsStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    RoomViewModel,
    RoomViewModel,
    null,
    null,
    ResourceIdentifier,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

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
