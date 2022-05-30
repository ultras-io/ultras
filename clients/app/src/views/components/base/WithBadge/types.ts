import { BadgeVariants } from 'themes/theming/components/types';

export interface IBadgeProps {
  children: React.ReactNode;
  variant: BadgeVariants;
  number: number;
}
