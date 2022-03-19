import { CityViewModel } from './city';
import { CountryViewModel } from './country';

export type VenueViewModel = ViewModel<{
  name: string;
  address: string;
  capacity: number;
  imageUri: string;
  country: CountryViewModel;
  city: CityViewModel;
}>;

export type VenuesViewModel = Array<VenueViewModel>;
