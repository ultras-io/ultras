export enum DirectionENum {
  Left2Right,
  Right2Left,
  Down2Up,
  Up2Down,
  Down2UpLeft,
  Down2UpRight,
}

export interface IWithAnimationProps {
  children: React.ReactNode;
  direction?: DirectionENum;
  duration?: number;
  delay?: number;
}
