import axios from 'axios';
import { OPENWEATHER_API_KEY } from './config';

export default class WeatherService {
  constructor() {
    this.url = 'https://api.openweathermap.org/data';
  }

  async getWeatherInfo({ lat, lng }) {
    const weatherData = await axios.get(
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

  async currentWeather({ lat, lng }) {
    const { data } = await axios.get(
      `${this.url}/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    return data;
  }
}

export const weatherService = new WeatherService();
