export enum SideEnum {
  Left,
  Right,
}

export interface IMessageBoxProps {
  children: React.ReactNode;
  side?: SideEnum;
}
