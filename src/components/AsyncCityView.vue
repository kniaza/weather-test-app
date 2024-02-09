<template>
  <div class="flex flex-col flex-1 items-center" v-if="weatherData">
    <TheBanner :show="isShowBanner" />

    <WeatherOverview
      :cityName="(route.params.city as string)"
      :weatherData="weatherData"
    />

    <hr class="border-white border-opacity-10 border w-full" />

    <HourlyForecast :weatherData="weatherData" />

    <hr class="border-white border-opacity-10 border w-full" />

    <WeekForecast :weatherData="weatherData" />

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

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { citiesStorage } from '@/services/storage';
import { weatherService } from '@/services/weather';
import TheBanner from '@/components/CityView/TheBanner.vue';
import WeatherOverview from '@/components/CityView/WeatherOverview.vue';
import HourlyForecast from '@/components/CityView/HourlyForecast.vue';
import WeekForecast from '@/components/CityView/WeekForecast.vue';

const route = useRoute();
const isShowBanner = computed(() => {
  const { preview } = route.query;
  return !!preview;
});

const getWeatherData = async () => {
  try {
    const { lat, lng } = route.query;
    return await weatherService.getWeatherInfo({
      lat: lat as string,
      lng: lng as string,
    });
  } catch (err) {
    console.error(err);
  }
};

const removeCity = () => {
  const cities = citiesStorage.state;

  const updatedCities = cities.filter((cityData) => {
    const { state, city } = route.params;
    return !(cityData.city === city && cityData.state === state);
  });

  citiesStorage.state = updatedCities;
  router.replace({
    name: 'home',
  });
};

const weatherData = await getWeatherData();
</script>
