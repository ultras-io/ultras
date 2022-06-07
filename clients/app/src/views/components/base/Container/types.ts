import { Size } from 'views/components/base/Bg';

export interface IContainerProps {
  children: React.ReactNode;
  withSuspense?: boolean;
  withBg?: boolean;
  bgSize?: Size;
}
