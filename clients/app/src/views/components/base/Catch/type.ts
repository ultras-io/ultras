import { ColorKey } from 'themes/types';
import { ProfileListTypeEnum } from 'views/screens/ProfileList';

// «CatchTypeEnum» is part of «ProfileListTypeEnum»
export enum CatchTypeEnum {
  match = ProfileListTypeEnum.matchCatches,
  event = ProfileListTypeEnum.eventCatches,
  room = ProfileListTypeEnum.roomCatches,
}

export interface ICatchProps {
  isCaught?: boolean;
  iconSize?: string;
  count?: number;
  textColor?: ColorKey;
  catchType?: CatchTypeEnum;
  catchResourceId?: ResourceIdentifier;
  onPress(): void;
}
