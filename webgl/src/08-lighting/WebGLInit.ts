import { mat4, vec3 } from 'gl-matrix'
import { initShaders } from '../lib/util'
import {
  MatrixType,
  ShaderLocationNames,
  ShaderParamLocation,
  ShaderType,
  ShaderValue,
  VertexAndIndexData,
} from './types'

export class WebGLInit {
  private gl: WebGL2RenderingContext
  private program: WebGLProgram
  private location: ShaderParamLocation | {}
  private totalVertexCount: number
  modelMatrix: mat4
  viewMatrix: mat4
  projMatrix: mat4

  constructor(gl: WebGL2RenderingContext, vShader: string, fShader: string, locationNames: ShaderLocationNames) {
    this.gl = gl
    this.location = {}
    this.program = initShaders(gl, vShader, fShader)
    this.getLocation(locationNames)
    gl.clearColor(0.5, 0.5, 0.5, 1)
    gl.enable(gl.DEPTH_TEST)
  }

  tick(callbacks?: Function[]) {
    if (callbacks) {
      this.draw(callbacks)
      requestAnimationFrame(() => this.tick(callbacks))
    }
  }

  setMatrix(matrix: mat4, type: MatrixType) {
    switch (type) {
      case MatrixType.MODEL_MATRIX:
        this.modelMatrix = matrix
        break
      case MatrixType.PROJ_MATRIX:
        this.projMatrix = matrix
        break
      case MatrixType.VIEW_MATRIX:
        this.viewMatrix = matrix
        break
    }
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

  initVertices(vertexAndIndexBuf: VertexAndIndexData) {
    try {
      const { buffers, indices } = vertexAndIndexBuf

      this.totalVertexCount = indices.length
      buffers.forEach((item) => {
        const vBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, item.buffer, this.gl.STATIC_DRAW)
        this.gl.vertexAttribPointer(this.location[item.shaderLocName], item.length, this.gl.FLOAT, false, 0, 0)
        this.gl.enableVertexAttribArray(this.location[item.shaderLocName])
      })

      const iBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer)
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW)
    } catch (error) {
      throw Error('failed to init vertieces buffer')
    }
  }

  bindShaderValue(value: ShaderValue, modelLocationName: string, type: ShaderType) {
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
      callbacks.forEach((cb) => cb())
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    // this.gl.drawArrays(this.gl.TRIANGLES, 0, this.totalVertexCount)
    this.gl.drawElements(this.gl.TRIANGLES, this.totalVertexCount, this.gl.UNSIGNED_BYTE, 0)
  }
}
