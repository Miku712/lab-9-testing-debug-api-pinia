import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/postsStore.js'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('posts store', () => {

        it('filteredItems getter works', () => {
    const store = usePostsStore()
    store.items = [
        { id: 1, title: 'hello world' },
        { id: 2, title: 'vue test' }
    ]
    store.query = 'hello'
    expect(store.filteredItems.length).toBe(1)
    expect(store.filteredItems[0].title).toBe('hello world')
    })


  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('success fetch', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, title: 'test' }])
      })
    )

    const store = usePostsStore()

    await store.fetchItems()

    expect(store.items.length).toBe(1)
    expect(store.error).toBe(null)
  })

  it('error fetch', async () => {
    global.fetch = vi.fn(() => Promise.reject())

    const store = usePostsStore()

    await store.fetchItems()

    expect(store.error).toBe('Помилка завантаження')
  })

  it('getter works', () => {
    const store = usePostsStore()
    store.items = [{ title: 'hello' }]
    store.query = 'he'

    expect(store.filteredItems.length).toBe(1)
  })
})