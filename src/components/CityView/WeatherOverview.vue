<template>
  <div class="flex flex-col items-center text-white py-12">
    <h1 class="text-4xl mb-2">{{ cityName }}</h1>
    <p>
      {{ dateFormatted }}
      {{ timeFormatted }}
    </p>
    <p class="text-8xl mb-8">
      {{ Math.round(weatherData?.current.temp || 0) }}&deg;
    </p>
    <p>
      Feels like {{ Math.round(weatherData?.current?.feels_like || 0) }}&deg;
    </p>
    <p class="capitalize">
      {{ weatherData?.current.weather[0].description }}
    </p>
    <img
      class="w-[150px] h-auto"
      :src="`${WEATHER_ICON_URL}/${weatherData?.current.weather[0].icon}@2x.png`"
      :alt="weatherData?.current?.weather[0].description"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WEATHER_ICON_URL } from '@/services/config';
import { WeatherResponse } from '@/types/weather.type';

const props = defineProps<{
  cityName: string;
  weatherData: WeatherResponse;
}>();

const dateFormatted = computed(() => {
  return new Date(props.weatherData?.currentTime || 0).toLocaleDateString(
    'en-us',
    {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
    }
  );
});

const timeFormatted = computed(() => {
  return new Date(props.weatherData?.currentTime || 0).toLocaleTimeString(
    'en-us',
    {
      timeStyle: 'short',
    }
  );
});
</script>
