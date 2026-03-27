import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/postsStore'

describe('race condition bug', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('старий запит перезаписує новий (БАГ)', async () => {
    const store = usePostsStore()

    global.fetch = vi.fn((url) => {
      if (url.includes('_page=1')) {
        return new Promise(resolve =>
          setTimeout(() => resolve({
            json: () => Promise.resolve([{ title: 'OLD DATA' }])
          }), 100) 
        )
      }

      if (url.includes('_page=2')) {
        return new Promise(resolve =>
          setTimeout(() => resolve({
            json: () => Promise.resolve([{ title: 'NEW DATA' }])
          }), 10) 
        )
      }
    })

    store.page = 1
    const p1 = store.fetchItems()

    store.page = 2
    const p2 = store.fetchItems()

    await Promise.all([p1, p2])

    expect(store.items[0].title).toBe('NEW DATA')
  })
})