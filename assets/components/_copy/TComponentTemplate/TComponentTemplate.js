import './TComponentTemplate.scss'
import { MFComponent } from '@vucx/vanilla-component/src/MFComponent'

export class TComponentTemplate extends MFComponent {

  mount () {
    this.container.addEventListener('click', this.listener)
  }

  dispose () {
    this.container.removeEventListener('click', this.listener)
  }

  listener = () => {
    this.dispatch('onComponentClick', 'Example event')
  }
}
