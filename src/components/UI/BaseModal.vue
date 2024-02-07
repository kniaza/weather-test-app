<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modelActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modelActive"
            class="p-4 bg-white self-start mt-32 max-w-screen-md"
          >
            <slot />

            <button
              class="text-white mt-8 bg-weather-primary py-2 px-6"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(['close-modal']);
defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.modal-outer {
  &-enter-active,
  &-leave-active {
    @apply transition-opacity ease-in-out duration-300;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0;
  }
}

.modal-inner {
  &-enter-active {
    @apply transition-all duration-300 ease-in;
  }

  &-leave-active {
    @apply transition-all duration-300 ease-out;
  }

  &-enter-from {
    @apply opacity-0 scale-[.8];
  }

  &-leave-to {
    @apply scale-[.8];
  }
}
</style>
