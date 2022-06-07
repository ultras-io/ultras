export interface ITeamsContainerProps {
  data: Array<any>; //@TODO
  withBounce?: boolean;
}

export interface ITeamsComponentProps {
  data: Array<any>; //@TODO
  withBounce: boolean;
  onPress: (id: string) => void;
}
