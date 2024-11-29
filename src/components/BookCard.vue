<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img :src="book.coverImage" :alt="book.title" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ book.title }}</h3>
      <p class="text-gray-600 mb-2">by {{ book.author }}</p>
      <p class="text-gray-500 text-sm mb-4">{{ book.description }}</p>
      <div class="flex justify-between">
        <router-link 
          :to="`/book/${book.id}`"
          class="text-indigo-600 hover:text-indigo-800"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>
