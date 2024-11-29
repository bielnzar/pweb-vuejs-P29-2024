<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Add New Book</h1>
    
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Title</label>
        <input 
          v-model="form.title"
          type="text"
          class="w-full p-2 border rounded"
          required
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Author</label>
        <input 
          v-model="form.author"
          type="text"
          class="w-full p-2 border rounded"
          required
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Description</label>
        <textarea 
          v-model="form.description"
          class="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Cover Image URL</label>
        <input 
          v-model="form.coverImage"
          type="url"
          class="w-full p-2 border rounded"
          required
        >
      </div>

      <button 
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Add Book
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  title: '',
  author: '',
  description: '',
  coverImage: ''
})

const handleSubmit = async () => {
  // Sementara hanya log dan redirect
  console.log('Form submitted:', form.value)
  router.push('/')
}
</script>
