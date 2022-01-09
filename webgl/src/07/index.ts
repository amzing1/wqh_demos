import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { fshader_source, vshader_source } from './shader'
import { ShaderLocationNames, ShaderParamLocation, VertexAndIndexData, VerticesData } from './types'
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
    attributes: ['aPos', 'aColor'],
    uniforms: ['uViewMat', 'uModelMat', 'uProjMat'],
  }

  const glInstance = new WebGLInit(gl, vshader, fshader, shaLocNames)
  glInstance.initVertices(initVertices())

  setCamera(glInstance)
  const rotateMat = mat4.create()
  mat4.rotateY(rotateMat, rotateMat, glMatrix.toRadian(90))
  glInstance.setTransform(rotateMat, 'uModelMat')

  const projMat = mat4.create()
  // mat4.ortho(projMat, -1, 1, -1, 1, 0, 2)
  mat4.perspective(projMat, 100, canvas.width / canvas.height, 0.1, 100)
  glInstance.setTransform(projMat, 'uProjMat')

  glInstance.draw()

  glInstance.tick([() => rotate(glInstance, rotateMat)])
}

function setCamera(glIns: WebGLInit) {
  const eye = vec3.fromValues(0, 0, 10.0)
  const center = vec3.fromValues(0, 0, 0)
  const up = vec3.fromValues(0, 1, 0)
  glIns.setCamera(eye, center, up, 'uViewMat')
  moveCameraByKey(glIns, eye, center, up)
}

function moveCameraByKey(glIns: WebGLInit, eye: vec3, center: vec3, up: vec3) {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        eye[0] -= 0.2
        break
      case 'ArrowRight':
        eye[0] += 0.2
        break
      case 'ArrowUp':
        eye[1] += 0.2
        break
      case 'ArrowDown':
        eye[1] -= 0.2
        break
    }
    glIns.draw([() => glIns.setCamera(eye, center, up, 'uViewMat')])
  })
}

function rotate(glIns: WebGLInit, curMatrix: mat4) {
  mat4.rotateY(curMatrix, curMatrix, glMatrix.toRadian(2))
  glIns.setTransform(curMatrix, 'uModelMat')
}

function initVertices(): VertexAndIndexData {
  const vertices = new Float32Array([
    1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 0, 1, -1, -1, 1, 1, 0, 0, 1, -1, 1, 1, 1, 0, 1, -1, -1, 0, 1, 0, 1, 1, -1, 0, 1, 1,
    -1, 1, -1, 0, 0, 1, -1, -1, -1, 0, 0, 0,
  ])
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 1, 1, 6, 7, 1, 7, 2, 7, 4, 3, 7, 3, 2, 4, 7, 6, 4, 6, 5,
  ])
  return {
    verticesData: {
      vertices,
      length: 6,
      myVertices: [
        { shaderLocName: 'aPos', offset: 0, length: 3 },
        { shaderLocName: 'aColor', offset: 3, length: 3 },
      ],
    },
    indicesData: indices,
  }
}
