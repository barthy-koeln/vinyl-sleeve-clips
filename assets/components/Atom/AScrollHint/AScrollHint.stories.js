import './AScrollHint.scss'
import { AScrollHint } from './AScrollHint'
import { renderStory } from '../../../../.storybook/utilities/renderStory'

export default {
  title: '02-atoms/AScrollHint',

  args: {
    variant: 'foo',
    background: '#bada55'
  },

  argTypes: {
    variant: {
      options: ['foo', 'bar'],
      control: { type: 'radio' }
    },
    background: {
      control: { type: 'color' }
    }
  },

  parameters: {
    actions: {
      handles: ['onComponentClick']
    },

    design: {
      type: 'experimental-figspec',
      url: '__LINK__',
      accessToken: process.env.STORYBOOK_TOKEN
    }
  }
}

export const standard = data => renderStory(
  'Atom/AScrollHint/AScrollHint.twig',
  data,
  AScrollHint
)
