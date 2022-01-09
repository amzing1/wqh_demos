import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { ShaderType } from '../../types/types'
import { ShaderLocationNames, VertexAndIndexData } from '../../types/types'
import { WebGLBase } from './WebGLBase'

export class Actor extends WebGLBase {
  protected totalVertexCount: number
  private _modelMatrix: mat4
  private _normalMatrix: mat4
  constructor(gl: WebGL2RenderingContext, vShader: string, fShader: string, locationNames: ShaderLocationNames) {
    super(gl, vShader, fShader, locationNames)
    this.initMatrix()
  }

  get modelMatrix(): mat4 {
    return this._modelMatrix
  }
  set modelMatrix(value: mat4) {
    this._modelMatrix = value
    this.bindShaderValue(this._modelMatrix, 'uModelMat', ShaderType.MAT4)
    const normalMat = mat4.create()
    mat4.invert(normalMat, this._modelMatrix)
    mat4.transpose(normalMat, normalMat)
    this._normalMatrix = normalMat
    this.bindShaderValue(this._normalMatrix, 'uNormalMat', ShaderType.MAT4)
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

  initMatrix() {
    const transformMat = mat4.create()
    this.modelMatrix = transformMat
  }

  draw(callbacks?: Function[]) {
    super.draw(callbacks)
    this.gl.drawElements(this.gl.TRIANGLES, this.totalVertexCount, this.gl.UNSIGNED_BYTE, 0)

    this.modelMatrix = mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(3, 3, 0))
    this.setMvpMatrix(this.modelMatrix, this.curViewMatrix, this.curProjMatrix)
    this.gl.drawElements(this.gl.TRIANGLES, this.totalVertexCount, this.gl.UNSIGNED_BYTE, 0)
  }

  rotate() {
    this.modelMatrix = mat4.rotateY(this.modelMatrix, this.modelMatrix, glMatrix.toRadian(1))
    this.setMvpMatrix(this.modelMatrix, this.curViewMatrix, this.curProjMatrix)
  }
}
