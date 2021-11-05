import {ThemeInterface} from 'styled-components';

export interface ISupportersClubInfoProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  isOfficial: boolean;
  ultrasCount: number;
  city?: string;
  team: {
    name: string;
    id: string;
  };
  myStatus: 'join' | 'requested' | 'joined';
}
