import { MFComponent } from '@vucx/vanilla-component/src/MFComponent'
import { AmbientLight, PCFSoftShadowMap, Scene, SpotLight, sRGBEncoding, WebGLRenderer } from 'three/src/Three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export class ThreeJSCanvas extends MFComponent {

  mount (baseclass) {
    this.sizes = {
      width: 1920,
      height: 1080
    }

    this.wrapper = this.container.querySelector(`.${baseclass}__wrapper`)
    this.canvas = this.container.querySelector(`.${baseclass}__canvas`)

    this.camera = null
    this.scene = new Scene()
    this.debugPrepared = false
    this.zoom = 1

    this.setWrapperSize()

    this.setupRenderer()
    this.setupLights()
    this.setupLoader()

    window.addEventListener('resize', this.onWindowResize)

    window.debug = {
      wireframe: this.debugWireframe,
      normal: this.debugNormal,
      metal: this.debugMetal,
      reset: this.setDebug
    }
  }

  debugWireframe = () => {
    this.setDebug(mesh => {
      mesh.material.wireframe = true
    })
  }

  debugNormal = () => {
    this.setDebug(mesh => {
      if (!mesh.material.normalMap) {
        return
      }

      mesh.material.map = mesh.material.normalMap
    })
  }

  debugMetal = () => {
    this.setDebug(mesh => {
      if (!mesh.material.metalnessMap) {
        return
      }

      mesh.material.map = mesh.material.metalnessMap
    })
  }

  resetDebug (mesh) {
    mesh.debugMap = mesh.material.map
    mesh.material.wireframe = false
  }

  setDebug = (callback = null) => {
    this.scene.traverse(child => {
      if (!child.isMesh) {
        return
      }

      if (!this.debugPrepared) {
        child.debugMap = child.material.map
      }

      this.resetDebug(child)
      if (callback) {
        callback(child)
      }

      child.material.needsUpdate = true
    })

    this.debugPrepared = true
  }

  setWrapperSize () {
    this.wrapper.style.width = window.innerWidth + 'px'
    this.wrapper.style.height = window.innerHeight + 'px'

    this.zoom = Math.max(
      window.innerWidth / this.sizes.width,
      window.innerHeight / this.sizes.height
    )
  }

  setRendererSize () {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  onWindowResize = () => {
    this.setWrapperSize()
    this.setRendererSize()
  }

  render = (nextFrame = null) => {
    this.renderer.render(this.scene, this.camera)
    if (nextFrame) {
      window.requestAnimationFrame(nextFrame)
    }
  }

  dispose () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  createPointLight (intensity, x, y, z) {
    const light = new SpotLight(0xffffff, intensity * 100, 50, Math.PI / 3, 0, 2)

    light.position.set(x, y, z)
    light.target.position.set(0, 0, 0)

    light.castShadow = true

    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.bias = -0.0001

    return light
  }

  setupLights () {
    this.lights = [
      new AmbientLight(0x404040, 1),
      this.createPointLight(2, -4, 4.9, 8), // BACK
      this.createPointLight(2, 11, 4.9, -4), // FILL
      this.createPointLight(3, 3, 4.9, -14) // KEY
    ]

    this.lights.map(light => this.scene.add(light))
  }

  setupRenderer () {
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this.canvas
    })

    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap

    this.setRendererSize()
  }

  setupLoader () {
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    // noinspection JSUnresolvedVariable
    dracoLoader.setDecoderPath(PUBLIC_PATH + '/')
    gltfLoader.setDRACOLoader(dracoLoader)

    this.modelLoader = gltfLoader
  }

}
