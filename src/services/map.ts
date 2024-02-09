import axios from 'axios';
import { MAPBOX_API_KEY } from './config';
import { SearchPlaceDataResponse } from '@/types/map.type';

export default class MapService {
  url: string;

  constructor() {
    this.url = 'https://api.mapbox.com/geocoding/v5';
  }

  async searchPlace(text: string) {
    const { data } = await axios.get<SearchPlaceDataResponse>(
      `${this.url}/mapbox.places/${text}.json?access_token=${MAPBOX_API_KEY}&type=place`
    );

    return data;
  }
}

export const mapService = new MapService();
