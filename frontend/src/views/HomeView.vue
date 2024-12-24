<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center">Book Collection</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading books...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="books.length === 0" class="text-center py-10">
      <div class="mb-4">
        <span class="text-6xl">📚</span>
      </div>
      <h2 class="text-xl font-semibold text-gray-600 mb-2">No Books Available</h2>
      <p class="text-gray-500 mb-4">Start adding some books to your collection!</p>
      <router-link 
        to="/add" 
        class="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
      >
        Add Your First Book
      </router-link>
    </div>

    <!-- Books Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BookCard from '../components/BookCard.vue'
import type { Book } from '../types/book'

const books = ref<Book[]>([])
const loading = ref(true)
const error = ref('')

const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:4000/books')
    if (!response.ok) throw new Error('Failed to fetch books')
    const data = await response.json()
    books.value = data
  } catch (err) {
    error.value = 'Failed to load books'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBooks)
</script>
