import { EventViewModel } from '@ultras/view-models';
import { MultiResourceIdentifier } from '@ultras/core-api-sdk';

export interface IEventsContainerProps {
  fanClubId?: MultiResourceIdentifier;
  matchId?: MultiResourceIdentifier;
  teamId?: MultiResourceIdentifier;
}

export interface IEventsComponentProps {
  data: Array<EventViewModel>;
  onEndReached: () => void;
}
