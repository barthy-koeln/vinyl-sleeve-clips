import './PHomepage.scss'
import { ready } from '../../../utilities/ready'
import { MFComponent } from '@vucx/vanilla-component/src/MFComponent'
import { AMainCanvas } from '../../Atom/AMainCanvas/AMainCanvas'
import { AppearElement } from '../../../utilities/AppearElement'
import '../../Atom/AScrollHint/AScrollHint'

ready(function () {
  MFComponent.initComponentList(
    {
      '.a-mainCanvas': AMainCanvas,
      '[data-appear]': AppearElement
    },
    'p-homepage'
  )

  document.dispatchEvent(new window.CustomEvent('init', { detail: document }))
})
