import { AwsS3FolderEnum } from '@ultras/utils';
import React from 'react';

export interface ICreateFanClubProps {}

export interface ICreateFanClubContainerProps {}

export interface ISelectedTeamProps {
  teamId?: null | ResourceIdentifier;
}

export interface ISelectedCityProps {
  cityId?: null | ResourceIdentifier;
}

export interface ISwiperContainerProps {
  keyboardHeight: number;
  slides: Array<React.ReactNode>;
  isSubmitEnabled(index: number): boolean;
}

export interface IDetailsComponentProps {
  onFocus(ref: React.RefObject<any>): void;
}

export interface IChoosePhotoComponentProps {
  title: string;
  rounded: boolean;
  field: 'avatar' | 'coverPhoto';
  folder: AwsS3FolderEnum;
}
