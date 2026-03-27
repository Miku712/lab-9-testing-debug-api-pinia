import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 5,
    query: ''
  }),

  getters: {
    filteredItems(state) {
      return state.items.filter(item =>
        item.title.toLowerCase().includes(state.query.toLowerCase())
      )
    }
  },

  actions: {
    async fetchItems() {
      this.isLoading = true
      this.error = null

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`
        )

        const data = await res.json()
        this.items = data
      } catch (e) {
        this.error = 'Помилка завантаження'
      } finally {
        this.isLoading = false
      }
    }
  }
})