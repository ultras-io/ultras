import { ThemeInterface } from 'styled-components';

export interface IProfileInfoProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  username: string;
  teams: Array<any>;
  fanClubs: Array<any>;
}
