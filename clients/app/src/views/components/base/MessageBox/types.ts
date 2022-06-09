export interface IMessageBoxProps {
  children: React.ReactNode;
  side?: 'left' | 'right';
  denied?: boolean;
  bottomText?: string;
}
