import {ThemeInterface} from 'styled-components';

export enum keyEnum {
  Code,
  FootballClub,
  NationalTeam,
}

export interface ISearchListModalProps {
  theme?: ThemeInterface;
}

export interface ISearchListContainerProps {
  theme?: ThemeInterface;
  dataKey: keyEnum;
  onClose: () => void;
}

export interface ISearchListComponentProps {
  theme?: ThemeInterface;
  name: string;
  data: Array<any>;
  onClose: () => void;
}
