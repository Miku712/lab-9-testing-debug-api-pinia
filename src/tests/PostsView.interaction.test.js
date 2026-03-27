import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { usePostsStore } from '../stores/postsStore'
import PostsView from '../PostsView.vue'

describe('PostsView interactions', () => {
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

  it('викликає fetchItems при введенні пошуку', async () => {
    const input = wrapper.find('input')

    await input.setValue('vue')

    expect(store.query).toBe('vue')
    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('викликає fetchItems при кліку Next', async () => {
    const nextBtn = wrapper.findAll('button')[1]

    await nextBtn.trigger('click')

    expect(store.page).toBe(2)
    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('викликає fetchItems при кліку Prev', async () => {
    store.page = 2

    const prevBtn = wrapper.findAll('button')[0]

    await prevBtn.trigger('click')

    expect(store.page).toBe(1)
    expect(store.fetchItems).toHaveBeenCalled()
  })
})