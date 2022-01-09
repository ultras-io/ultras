import { ThemeInterface } from 'styled-components';

export interface IProfileInfoProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  username: string;
  teams: Array<any>;
  supportersClubs: Array<any>;
}
