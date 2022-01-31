import { MFComponent } from '@vucx/vanilla-component/src/MFComponent'

const directions = {
  right: ['X', 1],
  left: ['X', -1],
  top: ['Y', -1],
  bottom: ['Y', 1]
}

export class AppearElement extends MFComponent {

  get appeared () {
    return this._appeared
  }

  set appeared (appeared) {
    this.container.style.opacity = appeared ? '1' : '0'
    this.container.style.transform = appeared ? 'none' : this.getTransform()
    this._appeared = appeared
  }

  getTransform () {
    return `translate${this.direction[0]}(${(this.passed ? -1 : 1) * this.direction[1] * 60}px)`
  }

  mount () {
    this.direction = directions[this.container.dataset.appear]
    this.start = parseInt(this.container.dataset.appearStart, 10) * 0.01
    this.end = parseInt(this.container.dataset.appearEnd, 10) * 0.01

    this.passed = false
    this.appeared = false

    setTimeout(() => {
      this.container.style.visibility = 'visible'
    }, 350)

    window.addEventListener('scroll', this.listener, { passive: true })
    this.listener()
  }

  dispose () {
    window.removeEventListener('scroll', this.listener)
  }

  listener = () => {
    const triggerValueStart = this.start * window.innerHeight
    const triggerValueEnd = this.end * window.innerHeight

    if (window.scrollY >= triggerValueStart && window.scrollY < triggerValueEnd) {
      if (!this.appeared) {
        this.appeared = true
      }

      return
    }

    if (this.appeared) {
      this.passed = window.scrollY >= triggerValueEnd
      this.appeared = false
    }
  }

}
