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
  UltrasS3SDK
} from '@ultras/core-api-sdk';

export const buildCountrySDK = () => makeSdkInstance<CountrySDK>(CountrySDK);
export const buildCitySDK = () => makeSdkInstance<CitySDK>(CitySDK);
export const buildFanClubMembershipSDK = () =>
  makeSdkInstance<FanClubMembershipSDK>(FanClubMembershipSDK);
export const buildFavoriteTeamSDK = () =>
  makeSdkInstance<FavoriteTeamSDK>(FavoriteTeamSDK);
export const buildMatchSDK = () => makeSdkInstance<MatchSDK>(MatchSDK);
export const buildRoomSDK = () => makeSdkInstance<RoomSDK>(RoomSDK);
export const buildTeamSDK = () => makeSdkInstance<TeamSDK>(TeamSDK);
export const buildUserSDK = () => makeSdkInstance<UserSDK>(UserSDK);
export const buildEventMemberSDK = () => makeSdkInstance<EventMemberSDK>(EventMemberSDK);
export const buildEventSDK = () => makeSdkInstance<EventSDK>(EventSDK);
export const buildFanClubSDK = () => makeSdkInstance<FanClubSDK>(FanClubSDK);
export const buildUltrasS3SDK = () => makeSdkInstance<UltrasS3SDK>(UltrasS3SDK);
