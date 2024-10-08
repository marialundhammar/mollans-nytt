<template>
  <div class="relative flex flex-col h-full pb-12">
    <!-- Post title -->
    <h2 class="text-2xl font-semibold text-start">{{ post.title }}</h2>

    <!-- Image and layout -->
    <div class="flex items-start justify-between">
      <div class="flex justify-end ml-4">
        <img
          src="../assets/placeholderImage.jpg"
          class="object-cover w-4/5 h-auto m-1 rounded-sm max-h-48"
        />
      </div>
    </div>

    <!-- Post content text -->
    <p class="flex-1 mt-4 text-start line-clamp-6">
      {{ post.text }}
    </p>

    <router-link
      :to="{ name: 'post-detail', params: { id: post.id } }"
      class="absolute bottom-0 p-2 text-white bg-black rounded-md right-2"
    >
      Läs mer
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PostItem",
  props: {
    post: {
      type: Object as PropType<{ id: string; title: string; text: string }>,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Add any specific styles for PostItem here */
</style>
