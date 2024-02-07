<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. to start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from '@/components/CityList/CityCard.vue';
import { citiesStorage } from '@/services/storage';
import { weatherService } from '@/services/weather';

const router = useRouter();
const savedCities = ref([]);

const getCities = async () => {
  const cities = citiesStorage.data;
  if (cities) {
    savedCities.value = cities;

    const requests = [];
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

const goToCityView = (city) => {
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
