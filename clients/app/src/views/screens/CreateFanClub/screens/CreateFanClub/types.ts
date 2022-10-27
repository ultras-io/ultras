import { RefObject } from 'react';

export interface ICreateFanClubProps {}

export interface ICreateFanClubContainerProps {}

export interface ISelectedTeamProps {
  teamId?: null | ResourceIdentifier;
}

export interface ISelectedCityProps {
  cityId?: null | ResourceIdentifier;
}

export interface IDetailsComponentProps {
  onFocus(ref: RefObject<any>): void;
}
