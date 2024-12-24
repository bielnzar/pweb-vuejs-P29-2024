<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Book } from '../types/book'

const router = useRouter()
const tagsInput = ref('')

const form = ref({
  title: '',
  author: '',
  description: '',
  coverImage: '',
  publishedDate: '',
  publisher: '',
  initialQty: 1,
  qty: 1,
  rating: {
    average: 0,
    count: 0
  },
  tags: [] as string[]
})

const handleSubmit = async () => {
  try {
    form.value.tags = tagsInput.value.split(',').map(tag => tag.trim())
    form.value.qty = form.value.initialQty

    const response = await fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) throw new Error('Failed to add book')
    
    router.push('/')
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to add book')
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Add New Book</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input 
          v-model="form.title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Author</label>
        <input 
          v-model="form.author"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          v-model="form.description"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Cover Image URL</label>
        <input 
          v-model="form.coverImage"
          type="url"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Published Date</label>
        <input 
          v-model="form.publishedDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Publisher</label>
        <input 
          v-model="form.publisher"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input 
          v-model="tagsInput"
          type="text"
          placeholder="fiction, adventure, mystery"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Initial Quantity</label>
        <input 
          v-model.number="form.initialQty"
          type="number"
          min="1"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>

      <button 
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Add Book
      </button>
    </form>
  </div>
</template>