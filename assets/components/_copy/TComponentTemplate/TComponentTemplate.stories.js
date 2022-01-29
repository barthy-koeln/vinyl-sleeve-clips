import './TComponentTemplate.scss'
import { TComponentTemplate } from './TComponentTemplate'
import { renderStory } from '../../../../.storybook/utilities/renderStory'

export default {
  title: '__-template/TComponentTemplate',

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
  '_copy/TComponentTemplate/TComponentTemplate.twig',
  data,
  TComponentTemplate
)
