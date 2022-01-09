import { mat4, vec3 } from 'gl-matrix'
import { initShaders } from '../../../lib/util'
import { ShaderLocationNames, ShaderParamLocation, ShaderType, ShaderValue } from '../../types/types'

export class WebGLBase {
  protected gl: WebGL2RenderingContext
  protected program: WebGLProgram
  protected location: ShaderParamLocation | {}
  curModelMatrix: mat4
  curViewMatrix: mat4
  curProjMatrix: mat4
  private _mvpMatrix: mat4
  constructor(gl: WebGL2RenderingContext, vShader: string, fShader: string, locationNames: ShaderLocationNames) {
    console.log('webgl base constructor!')
    if (!this.gl) {
      this.gl = gl
      this.location = {}
      this.program = initShaders(gl, vShader, fShader)
      this.getLocation(locationNames)
      gl.clearColor(0.5, 0.5, 0.5, 1)
      gl.enable(gl.DEPTH_TEST)
      this.initLighting()
    }
  }

  set mvpMatrix(value: mat4) {
    this._mvpMatrix = value
    this.bindShaderValue(this._mvpMatrix, 'uMvpMat', ShaderType.MAT4)
  }

  tick(callbacks?: Function[]) {
    if (callbacks) {
      this.draw(callbacks)
      requestAnimationFrame(() => this.tick(callbacks))
    }
  }

  setMatrix(mat: mat4, matrix: mat4) {
    mat = matrix
  }

  setMvpMatrix(modelMat: mat4, viewMat: mat4, projMat: mat4) {
    this.curModelMatrix = modelMat
    this.curViewMatrix = viewMat
    this.curProjMatrix = projMat
    const mat = mat4.create()
    mat4.multiply(mat, projMat, viewMat)
    mat4.multiply(mat, mat, modelMat)
    this.mvpMatrix = mat
  }

  private getLocation(locationNames: ShaderLocationNames) {
    const { attributes, uniforms } = locationNames
    try {
      attributes.forEach((a) => (this.location[a] = this.gl.getAttribLocation(this.program, a)))
      uniforms.forEach((u) => (this.location[u] = this.gl.getUniformLocation(this.program, u)))
    } catch (error) {
      throw Error('failed to get shader locations')
    }
  }

  bindShaderValue(value: ShaderValue, modelLocationName: string, type: ShaderType) {
    if (modelLocationName.includes('light')) {
      console.log(this.gl, this.program, this.location)
    }

    this.gl.useProgram(this.program)
    switch (type) {
      case ShaderType.MAT4:
        this.gl.uniformMatrix4fv(this.location[modelLocationName], false, value)
        break
      case ShaderType.VEC3:
        this.gl.uniform3fv(this.location[modelLocationName], value)
        break
      default:
        break
    }
  }

  draw(callbacks?: Function[]) {
    if (callbacks) {
      callbacks.forEach((cb) => cb.call(this))
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    // this.gl.drawArrays(this.gl.TRIANGLES, 0, this.totalVertexCount)
  }

  initLighting() {
    console.log('in Webgl base')
    const lightColor = vec3.fromValues(1.0, 1, 1)
    this.bindShaderValue(lightColor, 'uLightColor', ShaderType.VEC3)
    const lightDirection = vec3.fromValues(1, 1, 1)
    vec3.normalize(lightDirection, lightDirection)
    this.bindShaderValue(lightDirection, 'uLightDirection', ShaderType.VEC3)
    const ambientColor = vec3.fromValues(0.2, 0.2, 0.2)
    this.bindShaderValue(ambientColor, 'uAmbientColor', ShaderType.VEC3)
  }
}
