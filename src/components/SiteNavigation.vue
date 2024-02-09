<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Weather</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          v-if="route.query.preview"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
        ></i>
      </div>

      <BaseModal :modelActive="modelActive" @close-modal="toggleModal">
        <InfoModalContent />
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { citiesStorage } from '@/services/storage';
import BaseModal from './UI/BaseModal.vue';
import InfoModalContent from './InfoModalContent.vue';
import { CityStorageItem } from '@/types/storage.type';

const route = useRoute();
const router = useRouter();
const savedCities = ref<CityStorageItem[]>([]);
const modelActive = ref(false);

const toggleModal = () => {
  modelActive.value = !modelActive.value;
};

const addCity = () => {
  const cities = citiesStorage.state;
  const { lat, lng } = route.query;
  const { state, city } = route.params;
  if (cities) {
    savedCities.value = citiesStorage.state;
  }

  const locationsObj: CityStorageItem = {
    id: window.crypto.randomUUID(),
    state: state as string,
    city: city as string,
    coords: {
      lat: lat as string,
      lng: lng as string,
    },
  };

  savedCities.value.push(locationsObj);
  citiesStorage.state = savedCities.value;

  const { preview, ...query } = route.query;
  router.replace({ query });
};
</script>
