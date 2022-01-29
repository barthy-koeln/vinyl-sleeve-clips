import { COLORS } from '../assets/utilities/constants'
import { transformSource } from './utilities/transformSource'
import '../assets/scss/header.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },

    presetColors: Object.entries(COLORS).map(([title, color]) => {
      return { title, color }
    })
  },

  options: {
    storySort: (a, b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  },

  docs: {
    transformSource
  }
}

export const decorators = [
  (story) => {
    const parent = document.createElement('div')
    const node = story()

    parent.style.width = '100%'
    parent.style.minHeight = '30vh'
    parent.style.display = 'flex'
    parent.style.alignItems = 'center'
    parent.style.justifyContent = 'center'

    parent.appendChild(node)

    return parent
  }
]