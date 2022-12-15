export interface IThumbnailSize {
  width: number;
  height: number;
}

// ------------------------------------------------------------
// image sizes from design
//   47x74 - user list component
//   64x64 - user avatar - in profile screen
// 136x136 - user avatar - in edit profile screen
//   72x72 - fan club avatar - in home screen
// 110x110 - fan club avatar - in single fan club screen
// 345x196 - event - for event card in any screen
// 375x213 - event - in single event screen

export enum ThumbnailSizeEnum {
  Size47x47 = '47x47',
  Size64x64 = '64x64',
  Size72x72 = '72x72',
  Size110x110 = '110x110',
  Size136x136 = '136x136',
  Size345x196 = '345x196',
  Size375x213 = '375x213',
}
