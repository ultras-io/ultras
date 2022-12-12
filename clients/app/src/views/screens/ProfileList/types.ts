import { RouteProp } from '@react-navigation/native';
import { UserViewModel } from '@ultras/view-models';

export enum ProfileListTypeEnum {
  fanClubMembers = 'fan-club-members',
  eventMembers = 'event-members',
  eventCatches = 'event-catches',
  roomCatches = 'event-catches',
  matchCatches = 'match-catches',
}

export interface IProfileListProps {
  route: RouteProp<
    {
      params: {
        tabName: string;
        id: number;
        type: ProfileListTypeEnum;
        limit?: number;
      };
    },
    'params'
  >;
}

export interface IProfileListContainerProps {
  title: string;
  loading: boolean;
  data: Array<UserViewModel>;
  onEndReached?(): void;
}

export interface IProfileListComponentProps {
  loading: boolean;
  data: Array<UserViewModel>;
  onEndReached?(): void;
}
