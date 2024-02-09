<template>
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
          :src="`${WEATHER_ICON_URL}/${day.weather[0].icon}@2x.png`"
          alt=""
        />
        <div class="flex gap-2 flex-1 justify-end">
          <p>H: {{ Math.round(day.temp.max) }}&deg;</p>
          <p>L: {{ Math.round(day.temp.min) }}&deg;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WEATHER_ICON_URL } from '@/services/config';
import { WeatherResponse } from '@/types/weather.type';

defineProps<{
  weatherData: WeatherResponse;
}>();
</script>
