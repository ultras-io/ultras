import { CountryViewModel } from './country';
export declare type CityViewModel = ViewModel<{
    name: string;
    country: CountryViewModel;
}>;
export declare type CitiesViewModel = Array<CityViewModel>;
