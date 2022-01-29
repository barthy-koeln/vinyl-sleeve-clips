import './AMainCanvas.scss'
import { ThreeJSCanvas } from '../../../utilities/ThreeJSCanvas'
import { AnimationMixer, Clock, Mesh, PlaneGeometry, ShadowMaterial } from 'three/src/Three'
import { getAngularSpeed } from '../../../utilities/getAngularSpeed'

export class AMainCanvas extends ThreeJSCanvas {

  mount () {
    super.mount('a-mainCanvas')

    this.clock = new Clock()
    this.framesPerSecond = 30
    this.scrollSpeed = 0.05
    this.totalFrames = 380
    this.currentFrame = 0
    this.angularSpeedVinyl = getAngularSpeed(33)
    this.container.style.height = `${this.totalFrames / this.scrollSpeed}px`
    this.modelLoader.load('/models/turntable/turntable.web.gltf', this.onGltfLoaded)
  }

  onGltfLoaded = (gltf) => {
    const root = gltf.scene

    root.traverse(child => {
      if (!child.isMesh) {
        return
      }

      child.castShadow = true
    })

    this.camera = gltf.cameras[0]
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    this.vinyl = root.getObjectByName('Vinyl')
    this.clips = root.getObjectByName('Clips')

    const planeGeometry = new PlaneGeometry(100, 100, 32, 32)
    const planeMaterial = new ShadowMaterial()
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.position.y = 0.1
    plane.rotation.x = -Math.PI / 2
    plane.material.opacity = 0.1
    plane.receiveShadow = true

    this.scene.add(plane)
    this.scene.add(root)
    this.render()

    this.clipsMixer = new AnimationMixer(root)
    gltf.animations.forEach((clip) => {
      clip.duration = this.totalFrames
      this.clipsMixer.clipAction(clip).play()
    })

    this.lastScrollY = window.scrollY
    this.tick()
  }

  tick = () => {
    const deltaScroll = window.scrollY - this.lastScrollY

    if (deltaScroll !== 0) {
      this.updateScrollAnimation()
    }

    this.updateContinuousAnimation()

    this.lastScrollY = window.scrollY

    this.render(this.tick)
  }

  updateScrollAnimation () {
    this.currentFrame = window.scrollY * this.scrollSpeed
    this.clipsMixer.setTime(this.currentFrame / this.framesPerSecond)
  }

  updateContinuousAnimation () {
    if (this.currentFrame > 140) {
      if (!this.clock.running) {
        this.clock.start()
      }

      this.vinyl.rotation.y -= this.clock.getDelta() * this.angularSpeedVinyl
      return
    }

    if (this.clock.running) {
      this.clock.stop()
    }
  }

}
