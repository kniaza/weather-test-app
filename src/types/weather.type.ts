export interface CustomCurrentTime {
  currentTime: number;
}

export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherData[];
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MinutelyWeather {
  dt: number;
  precipitation: number;
}

export interface HourlyWeather
  extends CustomCurrentTime,
    Omit<CurrentWeather, 'sunrise' | 'sunset'> {
  pop: number;
}

export interface DailyWeather
  extends Omit<CurrentWeather, 'temp' | 'feels_like' | 'visibility'> {
  temp: Record<'day' | 'min' | 'max' | 'night' | 'eve' | 'morn', number>;
  feels_like: Record<'day' | 'night' | 'eve' | 'morn', number>;
}

export interface WeatherResponse extends CustomCurrentTime {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely: MinutelyWeather[];
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface WeatherCurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherData[];
  base: string;
  main: Pick<
    CurrentWeather,
    'temp' | 'feels_like' | 'pressure' | 'humidity'
  > & {
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  timezone: number;
  id: number;
  name: string;
}
