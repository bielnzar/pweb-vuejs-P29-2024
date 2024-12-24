<template>
  <main class="mt-14 mx-8 pb-14">
    <RouterLink
      to="/"
      class="px-4 text-white py-2 lg:ml-24 bg-blue-400 font-semibold rounded-xl inline-block"
    >
      ⬅️ Back to Home
    </RouterLink>

    <div v-if="error" class="mt-8">
      <h1 class="font-bold text-3xl text-center">{{ error }}</h1>
    </div>

    <div v-else-if="loading" class="mt-8">
      <h1 class="font-bold text-3xl text-center">Loading...</h1>
    </div>

    <div v-else-if="book" class="mt-8">
      <div class="flex lg:ml-24 gap-x-10 flex-col lg:flex-row">
        <div class="w-full md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
          <img
            :src="book.coverImage"
            class="rounded-xl w-full"
            alt="Book Cover"
          />
        </div>
        <div class="mt-10 lg:mt-0 lg:pr-24">
          <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-left">
            {{ book.title }} by {{ book.author }}
          </h1>
          <h5 class="text-sm text-gray-500 font-bold mt-2">
            {{ book.rating.average }} {{ starRating }} ({{ book.rating.count }})
          </h5>
          <hr class="border border-black my-2" />
          <h3 class="text-md md:text-lg text-left">
            <span class="font-bold">About:</span> {{ book.description }}
          </h3>
          <h3 class="text-md md:text-lg text-left">
            <span class="font-bold">Published:</span>
            {{ book.publishedDate }} by {{ book.publisher }}
          </h3>
          <h3 class="text-md md:text-lg text-left">
            <span class="font-bold">Category:</span>
            {{ book.tags.join(", ") }}
          </h3>
          <h3 class="text-md md:text-lg text-left">
            <span class="font-bold">Stock:</span>
            {{ book.qty }} of {{ book.initialQty }} books
          </h3>
        </div>
      </div>
      <div class="lg:ml-24 flex justify-center items-center">
        <button
          @click="deleteBook"
          class="px-4 text-white py-2 w-1/2 bg-red-400 font-semibold rounded-xl mt-8 inline-block"
        >
          Remove Book
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Book } from '../types/book'

const route = useRoute()
const router = useRouter()

const book = ref<Book | null>(null)
const loading = ref(true)
const error = ref('')

// Computed property untuk rating bintang
const starRating = computed(() => {
  if (!book.value) return ''
  const stars = Math.floor(book.value.rating.average)
  return "⭐".repeat(stars)
})

// Fungsi untuk mengambil detail buku
const fetchBook = async () => {
  try {
    const response = await fetch(`http://localhost:4000/books/${route.params.id}`)
    if (!response.ok) throw new Error('Failed to fetch book')
    const result = await response.json()
    book.value = result.data // sesuaikan dengan response dari backend
    loading.value = false
  } catch (err) {
    console.error('Error fetching book:', err)
    error.value = 'Failed to load book details'
    loading.value = false
  }
}

// Fungsi untuk menghapus buku
const deleteBook = async () => {
  if (!confirm('Are you sure you want to delete this book?')) return

  try {
    const response = await fetch(
      `http://localhost:4000/books/${route.params.id}`,
      {
        method: 'DELETE',
      }
    )
    
    if (!response.ok) throw new Error('Failed to delete book')
    
    const result = await response.json()
    console.log('Delete result:', result)
    alert('Book has been removed successfully!')
    router.push('/')
  } catch (err) {
    console.error('Error deleting book:', err)
    alert('Failed to delete book')
  }
}

// Panggil fetchBook saat komponen dimount
onMounted(fetchBook)
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>