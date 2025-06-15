import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Tracker from '../src/views/Tracker.vue'

describe('Tracker.vue – Funktionalität', () => {
  it('zeigt initial alle Datensätze an', () => {
    const wrapper = mount(Tracker)
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(10) 
  })

  it('filtert korrekt nach Eingabe', async () => {
    const wrapper = mount(Tracker)
    const input = wrapper.find('input')
    await input.setValue('Italien')
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).toContain('Italien')
  })

  it('sanitisiert Eingaben gegen HTML-Injektion', async () => {
    const wrapper = mount(Tracker)
    const input = wrapper.find('input')
    await input.setValue('<script>alert("hacked")</script>')
    expect(wrapper.vm.search).not.toContain('<script>')
    expect(wrapper.vm.search).not.toContain('script')
  })
})

const sortColumns = [
  { label: 'Land', index: 0, key: 'country' },
  { label: 'Unternehmen', index: 1, key: 'company' },
  { label: 'CO₂ Emissionen (Mt)', index: 2, key: 'emissions' }
]

describe('Tracker.vue – Sortierlogik', () => {
  sortColumns.forEach(({ label, index, key }) => {
    it(`sortiert ${label} auf- und absteigend`, async () => {
      const wrapper = mount(Tracker)
      const header = wrapper.findAll('th')[index]

      await header.trigger('click')
      let rows = wrapper.findAll('tbody tr')
      let first = rows[0].findAll('td')[index].text()
      let second = rows[1].findAll('td')[index].text()

      if (key === 'emissions') {
        expect(+first).toBeLessThanOrEqual(+second)
      } else {
        expect(first.localeCompare(second)).toBeLessThanOrEqual(0)
      }

      await header.trigger('click')
      rows = wrapper.findAll('tbody tr')
      first = rows[0].findAll('td')[index].text()
      second = rows[1].findAll('td')[index].text()

      if (key === 'emissions') {
        expect(+first).toBeGreaterThanOrEqual(+second)
      } else {
        expect(first.localeCompare(second)).toBeGreaterThanOrEqual(0)
      }
    })
  })
})