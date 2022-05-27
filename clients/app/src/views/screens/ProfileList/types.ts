import { RouteProp } from '@react-navigation/native';

export enum ProfileListTypeEnum {
  fanClubMembers = 'fan-club-members',
  eventLikes = 'event-likes',
  eventMemebers = 'event-memebers',
}

export interface IProfileListProps {
  route: RouteProp<
    {
      params: {
        tabName: string;
        id: number;
        type: ProfileListTypeEnum;
      };
    },
    'params'
  >;
}

export interface IProfileListContainerProps {
  title: string;
}

export interface IProfileListComponentProps {
  data: any;
}
