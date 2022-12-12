import { FullFilterable } from 'stores/generateCRUD';

export type ParamType = {};

export type TCreateRoomCatch = {
  roomId: ResourceIdentifier;
};

export type TDeleteRoomCatch = {
  roomId: ResourceIdentifier;
};

export interface LoadAllParams extends FullFilterable {
  roomId: ResourceIdentifier;
}
