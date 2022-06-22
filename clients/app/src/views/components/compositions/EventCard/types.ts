import { EventViewModel } from '@ultras/view-models';

export interface IEventCardProps {
  onPress: () => void;
  data: EventViewModel;
}
