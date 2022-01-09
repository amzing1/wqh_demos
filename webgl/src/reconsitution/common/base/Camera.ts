import { mat4, vec3 } from 'gl-matrix'
import { ShaderLocationNames } from '../../types/types'
import { WebGLBase } from './WebGLBase'

export class Camera extends WebGLBase {
  viewMatrix: mat4
  projMatrix: mat4
  constructor(
    gl: WebGL2RenderingContext,
    vShader: string,
    fShader: string,
    locationNames: ShaderLocationNames,
    aspect: number
  ) {
    super(gl, vShader, fShader, locationNames)
    this.initMatrix(aspect)
  }

  initMatrix(aspect: number) {
    const viewMat = this.setCamera()
    this.viewMatrix = viewMat
    const projMat = mat4.create()
    mat4.perspective(projMat, 100, aspect, 0.1, 100)
    this.projMatrix = projMat
  }

  setCamera(): mat4 {
    const eye = vec3.fromValues(0, 0, 20)
    const center = vec3.fromValues(0, 0, 0)
    const up = vec3.fromValues(0, 1, 0)
    const matrix = mat4.create()
    mat4.lookAt(matrix, eye, center, up)
    return matrix
  }
}
