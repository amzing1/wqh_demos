import { mat4, vec3 } from 'gl-matrix'
import { initShaders } from '../lib/util'
import { ShaderLocationNames, ShaderParamLocation, VertexAndIndexData, VerticesData } from './types'

export class WebGLInit {
  private gl: WebGL2RenderingContext
  private program: WebGLProgram
  private location: ShaderParamLocation | {}
  private totalVertexCount: number

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
      const { vertices, length, myVertices } = vertexAndIndexBuf.verticesData
      const indices = vertexAndIndexBuf.indicesData
      this.totalVertexCount = indices.length
      const FSIZE = vertices.BYTES_PER_ELEMENT
      const vBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)
      myVertices.forEach((v) => {
        this.gl.vertexAttribPointer(
          this.location[v.shaderLocName],
          v.length,
          this.gl.FLOAT,
          false,
          FSIZE * length,
          FSIZE * v.offset
        )
        this.gl.enableVertexAttribArray(this.location[v.shaderLocName])
      })
      const iBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer)
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW)
    } catch (error) {
      throw Error('failed to init vertieces buffer')
    }
  }

  setCamera(eye: vec3, center: vec3, up: vec3, viewLocationName: string) {
    const matrix = mat4.create()
    mat4.lookAt(matrix, eye, center, up)
    this.gl.uniformMatrix4fv(this.location[viewLocationName], false, matrix)
  }

  setTransform(matrix: mat4, modelLocationName: string) {
    this.gl.uniformMatrix4fv(this.location[modelLocationName], false, matrix)
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
