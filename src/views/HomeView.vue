<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
      />
      <ul
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />

        <template #fallback>
          <p>Loading....</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import { mapService } from '@/services/map';
import * as helpers from '@/helpers';

const router = useRouter();
const searchQuery = ref('');
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = helpers.debounce(async () => {
  const { value: searchValue } = searchQuery;

  if (searchValue.trim().length) {
    try {
      const data = await mapService.searchPlace(searchValue);

      mapboxSearchResults.value = data.features;
    } catch (e) {
      console.error(e);
      searchError.value = true;
    }

    return;
  }

  mapboxSearchResults.value = null;
}, 350);

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',');
  const [lng, lat] = searchResult.geometry.coordinates;
  router.push({
    name: 'cityView',
    params: {
      state: state.trim(),
      city: city.trim(),
    },
    query: {
      lat,
      lng,
      preview: true,
    },
  });
};
</script>
