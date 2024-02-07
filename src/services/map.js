import axios from 'axios';
import { MAPBOX_API_KEY } from './config';

export default class MapService {
  constructor() {
    this.url = 'https://api.mapbox.com/geocoding/v5';
  }

  async searchPlace(text) {
    const { data } = await axios.get(
      `${this.url}/mapbox.places/${text}.json?access_token=${MAPBOX_API_KEY}&type=place`
    );

    return data;
  }
}

export const mapService = new MapService();
