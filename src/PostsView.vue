<script setup>
import { usePostsStore } from './stores/postsStore'
const store = usePostsStore()
</script>

<template>
  <h1>Posts</h1>

  <p v-if="store.isLoading">Завантаження...</p>
  <p v-else-if="store.error">{{ store.error }}</p>

  <ul v-else-if="store.items.length">
    <li v-for="post in store.filteredItems" :key="post.id">
      {{ post.title }}
    </li>
  </ul>

  <p v-else>Немає даних</p>
</template>