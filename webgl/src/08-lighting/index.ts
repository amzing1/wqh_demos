import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { fshader_source, vshader_source } from './shader-frag'
import { MatrixType, ShaderLocationNames, ShaderType, VertexAndIndexData } from './types'
import { WebGLInit } from './WebGLInit'

export function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2')
  if (!gl) {
    throw Error('failed to init webgl')
  }
  const vshader = vshader_source
  const fshader = fshader_source
  const shaLocNames: ShaderLocationNames = {
    attributes: ['aPos', 'aColor', 'aNormal'],
    uniforms: ['uMvpMat', 'uLightColor', 'uLightPosition', 'uAmbientColor', 'uNormalMat', 'uModelMat'],
  }

  const glInstance = new WebGLInit(gl, vshader, fshader, shaLocNames)
  glInstance.initVertices(initVertices())
  bindMvpMatrix(glInstance, canvas)
  setLighting(glInstance)

  glInstance.draw()

  glInstance.tick([() => rotate(glInstance, glInstance.modelMatrix)])
}

function setLighting(glIns: WebGLInit) {
  const lightColor = vec3.fromValues(1.0, 1.0, 1.0)
  glIns.bindShaderValue(lightColor, 'uLightColor', ShaderType.VEC3)
  // const lightDirection = vec3.fromValues(0, 0, -1)
  // vec3.normalize(lightDirection, lightDirection)
  // glIns.bindShaderValue(lightDirection, 'uLightDirection', ShaderType.VEC3)
  const lightPos = vec3.fromValues(0, 5, 5)
  glIns.bindShaderValue(lightPos, 'uLightPosition', ShaderType.VEC3)
  const ambientColor = vec3.fromValues(0.2, 0.2, 0.2)
  glIns.bindShaderValue(ambientColor, 'uAmbientColor', ShaderType.VEC3)
}

function bindMvpMatrix(glIns: WebGLInit, canvas: HTMLCanvasElement) {
  const viewMat = setCamera(glIns)
  glIns.setMatrix(viewMat, MatrixType.VIEW_MATRIX)

  const rotateMat = mat4.create()
  mat4.rotateY(rotateMat, rotateMat, glMatrix.toRadian(90))
  glIns.setMatrix(rotateMat, MatrixType.MODEL_MATRIX)
  glIns.bindShaderValue(rotateMat, 'uModelMat', ShaderType.MAT4)

  const projMat = mat4.create()
  mat4.perspective(projMat, 100, canvas.width / canvas.height, 0.1, 100)
  glIns.setMatrix(projMat, MatrixType.PROJ_MATRIX)

  const mvpMat = getMvpMatrix(glIns)
  glIns.bindShaderValue(mvpMat, 'uMvpMat', ShaderType.MAT4)
}

function getMvpMatrix(glIns: WebGLInit): mat4 {
  if (!glIns.modelMatrix || !glIns.projMatrix || !glIns.viewMatrix) {
    return
  }
  const mvpMat = mat4.create()
  mat4.multiply(mvpMat, glIns.projMatrix, glIns.viewMatrix)
  mat4.multiply(mvpMat, mvpMat, glIns.modelMatrix)
  return mvpMat
}

function setCamera(glIns: WebGLInit): mat4 {
  const eye = vec3.fromValues(0, 0, 10)
  const center = vec3.fromValues(0, 0, 0)
  const up = vec3.fromValues(0, 1, 0)
  const matrix = mat4.create()
  mat4.lookAt(matrix, eye, center, up)
  return matrix
}

function rotate(glIns: WebGLInit, curMatrix: mat4) {
  mat4.rotateY(curMatrix, curMatrix, glMatrix.toRadian(2))
  const mvpMat = getMvpMatrix(glIns)
  glIns.bindShaderValue(mvpMat, 'uMvpMat', ShaderType.MAT4)
  const normalMat = mat4.create()
  mat4.invert(normalMat, normalMat)
  mat4.transpose(normalMat, normalMat)
  glIns.bindShaderValue(normalMat, 'uNormalMat', ShaderType.MAT4)
}

function initVertices(): VertexAndIndexData {
  const vertices = new Float32Array([
    1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1,
    1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1,
    1, 1, 1, 1, 1, -1,
  ])
  // const colors = new Float32Array([
  //   0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0,
  //   1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
  // ])
  const colors = new Float32Array([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ])

  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ])
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
    20, 22, 23,
  ])
  return {
    buffers: [
      {
        buffer: vertices,
        length: 3,
        shaderLocName: 'aPos',
      },
      {
        buffer: colors,
        length: 3,
        shaderLocName: 'aColor',
      },
      {
        buffer: normals,
        length: 3,
        shaderLocName: 'aNormal',
      },
    ],
    indices,
  }
}
