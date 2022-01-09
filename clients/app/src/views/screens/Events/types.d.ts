import { ThemeInterface } from 'styled-components';

export interface IEventsProps {}

export interface IEventsContainerProps {
  theme?: ThemeInterface;
}
export interface IEventsComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
