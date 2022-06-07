export interface IEventsProps {}

export interface IEventsContainerProps {}
export interface IEventsComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
