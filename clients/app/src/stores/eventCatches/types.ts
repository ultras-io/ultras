import { FullFilterable } from 'stores/generateCRUD';

export type ParamType = {};

export type TCreateEventCatch = {
  eventId: ResourceIdentifier;
};

export type TDeleteEventCatch = {
  eventId: ResourceIdentifier;
};

export interface LoadAllParams extends FullFilterable {
  eventId: ResourceIdentifier;
}
