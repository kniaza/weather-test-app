import axios from 'axios';
import { OPENWEATHER_API_KEY } from './config';
import { WeatherCurrentResponse, WeatherResponse } from '@/types/weather.type';

export type getWeatherInfoProp = Record<'lat' | 'lng', number | string>;

export default class WeatherService {
  url: string;

  constructor() {
    this.url = 'https://api.openweathermap.org/data';
  }

  async getWeatherInfo({ lat, lng }: getWeatherInfoProp) {
    const weatherData = await axios.get<WeatherResponse>(
      `${this.url}/3.0/onecall?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  }

  async currentWeather({ lat, lng }: getWeatherInfoProp) {
    const { data } = await axios.get<WeatherCurrentResponse>(
      `${this.url}/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    return data;
  }
}

export const weatherService = new WeatherService();
