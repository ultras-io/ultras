import { RouteProp } from '@react-navigation/native';
import { MatchViewModel } from '@ultras/view-models';

export interface ISelectMatchProps {
  route: RouteProp<
    {
      params: {
        matchId: ResourceIdentifier;
        onSelect(matchId: ResourceIdentifier): void;
      };
    },
    'params'
  >;
}

export interface ISelectMatchContainerProps {
  matchId: ResourceIdentifier;
}

export interface ISelectMatchComponentProps {
  data: Array<MatchViewModel>;
  matchId: ResourceIdentifier;
  onSelect(matchId: ResourceIdentifier): void;
  onEndReached(): void;
}
