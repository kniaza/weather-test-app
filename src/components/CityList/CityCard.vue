<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="flex items-center text-3xl">
        <img
          class="w-[50px] h-[50px] object-cover"
          :src="`${WEATHER_ICON_URL}/${city.weather?.weather[0].icon}@2x.png`"
          alt=""
        />
        <span>{{ Math.round(city.weather?.main.temp || 0) }}&deg;</span>
      </p>
      <div class="flex gap-2 text-right self-end">
        <span class="text-xs">
          H: {{ Math.round(city.weather?.main.temp_max || 0) }}&deg;
        </span>
        <span class="text-xs">
          L: {{ Math.round(city.weather?.main.temp_min || 0) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WEATHER_ICON_URL } from '@/services/config';
import { CityStorageItem } from '@/types/storage.type';

defineProps<{
  city: CityStorageItem;
}>();
</script>
