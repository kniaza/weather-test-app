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
import axios from 'axios';
import CityCard from './CityCard.vue';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const router = useRouter();
const savedCities = ref([]);

const getCities = async () => {
  const citiesLocalStorageKey = 'savedCities';
  const cities = localStorage.getItem(citiesLocalStorageKey);
  if (cities) {
    savedCities.value = JSON.parse(cities);

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiKey}&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
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
