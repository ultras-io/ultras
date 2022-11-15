import makeSdkInstance from './makeSdkInstance';
import {
  CitySDK,
  CountrySDK,
  EventMemberSDK,
  EventSDK,
  FanClubMembershipSDK,
  FanClubSDK,
  FavoriteTeamSDK,
  MatchSDK,
  RoomSDK,
  TeamSDK,
  UserSDK,
} from '@ultras/core-api-sdk';

export const buildCountrySDK = () => makeSdkInstance(CountrySDK);
export const buildCitySDK = () => makeSdkInstance(CitySDK);
export const buildFanClubMembershipSDK = () => makeSdkInstance(FanClubMembershipSDK);
export const buildFavoriteTeamSDK = () => makeSdkInstance(FavoriteTeamSDK);
export const buildMatchSDK = () => makeSdkInstance(MatchSDK);
export const buildRoomSDK = () => makeSdkInstance(RoomSDK);
export const buildTeamSDK = () => makeSdkInstance(TeamSDK);
export const buildUserSDK = () => makeSdkInstance(UserSDK);
export const buildEventMemberSDK = () => makeSdkInstance(EventMemberSDK);
export const buildEventSDK = () => makeSdkInstance(EventSDK);
export const buildFanClubSDK = () => makeSdkInstance(FanClubSDK);
