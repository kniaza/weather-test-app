<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. to start tracking a location, search in the field above.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from '@/components/CityList/CityCard.vue';
import { citiesStorage } from '@/services/storage';
import { weatherService } from '@/services/weather';
import { CityStorageItem } from '@/types/storage.type';

const router = useRouter();
const savedCities = ref<CityStorageItem[]>([]);

const getCities = async () => {
  const cities = citiesStorage.state;
  if (cities) {
    savedCities.value = cities;

    const requests: ReturnType<typeof weatherService.currentWeather>[] = [];
    savedCities.value.forEach((city) => {
      requests.push(
        weatherService.currentWeather({
          lat: city.coords.lat,
          lng: city.coords.lng,
        })
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value;
    });
  }
};

const goToCityView = (city: CityStorageItem) => {
  router.push({
    name: 'cityView',
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};

await getCities();
</script>
