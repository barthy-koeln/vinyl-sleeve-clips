import './MAnimationStep.scss'
import { MAnimationStep } from './MAnimationStep'
import { renderStory } from '../../../../.storybook/utilities/renderStory'

export default {
  title: '03-molecules/MAnimationStep',

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
  'Molecule/MAnimationStep/MAnimationStep.twig',
  data,
  MAnimationStep
)
