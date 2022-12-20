import { FullFilterable } from 'stores/generateCRUD';

export type ParamType = {};

export type TCreateMatchCatch = {
  matchId: ResourceIdentifier;
};

export type TDeleteMatchCatch = {
  matchId: ResourceIdentifier;
};

export interface LoadAllParams extends FullFilterable {
  matchId: ResourceIdentifier;
}
