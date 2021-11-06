import {ThemeInterface} from 'styled-components';

export interface ITeamInfoProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  country?: string;
  city?: string;
  inMyTeams: boolean;
}
