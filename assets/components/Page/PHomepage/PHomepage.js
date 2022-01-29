import './PHomepage.scss'
import { ready } from '../../../utilities/ready'
import { MFComponent } from '@vucx/vanilla-component/src/MFComponent'
import { AMainCanvas } from '../../Atom/AMainCanvas/AMainCanvas'

ready(function () {
  MFComponent.initComponentList(
    {
      '.a-mainCanvas': AMainCanvas
    },
    'p-homepage'
  )

  document.dispatchEvent(new window.CustomEvent('init', { detail: document }))
})
