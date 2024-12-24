<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img :src="book.coverImage" :alt="book.title" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ book.title }}</h3>
      <p class="text-gray-600 mb-2">by {{ book.author }}</p>
      <p class="text-gray-500 text-sm mb-2">{{ book.description }}</p>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600">
          Stock: {{ book.qty }}/{{ book.initialQty }}
        </div>
        <div class="text-sm text-yellow-500">
          ⭐ {{ book.rating.average }} ({{ book.rating.count }})
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from '../types/book'

defineProps<{
  book: Book
}>()
</script>