export type LocationViewModel = ViewModel<{
  name: string;
  lat: Nullable<number>;
  lng: Nullable<number>;
}>;

export type LocationsViewModel = Array<LocationViewModel>;
