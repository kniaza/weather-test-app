import { WeatherCurrentResponse } from './weather.type';

export interface CityStorageItem {
  id: string;
  state: string;
  city: string;
  coords: {
    lat: number | string;
    lng: number | string;
  };
  weather?: WeatherCurrentResponse;
}
