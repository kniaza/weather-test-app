<template>
  <div>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <p class="text-white text-center mt-12">Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
</script>
