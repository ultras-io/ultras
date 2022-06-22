import { EventViewModel } from '@ultras/view-models';

export interface IEventsContainerProps {}
export interface IEventsComponentProps {
  data: Array<EventViewModel>;
  onEndReached: () => void;
}
