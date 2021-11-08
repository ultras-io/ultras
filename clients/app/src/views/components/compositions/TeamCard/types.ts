import {ThemeInterface} from 'styled-components';

export interface ITeamCardProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  supportersClubsCount: number;
  country?: string;
  city?: string;
  onPress: () => void;
}
