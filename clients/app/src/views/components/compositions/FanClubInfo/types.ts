import { ThemeInterface } from 'styled-components';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubInfoProps {
  theme?: ThemeInterface;
  data: FanClubViewModel;
}
