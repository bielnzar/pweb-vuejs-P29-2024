<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  components: {
    RouterLink,
    RouterView,
  },
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header/Navbar dengan desain unik -->
    <nav class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center py-4">
          <!-- Logo dan Judul -->
          <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span class="text-purple-800 text-xl font-bold">📚</span>
            </div>
            <router-link to="/" class="text-2xl font-extrabold tracking-tight">
              P29
              <span class="text-purple-300 text-sm ml-1">Library</span>
            </router-link>
          </div>

          <!-- Navigation Links dengan animasi hover -->
          <div class="flex flex-wrap justify-center space-x-1 md:space-x-4">
            <router-link 
              v-for="(link, index) in navigationLinks" 
              :key="index"
              :to="link.path"
              class="px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10 relative group"
            >
              <span class="relative z-10">{{ link.name }}</span>
              <span class="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </router-link>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Search books..." 
              class="bg-transparent border-none outline-none placeholder-purple-200 text-white w-40"
            >
            <span class="ml-2">🔍</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content dengan animasi fade -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <!-- Footer yang selalu di bawah -->
    <footer class="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-6 mt-auto">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h3 class="font-bold text-xl mb-2">P29 Library</h3>
          <p class="text-purple-200 text-sm">Your Gateway to Literary Adventures</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const navigationLinks = ref([
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Add Book', path: '/add' },
  { name: 'Collections', path: '/collections' }
])
</script>

<style scoped>
/* Animasi untuk transisi halaman */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #6b46c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5a32a3;
}

/* Tambahan styling untuk input */
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>
