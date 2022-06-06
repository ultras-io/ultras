type Size = 'md' | 'lg';

export interface IWithBgProps {
  children: React.ReactNode;
  size?: Size;
}

export interface IBgProps {
  size?: Size;
}
