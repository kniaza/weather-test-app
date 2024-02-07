<template>
  <div class="flex flex-col items-center text-white py-12">
    <h1 class="text-4xl mb-2">{{ cityName }}</h1>
    <p>
      {{ dateFormatted }}
      {{ timeFormatted }}
    </p>
    <p class="text-8xl mb-8">{{ Math.round(weatherData.current.temp) }}&deg;</p>
    <p>Feels like {{ Math.round(weatherData.current?.feels_like) }}&deg;</p>
    <p class="capitalize">
      {{ weatherData.current.weather[0].description }}
    </p>
    <img
      class="w-[150px] h-auto"
      :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
      :alt="weatherData.current?.weather[0].description"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cityName: {
    type: String,
    default: '',
  },
  weatherData: {
    type: Object,
    default: {},
  },
});

const dateFormatted = computed(() => {
  return new Date(props.weatherData.currentTime).toLocaleDateString('en-us', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
  });
});

const timeFormatted = computed(() => {
  return new Date(props.weatherData.currentTime).toLocaleTimeString('en-us', {
    timeStyle: 'short',
  });
});
</script>
