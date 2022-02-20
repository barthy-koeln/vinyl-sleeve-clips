import './AMainCanvas.scss'
import { ThreeJSCanvas } from '../../../utilities/ThreeJSCanvas'
import { AnimationMixer, Clock, Mesh, PlaneGeometry, ShadowMaterial } from 'three/src/Three'
import { getAngularSpeed } from '../../../utilities/getAngularSpeed'
import { envMap } from '../../../utilities/envMap'

export class AMainCanvas extends ThreeJSCanvas {

  mount () {
    super.mount('a-mainCanvas')

    this.clock = new Clock()
    this.framesPerSecond = 30
    this.totalFrames = 390
    this.duration = this.totalFrames / this.framesPerSecond
    this.scrollSpeed = 0.05
    this.currentFrame = 0
    this.angularSpeedVinyl = getAngularSpeed(33)
    this.height = this.totalFrames / this.scrollSpeed
    this.container.style.height = `${this.height}px`
    this.modelLoader.load('/models/turntable/turntable.web.gltf', this.onGltfLoaded)
  }

  onGltfLoaded = (gltf) => {
    const root = gltf.scene

    const anisotropy = this.renderer.capabilities.getMaxAnisotropy()

    root.traverse(child => {
      if (!child.isMesh) {
        return
      }

      if (child.material) {
        child.material.envMap = envMap
        child.material.envMapIntensity = 0.5

        for (const map of ['map', 'normalMap', 'roughnessMap', 'metalnessMap']) {
          const texture = child.material[map]

          if (texture) {
            texture.anisotropy = anisotropy
          }
        }
      }

      child.castShadow = true
    })

    this.camera = gltf.cameras[0]
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.zoom = 1 - (this.zoom - 1)

    this.camera.updateProjectionMatrix()

    this.vinyl = root.getObjectByName('Vinyl')

    const planeGeometry = new PlaneGeometry(200, 200, 32, 32)
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

    for (const clip of gltf.animations) {
      clip.duration = 1000
      this.clipsMixer.clipAction(clip).play()
    }

    this.lastScrollY = 0
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
    this.currentTime = Math.min(this.duration, window.scrollY / this.height / this.scrollSpeed)
    this.clipsMixer.setTime(this.currentTime)
  }

  updateContinuousAnimation () {
    if (this.currentTime > 6.16) {
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
