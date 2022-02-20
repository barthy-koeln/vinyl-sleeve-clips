import { CubeTextureLoader } from 'three/src/Three'

import px from '../images/envMap/px.png'
import nx from '../images/envMap/nx.png'
import py from '../images/envMap/py.png'
import ny from '../images/envMap/ny.png'
import pz from '../images/envMap/pz.png'
import nz from '../images/envMap/nz.png'

const loader = new CubeTextureLoader()

export const envMap = loader.load([px, nx, py, ny, pz, nz])
