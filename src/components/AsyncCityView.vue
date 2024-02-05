<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p>
        {{
          new Date().toLocaleDateString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date().toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        :alt="weatherData.current.weather[0].description"
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-base">
              {{
                new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                  hour: 'numeric',
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}&deg;</p>
            <p>L: {{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove -->
    <div
      v-if="!route.query.preview"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeatherData = async () => {
  try {
    const { lat, lng, preview } = route.query;
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
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
  } catch (err) {
    console.error(err);
  }
};

const removeCity = () => {
  const citiesLocalStorageKey = 'savedCities';
  const cities = JSON.parse(localStorage.getItem(citiesLocalStorageKey));

  const updatedCities = cities.filter((cityData) => {
    const { state, city } = route.params;
    return !(cityData.city === city && cityData.state === state);
  });

  localStorage.setItem(citiesLocalStorageKey, JSON.stringify(updatedCities));
  router.replace({
    name: 'home',
  });
};

const weatherData = await getWeatherData();
</script>

<style lang="scss" scoped></style>
