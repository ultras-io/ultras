import { RouteProp } from '@react-navigation/native';

export interface IFanClubAboutProps {
  route: RouteProp<{ params: { tabName: string; description: string } }, 'params'>;
}
