<template>
  <div
    v-if="show"
    class="text-white p-4 bg-weather-secondary w-full text-center"
  >
    <p>
      You are currently previewing this city, click the "+" icon to start
      tracking this city.
    </p>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>
