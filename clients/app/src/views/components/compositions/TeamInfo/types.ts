import { ThemeInterface } from 'styled-components';
import { TeamViewModel } from '@ultras/core-api-sdk';

export interface ITeamInfoProps {
  theme?: ThemeInterface;
  data: TeamViewModel;
}
