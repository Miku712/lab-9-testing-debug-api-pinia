import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { usePostsStore } from '../stores/postsStore'
import PostsView from '../PostsView.vue'

describe('PostsView UI states', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(PostsView, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,   
            createSpy: vi.fn    
          }),
        ],
      },
    })
    store = usePostsStore()
  })

  it('показує "Завантаження..." коли isLoading=true', async () => {
    store.isLoading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Завантаження...')
  })

  it('показує повідомлення про помилку', async () => {
    store.error = 'Помилка завантаження'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Помилка завантаження')
  })

  it('показує список постів, коли items.length>0', async () => {
    store.items = [
      { id: 1, title: 'Пост 1' },
      { id: 2, title: 'Пост 2' }
    ]
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Пост 1')
    expect(wrapper.text()).toContain('Пост 2')
  })

  it('показує "Немає даних" коли items пустий', async () => {
    store.items = []
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Немає даних')
  })
})