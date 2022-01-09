import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { fshader_source, vshader_source } from './shaders/shader'
import { MatrixType, ShaderLocationNames, ShaderType, VertexAndIndexData } from './types/types'
import { WebGLInit } from './common/WebGLInit'

let angleStep = 3.0
let gArmlAngle = 90.0
let gJoint1Angle = 0.0

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
    uniforms: ['uMvpMat', 'uLightColor', 'uLightDirection', 'uAmbientColor', 'uNormalMat', 'uModelMat'],
  }

  const glInstance = new WebGLInit(gl, vshader, fshader, shaLocNames)
  bindMvpMatrix(glInstance, canvas)
  glInstance.initVertices(initVertices())

  setLighting(glInstance)

  glInstance.draw()

  // glInstance.tick([() => rotate(glInstance)])
}

function setLighting(glIns: WebGLInit) {
  const lightColor = vec3.fromValues(1.0, 1, 1)
  glIns.bindShaderValue(lightColor, 'uLightColor', ShaderType.VEC3)
  const lightDirection = vec3.fromValues(1, 1, 1)
  vec3.normalize(lightDirection, lightDirection)
  glIns.bindShaderValue(lightDirection, 'uLightDirection', ShaderType.VEC3)
  const ambientColor = vec3.fromValues(0.2, 0.2, 0.2)
  glIns.bindShaderValue(ambientColor, 'uAmbientColor', ShaderType.VEC3)
}

function bindMvpMatrix(glIns: WebGLInit, canvas: HTMLCanvasElement) {
  const viewMat = setCamera(glIns)
  glIns.setMatrix(viewMat, MatrixType.VIEW_MATRIX)

  const rotateMat = mat4.create()
  mat4.rotateY(rotateMat, rotateMat, glMatrix.toRadian(300))
  glIns.setMatrix(rotateMat, MatrixType.MODEL_MATRIX)
  glIns.bindShaderValue(rotateMat, 'uModelMat', ShaderType.MAT4)

  const projMat = mat4.create()
  mat4.perspective(projMat, 100, canvas.width / canvas.height, 0.1, 100)
  glIns.setMatrix(projMat, MatrixType.PROJ_MATRIX)

  const mvpMat = getMvpMatrix(glIns)
  glIns.bindShaderValue(mvpMat, 'uMvpMat', ShaderType.MAT4)

  const normalMat = mat4.create()
  mat4.invert(normalMat, glIns.modelMatrix)
  mat4.transpose(normalMat, normalMat)
  glIns.setMatrix(normalMat, MatrixType.NORMAL_MATRIX)
  glIns.bindShaderValue(normalMat, 'uNormalMat', ShaderType.MAT4)
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

function rotate(glIns: WebGLInit) {
  mat4.rotateY(glIns.modelMatrix, glIns.modelMatrix, glMatrix.toRadian(0.5))
  const mvpMat = getMvpMatrix(glIns)
  glIns.bindShaderValue(mvpMat, 'uMvpMat', ShaderType.MAT4)
  mat4.invert(glIns.normalMatrix, glIns.modelMatrix)
  mat4.transpose(glIns.normalMatrix, glIns.normalMatrix)
  glIns.bindShaderValue(glIns.normalMatrix, 'uNormalMat', ShaderType.MAT4)
}

function initVertices(): VertexAndIndexData {
  const vertices = new Float32Array([
    1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1,
    1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1,
    1, 1, 1, 1, 1, -1,
  ])
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

function handleKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowUp':
      gJoint1Angle = gJoint1Angle < 135 ? gJoint1Angle + angleStep : gJoint1Angle
      break
    case 'ArrowDown':
      gJoint1Angle = gJoint1Angle < -135 ? gJoint1Angle - angleStep : gJoint1Angle
      break
    case 'ArrowLeft':
      gArmlAngle = (gArmlAngle - angleStep) % 360
      break
    case 'ArrowRight':
      gArmlAngle = (gArmlAngle + angleStep) % 360
      break
  }
}
