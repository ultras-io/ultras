import { TeamViewModel } from '@ultras/view-models';
import { RouteProp } from '@react-navigation/native';

export interface ISelectTeamProps {
  route: RouteProp<
    {
      params: {
        teamId: ResourceIdentifier;
      };
    },
    'params'
  >;
}

export interface ISelectTeamContainerProps {
  teamId: null | ResourceIdentifier;
}

export interface ISearchTeamComponentProps {
  onChange(value: string): void;
}

export interface ISelectTeamComponentProps {
  loading: boolean;
  data: Array<TeamViewModel>;
  teamId: null | ResourceIdentifier;
  onSelect(teamId: ResourceIdentifier): void;
  onEndReached?(): void;
}
