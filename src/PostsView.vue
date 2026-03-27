<script setup>
import { usePostsStore } from './stores/postsStore'

const store = usePostsStore()

function onSearch(e) {
  store.query = e.target.value
  store.fetchItems()
}

function nextPage() {
  store.page++
  store.fetchItems()
}

function prevPage() {
  if (store.page > 1) {
    store.page--
    store.fetchItems()
  }
}
</script>

<template>
  <h1>Posts</h1>

  <input
    type="text"
    placeholder="Пошук..."
    @input="onSearch"
  />

  <button @click="prevPage">Prev</button>
  <button @click="nextPage">Next</button>

  <p v-if="store.isLoading">Завантаження...</p>
  <p v-else-if="store.error">{{ store.error }}</p>

  <ul v-else-if="store.items.length">
    <li v-for="post in store.filteredItems" :key="post.id">
      {{ post.title }}
    </li>
  </ul>

  <p v-else>Немає даних</p>
</template>