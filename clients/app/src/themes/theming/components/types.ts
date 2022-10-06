export type ComponentParams = {
  colorMode: 'light' | 'dark';
  disabled?: boolean;
  variant?: string;
};

export type BuildParamsType = {
  textColor: string;
  pressedBg: string;
  background: string;
  height?: number | string;
};

export type BadgeVariants = 'notification' | 'updates';
