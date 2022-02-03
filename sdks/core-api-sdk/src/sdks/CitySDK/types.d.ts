type CountryView = {
  id: number;
  name: string;
  code?: string;
};

export type CityView = {
  id: number;
  name: string;
  country: CountryView;
};
